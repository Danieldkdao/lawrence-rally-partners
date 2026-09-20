import { pgTable, text, uuid } from "drizzle-orm/pg-core";
import { createdAt, id, updatedAt } from "../helpers";
import { user } from "./user";
import { ageGroupEnum } from "./session";
import { relations } from "drizzle-orm";

export const PlayerTable = pgTable("players", {
  id,
  userId: uuid("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  ageGroup: ageGroupEnum("age_group").notNull(),
  goals: text("goals"),
  coachingNotes: text("coaching_notes"),
  createdAt,
  updatedAt,
});

export type PlayerInsertData = typeof PlayerTable.$inferInsert;
export type PlayerSelectData = typeof PlayerTable.$inferSelect;

export const playerRelations = relations(PlayerTable, ({ one }) => ({
  user: one(user, {
    fields: [PlayerTable.userId],
    references: [user.id],
  }),
}));
