"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const drizzle_kit_1 = require("drizzle-kit");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.default = (0, drizzle_kit_1.defineConfig)({
    dialect: "postgresql",
    schema: './src/db/schema/*',
    out: "./drizzle",
    dbCredentials: {
        host: process.env.DB_HOST || "localhost",
        port: parseInt(process.env.DB_PORT || "5432"),
        user: process.env.DB_USER || "user",
        password: process.env.DB_PASSWORD || "password",
        database: process.env.DB_NAME || "dbname",
        ssl: false,
    },
});
