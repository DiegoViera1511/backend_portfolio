import {pgTable, text, varchar} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
    name: text('name').primaryKey().notNull(),
    password: text('password').notNull()
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;