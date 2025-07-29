import { Document } from 'mongoose';
import { USER_ROLES } from '../enums/roles';

export interface IUser {
    _id?: string;
    name: string;
    email: string;
    passwordHash: string;
    role: USER_ROLES;
    avatar?: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface IUserDocument extends IUser, Document {}
