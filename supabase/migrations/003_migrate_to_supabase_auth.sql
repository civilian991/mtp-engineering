-- Migration to use Supabase Auth instead of custom JWT authentication
-- This migration creates admin profiles linked to Supabase auth.users

-- Create admin_profiles table that extends auth.users
CREATE TABLE IF NOT EXISTS admin_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email VARCHAR(255) UNIQUE NOT NULL,
  full_name VARCHAR(255),
  role VARCHAR(50) DEFAULT 'admin' CHECK (role IN ('super_admin', 'admin', 'editor')),
  is_active BOOLEAN DEFAULT true,
  last_login_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create audit log table for admin actions
CREATE TABLE IF NOT EXISTS admin_audit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  action VARCHAR(100) NOT NULL,
  entity_type VARCHAR(50),
  entity_id UUID,
  details JSONB,
  ip_address INET,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_admin_profiles_email ON admin_profiles(email);
CREATE INDEX IF NOT EXISTS idx_admin_audit_logs_user_id ON admin_audit_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_admin_audit_logs_created_at ON admin_audit_logs(created_at);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for admin_profiles
DROP TRIGGER IF EXISTS update_admin_profiles_updated_at ON admin_profiles;
CREATE TRIGGER update_admin_profiles_updated_at BEFORE UPDATE ON admin_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE admin_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_audit_logs ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Admin profiles are viewable by authenticated admins" ON admin_profiles;
DROP POLICY IF EXISTS "Admin profiles can update their own profile" ON admin_profiles;
DROP POLICY IF EXISTS "Admin profiles can be created by super admins" ON admin_profiles;
DROP POLICY IF EXISTS "Audit logs are viewable by authenticated admins" ON admin_audit_logs;
DROP POLICY IF EXISTS "Audit logs can be created by authenticated admins" ON admin_audit_logs;

-- Create RLS policies for admin_profiles
CREATE POLICY "Admin profiles are viewable by authenticated admins" ON admin_profiles
  FOR SELECT USING (
    auth.uid() IN (
      SELECT id FROM admin_profiles WHERE is_active = true
    )
  );

CREATE POLICY "Admin profiles can update their own profile" ON admin_profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Admin profiles can be created by super admins" ON admin_profiles
  FOR INSERT WITH CHECK (
    auth.uid() IN (
      SELECT id FROM admin_profiles WHERE role = 'super_admin' AND is_active = true
    )
  );

-- Create RLS policies for audit logs
CREATE POLICY "Audit logs are viewable by authenticated admins" ON admin_audit_logs
  FOR SELECT USING (
    auth.uid() IN (
      SELECT id FROM admin_profiles WHERE is_active = true
    )
  );

CREATE POLICY "Audit logs can be created by authenticated admins" ON admin_audit_logs
  FOR INSERT WITH CHECK (
    auth.uid() IN (
      SELECT id FROM admin_profiles WHERE is_active = true
    )
  );

-- Function to handle new user creation
CREATE OR REPLACE FUNCTION handle_new_admin_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Create admin profile when a new user is created with admin metadata
  IF NEW.raw_user_meta_data->>'role' IS NOT NULL THEN
    INSERT INTO admin_profiles (id, email, full_name, role, is_active)
    VALUES (
      NEW.id,
      NEW.email,
      COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
      NEW.raw_user_meta_data->>'role',
      true
    );
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new admin users
DROP TRIGGER IF EXISTS on_auth_user_created_admin ON auth.users;
CREATE TRIGGER on_auth_user_created_admin
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_admin_user();

-- Migrate existing admin users to Supabase Auth
DO $$
DECLARE
  admin_record RECORD;
  new_user_id UUID;
BEGIN
  -- Loop through existing admin users
  FOR admin_record IN SELECT * FROM admin_users WHERE is_active = true
  LOOP
    -- Check if user already exists in auth.users
    IF NOT EXISTS (SELECT 1 FROM auth.users WHERE email = admin_record.email) THEN
      -- Generate a new UUID for the user
      new_user_id := gen_random_uuid();

      -- Insert into auth.users (Note: password will need to be reset)
      INSERT INTO auth.users (
        id,
        email,
        encrypted_password,
        email_confirmed_at,
        created_at,
        updated_at,
        raw_user_meta_data,
        is_super_admin,
        role
      ) VALUES (
        new_user_id,
        admin_record.email,
        admin_record.password_hash,
        NOW(),
        admin_record.created_at,
        NOW(),
        jsonb_build_object(
          'full_name', admin_record.full_name,
          'role', admin_record.role,
          'migrated_from_custom_auth', true
        ),
        false,
        'authenticated'
      );

      -- Create admin profile
      INSERT INTO admin_profiles (id, email, full_name, role, is_active, created_at)
      VALUES (
        new_user_id,
        admin_record.email,
        admin_record.full_name,
        admin_record.role,
        admin_record.is_active,
        admin_record.created_at
      ) ON CONFLICT (id) DO UPDATE SET
        role = EXCLUDED.role,
        full_name = EXCLUDED.full_name;
    END IF;
  END LOOP;
END $$;

-- Create a function to check if a user is an admin
CREATE OR REPLACE FUNCTION is_admin(user_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM admin_profiles
    WHERE id = user_id AND is_active = true
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a function to get user role
CREATE OR REPLACE FUNCTION get_user_role(user_id UUID)
RETURNS TEXT AS $$
DECLARE
  user_role TEXT;
BEGIN
  SELECT role INTO user_role
  FROM admin_profiles
  WHERE id = user_id AND is_active = true;

  RETURN user_role;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Note: The old admin_users, admin_sessions, and admin_audit_log tables are kept for reference
-- They can be dropped after confirming the migration is successful