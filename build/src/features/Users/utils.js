"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUser = exports.parsePassword = exports.parseUsername = void 0;
exports.createToken = createToken;
exports.isValidToken = isValidToken;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SECRET_KEY = "SECRET_KEY_FOR_PORTFOLIO_VIERA";
const parseUsername = (username) => {
    if (typeof username === "string") {
        return username;
    }
    throw new Error('User name must be string');
};
exports.parseUsername = parseUsername;
const parsePassword = (password) => {
    if (typeof password === "string") {
        return password;
    }
    throw new Error('Password must be string');
};
exports.parsePassword = parsePassword;
const validateUser = (object) => {
    try {
        return {
            name: (0, exports.parseUsername)(object.name),
            password: (0, exports.parsePassword)(object.password),
            token: ""
        };
    }
    catch (e) {
        throw new Error('Error user not valid');
    }
};
exports.validateUser = validateUser;
function createToken(name) {
    return jsonwebtoken_1.default.sign({ name: name }, SECRET_KEY, { expiresIn: '24h' });
}
function isValidToken(token) {
    jsonwebtoken_1.default.verify(token, SECRET_KEY, { complete: true });
}
