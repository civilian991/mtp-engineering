-- Create admin users table
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  full_name VARCHAR(255),
  role VARCHAR(50) DEFAULT 'admin' CHECK (role IN ('super_admin', 'admin', 'editor')),
  is_active BOOLEAN DEFAULT true,
  last_login_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create sessions table for JWT management
CREATE TABLE IF NOT EXISTS admin_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES admin_users(id) ON DELETE CASCADE,
  token_hash TEXT NOT NULL UNIQUE,
  expires_at TIMESTAMPTZ NOT NULL,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create audit log table
CREATE TABLE IF NOT EXISTS admin_audit_log (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES admin_users(id) ON DELETE SET NULL,
  action VARCHAR(100) NOT NULL,
  entity_type VARCHAR(50),
  entity_id UUID,
  details JSONB,
  ip_address INET,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_admin_users_email ON admin_users(email);
CREATE INDEX idx_admin_sessions_user_id ON admin_sessions(user_id);
CREATE INDEX idx_admin_sessions_expires_at ON admin_sessions(expires_at);
CREATE INDEX idx_admin_audit_log_user_id ON admin_audit_log(user_id);
CREATE INDEX idx_admin_audit_log_created_at ON admin_audit_log(created_at);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for admin_users
CREATE TRIGGER update_admin_users_updated_at BEFORE UPDATE ON admin_users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_audit_log ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for admin_users
CREATE POLICY "Admin users are viewable by authenticated admins" ON admin_users
  FOR SELECT USING (auth.uid() IS NOT NULL);

CREATE POLICY "Admin users can update their own profile" ON admin_users
  FOR UPDATE USING (auth.uid()::text = id::text);

-- Create RLS policies for admin_sessions
CREATE POLICY "Sessions are viewable by session owner" ON admin_sessions
  FOR ALL USING (auth.uid()::text = user_id::text);

-- Create RLS policies for audit log (read-only for all admins)
CREATE POLICY "Audit logs are viewable by authenticated admins" ON admin_audit_log
  FOR SELECT USING (auth.uid() IS NOT NULL);

-- Insert default super admin user (password: Admin@123456)
-- Password should be changed immediately after first login
INSERT INTO admin_users (email, password_hash, full_name, role, is_active)
VALUES (
  'admin@mtp.com.sa',
  '$2a$10$rBV2JDeWW3.vKyeQcM8fFO4777l4bVeQgDL6VZkDQ9WppJAN3UBpu', -- bcrypt hash of Admin@123456
  'System Administrator',
  'super_admin',
  true
) ON CONFLICT (email) DO NOTHING;