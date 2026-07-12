import { pgEnum, pgTable, text } from "drizzle-orm/pg-core";
import { id } from "../helpers";

export const ageGroups = ["under-12", "12-14", "15-18", "adult"] as const;
export type AgeGroup = (typeof ageGroups)[number];
export const ageGroupEnum = pgEnum("age_groups", ageGroups);

export const sports = ["tennis", "pickleball", "both"] as const;
export type Sport = (typeof sports)[number];
export const sportEnum = pgEnum("sports", sports);

export const workOnOptions = [
  "rallying",
  "consistency-drills",
  "match-play",
  "serve-practice",
  "tournament-preparation",
  "hitting-partner",
] as const;
export type WorkOnOption = (typeof workOnOptions)[number];
export const workOnOptionEnum = pgEnum("work_on_options", workOnOptions);

export const SessionTable = pgTable("sessions", {
  id,
  name: text("name").notNull(),
  email: text("email").notNull(),
  phoneNumber: text("phone_number").notNull(),
  ageGroup: ageGroupEnum("age_group").notNull(),
  sport: sportEnum("sport").notNull(),
  workOnOption: workOnOptionEnum("work_on_option").notNull(),
  availability: text("availability").notNull(),
  location: text("location").notNull(),
  additionalNotes: text("additional_notes"),
});
