import { User } from '../models/user.model';

export const getUserByEmail = async (email: string): Promise<any> => {
    return User.findOne({ email });
};

export const createUser = async (userData: any): Promise<any> => {
    const user = new User(userData);
    await user.save();
    return user;
};
