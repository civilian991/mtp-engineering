const bcrypt = require('bcryptjs');

async function testPassword() {
  const password = 'Admin@123456';
  const existingHash = '$2a$10$rBZWZjVMc5OQ2YZ8FIzu7u.H2KjD3G7XL6K.GcZr0oNpRNqmFz5u6';

  // Test if current hash matches
  const isValid = await bcrypt.compare(password, existingHash);
  console.log('Current hash valid:', isValid);

  // Generate new hash
  const salt = await bcrypt.genSalt(10);
  const newHash = await bcrypt.hash(password, salt);
  console.log('New hash:', newHash);

  // Verify new hash
  const verifyNew = await bcrypt.compare(password, newHash);
  console.log('New hash valid:', verifyNew);
}

testPassword();