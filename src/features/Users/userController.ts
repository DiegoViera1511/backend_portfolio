import {IUserModel} from "../Interfaces/IUserModel";
import {NewUser} from "../../db/schema/userSchema";
import {createToken, isValidToken, validateUser} from "./utils";
import {Request, Response} from "express";
import bcrypt from "bcrypt"
import {db} from "../../db/config/config";
import {UserModel} from "./userModel";
export class UserController {
    userModel: IUserModel;

    constructor(userModel: IUserModel) {
        this.userModel = userModel;
    };

    create = async (req: Request, res: Response) => {
        try {
            const newUser: NewUser = validateUser(req.body);
            newUser.password = await bcrypt.hash(newUser.password, 10);
            await this.userModel.create(newUser);
            res.status(201).json(newUser);
        } catch (e) {
            res.status(500).json({message: (e instanceof Error) ? e.message : 'An unknown error occurred'});
        }
    }

    getUserByName = async (req: Request, res: Response) => {
        try {
            const reqUser : NewUser = validateUser(req.body);
            const user = await this.userModel.getUserByName(reqUser.name);
            if (!user) {
                res.status(404).json({message: 'User not found'});
                return;
            }
            const isCorrectPassword : boolean = await bcrypt.compare(reqUser.password, user.password);
            if(!isCorrectPassword){
                res.status(400).json({message: 'Password is incorrect'});
                return;
            }
            const token = createToken(user.name);
            await this.userModel.updateUserToken(user.name, token);
            res.status(200).json(token);
        } catch (e) {
            res.status(500).json({message: (e instanceof Error) ? e.message : 'An unknown error occurred'});
        }
    }
    
    getUserByToken = async (req: Request, res: Response) => {
        try {
            const token = req.headers.authorization?.split(' ')[1];
            if (!token) {
                res.status(404).json({message: 'Token not found'});
                return;
            }
            const user = await this.userModel.getUserByToken(token);
            if (!user) {
                res.status(404).json({message: 'User not found'});
                return;
            }
            isValidToken(token);
            res.status(200).json(user);
        } catch (e) {
            res.status(400).json({message: (e instanceof Error) ? e.message : 'An unknown error occurred'});
        }
    }
}