"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const utils_1 = require("./utils");
const bcrypt_1 = __importDefault(require("bcrypt"));
class UserController {
    constructor(userModel) {
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const newUser = (0, utils_1.validateUser)(req.body);
                newUser.password = yield bcrypt_1.default.hash(newUser.password, 10);
                yield this.userModel.create(newUser);
                res.status(201).json(newUser);
            }
            catch (e) {
                res.status(500).json({ message: (e instanceof Error) ? e.message : 'An unknown error occurred' });
            }
        });
        this.getUserByName = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const reqUser = (0, utils_1.validateUser)(req.body);
                const user = yield this.userModel.getUserByName(reqUser.name);
                if (!user) {
                    res.status(404).json({ message: 'User not found' });
                    return;
                }
                const isCorrectPassword = yield bcrypt_1.default.compare(reqUser.password, user.password);
                if (!isCorrectPassword) {
                    res.status(400).json({ message: 'Password is incorrect' });
                    return;
                }
                const token = (0, utils_1.createToken)(user.name);
                yield this.userModel.updateUserToken(user.name, token);
                res.status(200).json(token);
            }
            catch (e) {
                res.status(500).json({ message: (e instanceof Error) ? e.message : 'An unknown error occurred' });
            }
        });
        this.getUserByToken = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
                if (!token) {
                    res.status(404).json({ message: 'Token not found' });
                    return;
                }
                const user = yield this.userModel.getUserByToken(token);
                if (!user) {
                    res.status(404).json({ message: 'User not found' });
                    return;
                }
                (0, utils_1.isValidToken)(token);
                res.status(200).json(user);
            }
            catch (e) {
                res.status(400).json({ message: (e instanceof Error) ? e.message : 'An unknown error occurred' });
            }
        });
        this.userModel = userModel;
    }
    ;
}
exports.UserController = UserController;
