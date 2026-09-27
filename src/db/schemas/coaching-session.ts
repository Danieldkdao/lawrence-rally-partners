import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { createdAt, id, updatedAt } from "../helpers";
import { user } from "./user";
import { coachingSessionSportEnum, coachingSessionStatusEnum } from "../shared";
import { relations } from "drizzle-orm";
import { PlayerTable } from "./player";

export const CoachingSessionTable = pgTable("coaching_sessions", {
  id,
  userId: uuid("user_id")
    .references(() => user.id, { onDelete: "cascade" })
    .notNull(),
  playerId: uuid("player_id")
    .references(() => user.id, { onDelete: "cascade" })
    .notNull(),
  sport: coachingSessionSportEnum("sport").notNull(),
  sessionDetails: text("session_details").notNull(),
  startsAt: timestamp("starts_at", {
    mode: "string",
    withTimezone: true,
  }).notNull(),
  endsAt: timestamp("ends_at", {
    mode: "string",
    withTimezone: true,
  }).notNull(),
  location: text("location").notNull(),
  status: coachingSessionStatusEnum("status").notNull().default("pending"),
  coachFeedback: text("coach_feedback"),
  createdAt,
  updatedAt,
});

export type CoachingSessionInsertData =
  typeof CoachingSessionTable.$inferInsert;
export type CoachingSessionSelectData =
  typeof CoachingSessionTable.$inferSelect;

export const coachingSessionRelations = relations(
  CoachingSessionTable,
  ({ one }) => ({
    user: one(user, {
      fields: [CoachingSessionTable.userId],
      references: [user.id],
    }),
    player: one(PlayerTable, {
      fields: [CoachingSessionTable.playerId],
      references: [PlayerTable.id],
    }),
  }),
);
