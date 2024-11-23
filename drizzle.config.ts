import { defineConfig } from "drizzle-kit";
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
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