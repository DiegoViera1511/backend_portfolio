"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appRouter = void 0;
const usersRouter_1 = require("./features/Users/usersRouter");
const express_1 = require("express");
const appRouter = (userModel) => {
    const router = (0, express_1.Router)();
    router.use((0, usersRouter_1.userRouter)(userModel));
    return router;
};
exports.appRouter = appRouter;
//postgresql://postgres:NGxniPfhNMdGdLdDxKNzdnvVrCpKWpYq@autorack.proxy.rlwy.net:32113/railway
