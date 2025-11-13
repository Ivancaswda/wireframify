import { pgTable, uuid, text, json, timestamp, varchar, integer } from "drizzle-orm/pg-core";
export const usersTable = pgTable("users", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    userName: varchar({ length: 255 }).notNull(),
    email: varchar({ length: 255 }).notNull().unique(),
    password: varchar("password", { length: 255 }).notNull(),
    avatarUrl: varchar(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    credits: integer().default(1),
});

export const imagesTable = pgTable("images", {
    id: uuid("id").defaultRandom().primaryKey(),
    filename: text("filename").notNull(),
    url: text("url").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const WireframeToCodeTable = pgTable("wireframes", {
    id: uuid("id").defaultRandom().primaryKey(),
    uid: varchar(),
    title: varchar(),
    imageUrl: varchar(),
    model: varchar(),
    description: varchar(),
    code: json(),
    createdBy: varchar()
});