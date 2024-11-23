import {userRouter} from "./features/Users/usersRouter";
import {Router} from "express";
import {IUserModel} from "./features/Interfaces/IUserModel";


export const appRouter = (userModel : IUserModel) => {
    const router = Router();
    router.use(userRouter(userModel));
    return router;
}
