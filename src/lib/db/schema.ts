import { serial, text, pgTable, timestamp } from "drizzle-orm/pg-core";

export const $notebooks = pgTable("notebooks", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  background: text("background"),
  userId: text("user_id").notNull(),
  content: text("content"),
});

export type NotebookType = typeof $notebooks.$inferInsert

