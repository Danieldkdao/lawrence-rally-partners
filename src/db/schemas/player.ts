import { pgTable, text, uuid } from "drizzle-orm/pg-core";
import { createdAt, id, updatedAt } from "../helpers";
import { user } from "./user";
import { relations } from "drizzle-orm";
import { playerAgeGroupEnum } from "../shared";
import { CoachingSessionTable } from "./coaching-session";

export const PlayerTable = pgTable("players", {
  id,
  userId: uuid("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  ageGroup: playerAgeGroupEnum("age_group").notNull(),
  goals: text("goals"),
  coachingNotes: text("coaching_notes"),
  createdAt,
  updatedAt,
});

export type PlayerInsertData = typeof PlayerTable.$inferInsert;
export type PlayerSelectData = typeof PlayerTable.$inferSelect;

export const playerRelations = relations(PlayerTable, ({ one, many }) => ({
  user: one(user, {
    fields: [PlayerTable.userId],
    references: [user.id],
  }),
  coachingSessions: many(CoachingSessionTable),
}));
