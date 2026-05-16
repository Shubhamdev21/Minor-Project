import bcrypt from 'bcryptjs';
import User from '../models/User';

export const seedAdminUser = async () => {
  try {
    const adminEmail = 'admin@system.local';
    const adminPassword = 'password';

    const userExists = await User.findOne({ email: adminEmail });

    if (userExists) {
      console.log('Admin user already exists');
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(adminPassword, salt);

    await User.create({
      name: 'Shubham Dev Behera',
      email: adminEmail,
      password: hashedPassword,
      role: 'admin',
    });

    console.log('Admin user seeded successfully');
  } catch (error) {
    console.error('Error seeding admin user:', error);
  }
};
