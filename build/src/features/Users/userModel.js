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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const userSchema_1 = require("../../db/schema/userSchema");
const config_1 = require("../../db/config/config");
const drizzle_orm_1 = require("drizzle-orm");
class UserModel {
    create(newUser) {
        return __awaiter(this, void 0, void 0, function* () {
            yield config_1.db.insert(userSchema_1.users).values(newUser).returning();
        });
    }
    getUserByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield config_1.db
                .select()
                .from(userSchema_1.users)
                .where((0, drizzle_orm_1.eq)(userSchema_1.users.name, name))
                .limit(1);
            if (!user.length) {
                return null;
            }
            return user[0];
        });
    }
    getUserByToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield config_1.db
                .select()
                .from(userSchema_1.users)
                .where((0, drizzle_orm_1.eq)(userSchema_1.users.token, token))
                .limit(1);
            if (!user.length) {
                return null;
            }
            return user[0];
        });
    }
    updateUserToken(name, token) {
        return __awaiter(this, void 0, void 0, function* () {
            yield config_1.db.update(userSchema_1.users).set({ token: token }).where((0, drizzle_orm_1.eq)(userSchema_1.users.name, name));
        });
    }
}
exports.UserModel = UserModel;
