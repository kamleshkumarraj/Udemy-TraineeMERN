// create user model for central user management.

import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      pattern: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Email is invalid',
      ],
    },
    username: {
      type: String,
      required: true,
      unique: true,
      min: [3, 'First name must be at least 3 characters long'],
      max: [50, 'First name must be at most 50 characters long'],
      trim: true,
    },
    password: {
      type: String,
      required: true,
      min: [8, 'Password must be at least 8 characters long'],
      max: [50, 'Password must be at most 50 characters long'],
      trim: true,
      pattern: [
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        'Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character.',
      ],
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    profile: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: 'role',
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    avatar: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

export const Users = mongoose.model('User', userSchema);
