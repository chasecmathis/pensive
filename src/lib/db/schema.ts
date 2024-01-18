import { serial, text, pgTable, timestamp } from "drizzle-orm/pg-core";

export const $notebooks = pgTable("notebooks", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  createdAt: timestamp("createdAt").notNull(),
  imageURL: text("imageURL"),
  userId: text("userId").notNull(),
  content: text("content"),
});

export type NotebookType = typeof $notebooks.$inferInsert

