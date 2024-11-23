import {UserController} from "./userController";
import {IUserModel} from "../Interfaces/IUserModel";
import {Router} from "express";


export const userRouter = (userModel: IUserModel) => {
    const router = Router();
    const userController = new UserController(userModel);
    
    router.post('/users', userController.create);
    router.post('/users/logIn', userController.getUserByName);
    router.get('/protected' , userController.getUserByToken)

    return router
}