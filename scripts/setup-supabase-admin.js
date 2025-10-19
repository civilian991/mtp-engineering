const { createClient } = require('@supabase/supabase-js');

// Load environment variables
require('dotenv').config({ path: '.env.production' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables');
  console.error('Make sure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function setupAdminUser() {
  try {
    console.log('Setting up admin user in Supabase Auth...');

    // Create the admin user
    const { data: authUser, error: authError } = await supabase.auth.admin.createUser({
      email: 'admin@mtp.com.sa',
      password: 'Admin@123456',
      email_confirm: true,
      user_metadata: {
        full_name: 'System Administrator',
        role: 'super_admin'
      }
    });

    if (authError) {
      if (authError.message.includes('already been registered')) {
        console.log('Admin user already exists in Supabase Auth');

        // Update the existing user's password
        const { data: users } = await supabase.auth.admin.listUsers();
        const existingUser = users.users.find(u => u.email === 'admin@mtp.com.sa');

        if (existingUser) {
          const { error: updateError } = await supabase.auth.admin.updateUserById(
            existingUser.id,
            { password: 'Admin@123456' }
          );

          if (updateError) {
            console.error('Error updating admin password:', updateError);
          } else {
            console.log('Admin password updated successfully');
          }
        }
      } else {
        throw authError;
      }
    } else {
      console.log('Admin user created successfully:', authUser.user.email);
    }

    // Ensure admin profile exists
    const userId = authUser?.user?.id || (await supabase.auth.admin.listUsers()).data.users.find(u => u.email === 'admin@mtp.com.sa')?.id;

    if (userId) {
      const { data: profile, error: profileError } = await supabase
        .from('admin_profiles')
        .upsert({
          id: userId,
          email: 'admin@mtp.com.sa',
          full_name: 'System Administrator',
          role: 'super_admin',
          is_active: true
        }, {
          onConflict: 'id'
        })
        .select()
        .single();

      if (profileError) {
        console.error('Error creating admin profile:', profileError);
      } else {
        console.log('Admin profile created/updated successfully');
      }
    }

    console.log('\n✅ Admin setup complete!');
    console.log('You can now login with:');
    console.log('Email: admin@mtp.com.sa');
    console.log('Password: Admin@123456');
    console.log('\n⚠️  IMPORTANT: Change this password after first login!');

  } catch (error) {
    console.error('Error setting up admin user:', error);
    process.exit(1);
  }
}

setupAdminUser();