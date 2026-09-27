import { pgEnum } from "drizzle-orm/pg-core";

export const playerAgeGroups = [
  "under_8",
  "8_to_12",
  "13_to_17",
  "adult",
] as const;
export type PlayerAgeGroup = (typeof playerAgeGroups)[number];
export const playerAgeGroupEnum = pgEnum("player_age_groups", playerAgeGroups);
