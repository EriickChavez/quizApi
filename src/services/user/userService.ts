import { IUser } from '../../interfaces/IUser';
import { IUserRepository } from '../../repositories/interfaces/IUserRepository';

export class UserService {
    constructor(private userRepository: IUserRepository) { }

    async registerUser(userData: Omit<IUser, '_id'>) {
        return this.userRepository.createUser(userData);
    }

    async getUserByEmail(email: string) {
        return this.userRepository.getUserByEmail(email);
    }
}