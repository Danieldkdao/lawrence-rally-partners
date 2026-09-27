import { pgEnum } from "drizzle-orm/pg-core";

export const playerAgeGroups = [
  "under_8",
  "8_to_12",
  "13_to_17",
  "adult",
] as const;
export type PlayerAgeGroup = (typeof playerAgeGroups)[number];
export const playerAgeGroupEnum = pgEnum("player_age_groups", playerAgeGroups);

export const coachingSessionSports = ["tennis", "pickleball"] as const;
export type CoachingSessionSport = (typeof coachingSessionSports)[number];
export const coachingSessionSportEnum = pgEnum(
  "session_sports",
  coachingSessionSports,
);

export const coachingSessionStatuses = [
  "pending",
  "confirmed",
  "completed",
  "cancelled",
] as const;
export type CoachingSessionStatus = (typeof coachingSessionStatuses)[number];
export const coachingSessionStatusEnum = pgEnum(
  "session_statuses",
  coachingSessionStatuses,
);
