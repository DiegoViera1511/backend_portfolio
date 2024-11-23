"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const userController_1 = require("./userController");
const express_1 = require("express");
const userRouter = (userModel) => {
    const router = (0, express_1.Router)();
    const userController = new userController_1.UserController(userModel);
    router.post('/users', userController.create);
    router.post('/users/logIn', userController.getUserByName);
    router.get('/protected', userController.getUserByToken);
    return router;
};
exports.userRouter = userRouter;
