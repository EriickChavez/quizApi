import mongoose from 'mongoose';
import { IUserDocument } from '../interfaces/IUser';
import { USER_ROLES } from '../enums/roles';

const UserSchema = new mongoose.Schema<IUserDocument>({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  passwordHash: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: Object.values(USER_ROLES),
    default: USER_ROLES.STUDENT,
    required: true
  },
  avatar: {
    type: String,
    default: null
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true // Esto crea automáticamente createdAt y updatedAt
});

// Índices para mejorar el rendimiento
UserSchema.index({ email: 1 });
UserSchema.index({ role: 1 });
UserSchema.index({ isActive: 1 });

// Método para obtener usuario sin password
UserSchema.methods.toSafeObject = function() {
  const userObject = this.toObject();
  delete userObject.passwordHash;
  return userObject;
};

export const UserModel = mongoose.model<IUserDocument>('User', UserSchema);
