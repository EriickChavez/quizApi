export interface IUser {
    _id?: string;
    name: string;
    email: string;
    passwordHash: string;
    avatar?: string;
    createdAt: Date;
    updatedAt: Date;
}