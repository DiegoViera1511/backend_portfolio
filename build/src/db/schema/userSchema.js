"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.users = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
exports.users = (0, pg_core_1.pgTable)("users", {
    name: (0, pg_core_1.text)('name').primaryKey().notNull(),
    password: (0, pg_core_1.text)('password').notNull(),
    token: (0, pg_core_1.text)("token")
});
