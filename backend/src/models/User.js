import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const ROLES = ['super_admin', 'admin', 'rm', 'agent', 'customer'];

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters long'],
      maxlength: [100, 'Name cannot exceed 100 characters']
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        'Please provide a valid email address'
      ]
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      unique: true,
      trim: true,
      match: [/^[0-9]{10,14}$/, 'Please provide a valid phone number']
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [5, 'Password must be at least 5 characters long'],
      select: false
    },
    role: {
      type: String,
      enum: {
        values: ROLES,
        message: 'Role must be one of: super_admin, admin, rm, agent, customer'
      },
      default: 'customer'
    },
    isActive: {
      type: Boolean,
      default: true
    },
    assignedRM: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null
    }
  },
  {
    timestamps: true
  }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.toSafeObject = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export { ROLES };
export default mongoose.model('User', userSchema);

