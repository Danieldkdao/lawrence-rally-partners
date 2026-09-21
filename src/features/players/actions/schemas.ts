import { playerAgeGroups } from "@/db/shared";
import { isoTimestampSchema } from "@/lib/schemas";
import {
  createPaginationCursorSchema,
  optionalifyZodSchema,
} from "@/lib/utils";
import z from "zod";
import { playersSortByOptions } from "../lib/params";

export const playersPaginationCursorSchema = createPaginationCursorSchema(
  z.object({
    playerId: z.uuid(),
    timestamp: isoTimestampSchema,
  }),
);

export const readPlayersOptionsSchema = z.object({
  search: z.string().trim(),
  sortBy: z.enum(playersSortByOptions),
  ageGroups: z.array(z.enum(playerAgeGroups)),
  lastCursor: playersPaginationCursorSchema.nullish(),
});
export type ReadPlayersOptionsSchema = z.infer<typeof readPlayersOptionsSchema>;

export const createPlayerSchema = z.object({
  name: z.string().trim().min(1, { error: "Name is required." }),
  ageGroup: z.enum(playerAgeGroups),
  goals: z.string().optional(),
  coachingNotes: z.string().optional(),
});
export type CreatePlayerSchema = z.infer<typeof createPlayerSchema>;

export const updatePlayerSchema = optionalifyZodSchema(createPlayerSchema);
export type UpdatePlayerSchema = z.infer<typeof updatePlayerSchema>;
