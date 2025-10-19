const bcrypt = require('bcryptjs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function createAdminUser() {
  console.log('=== Create Admin User ===\n');

  const email = await new Promise(resolve => {
    rl.question('Enter admin email: ', resolve);
  });

  const password = await new Promise(resolve => {
    rl.question('Enter admin password: ', resolve);
  });

  const fullName = await new Promise(resolve => {
    rl.question('Enter full name: ', resolve);
  });

  const role = await new Promise(resolve => {
    rl.question('Enter role (super_admin/admin/editor) [admin]: ', (input) => {
      resolve(input || 'admin');
    });
  });

  // Generate password hash
  const passwordHash = await bcrypt.hash(password, 10);

  console.log('\n=== SQL Insert Statement ===\n');
  console.log(`INSERT INTO admin_users (email, password_hash, full_name, role, is_active)
VALUES (
  '${email}',
  '${passwordHash}',
  '${fullName}',
  '${role}',
  true
) ON CONFLICT (email) DO UPDATE SET
  password_hash = EXCLUDED.password_hash,
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  updated_at = NOW();`);

  console.log('\nCopy the SQL above and run it in your Supabase SQL editor to create/update the admin user.');

  rl.close();
}

createAdminUser().catch(console.error);