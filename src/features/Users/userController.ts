import {IUserModel} from "../Interfaces/IUserModel";
import {NewUser} from "../../db/schema/userSchema";
import {validateUser} from "./utils";
import {Request, Response} from "express";
import bcrypt from "bcrypt"
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
            res.status(200).json(user);
        } catch (e) {
            res.status(500).json({message: (e instanceof Error) ? e.message : 'An unknown error occurred'});
        }
    }
}