import mongoose from 'mongoose';
import User from '../models/User.js';

const seedDefaultSuperAdmin = async () => {
  try {
    const existing = await User.findOne({
      $or: [
        { email: 'superadmin@shubharambhrealty.com' },
        { role: 'super_admin' }
      ]
    });

    if (!existing) {
      await User.create({
        name: 'Super Admin',
        email: 'superadmin@shubharambhrealty.com',
        phone: '7275004901',
        password: '12345',
        role: 'super_admin'
      });
      console.log('[Database Seed] Default Super Admin provisioned (superadmin@shubharambhrealty.com / 12345)');
    }
  } catch (error) {
    console.warn(`[Database Seed Warning] Super Admin check: ${error.message}`);
  }
};

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`[Database] MongoDB Connected: ${conn.connection.host}`);
    await seedDefaultSuperAdmin();
  } catch (error) {
    console.error(`[Database Error] Connection failed: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;

