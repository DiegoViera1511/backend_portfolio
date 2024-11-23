import {NewUser, User} from "../../db/schema/userSchema";

export interface IUserModel {
    create(newUser: NewUser): Promise<void>;

    getUserByName(name: string): Promise<User | null>;
    
    getUserByToken(token: string): Promise<User | null>;
    
    updateUserToken(name: string, token: string): Promise<void>;
}