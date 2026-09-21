"use server";

import { getCurrentUser } from "@/lib/auth/helpers";
import {
  createPlayerSchema,
  CreatePlayerSchema,
  playersPaginationCursorSchema,
  ReadPlayersOptionsSchema,
  updatePlayerSchema,
  UpdatePlayerSchema,
} from "./schemas";
import {
  INVALID_DATA_ERROR_MESSAGE,
  NOT_FOUND_ERROR_MESSAGE,
  PAGE_SIZE,
  UNAUTHED_ERROR_MESSAGE,
} from "@/lib/constants";
import { getErrorMessage, isValidIds } from "@/lib/utils";
import {
  confirmUserPlayerOwnershipDb,
  deletePlayerDb,
  insertPlayerDb,
  updatePlayerDb,
} from "../server/players";
import { cacheTag } from "next/cache";
import { getUserPlayerTag } from "../server/cache/players";
import {
  and,
  asc,
  desc,
  eq,
  gt,
  ilike,
  inArray,
  lt,
  ne,
  or,
  SQL,
} from "drizzle-orm";
import { PlayerTable } from "@/db/schema";
import { PlayersSortByOption } from "../lib/params";
import { db } from "@/db/db";

const readCachedPlayersAction = async (
  userId: string,
  options: ReadPlayersOptionsSchema,
) => {
  "use cache";
  cacheTag(getUserPlayerTag(userId));

  const { search, sortBy, ageGroups, lastCursor } = options;

  const searchTerm = `%${search.trim()}%`;
  const searchFilter = search.trim()
    ? or(
        ilike(PlayerTable.name, searchTerm),
        ilike(PlayerTable.goals, searchTerm),
        ilike(PlayerTable.coachingNotes, searchTerm),
      )
    : undefined;

  const ageGroupFilter = ageGroups.length
    ? inArray(PlayerTable.ageGroup, ageGroups)
    : undefined;

  const { success, data } = playersPaginationCursorSchema.safeParse(lastCursor);
  if (!success || !data.timestamp) return null;

  const sortByMap: Record<
    PlayersSortByOption,
    { cursorFilter: SQL<unknown> | undefined; sortBy: SQL<unknown>[] }
  > = {
    recently_created: {
      sortBy: [desc(PlayerTable.createdAt), desc(PlayerTable.id)],
      cursorFilter: or(
        gt(PlayerTable.createdAt, data.timestamp),
        and(
          eq(PlayerTable.createdAt, data.timestamp),
          gt(PlayerTable.id, data.playerId),
        ),
      ),
    },
    oldest: {
      sortBy: [asc(PlayerTable.createdAt), asc(PlayerTable.id)],
      cursorFilter: or(
        lt(PlayerTable.createdAt, data.timestamp),
        and(
          eq(PlayerTable.createdAt, data.timestamp),
          lt(PlayerTable.id, data.playerId),
        ),
      ),
    },
    recently_updated: {
      sortBy: [desc(PlayerTable.updatedAt), desc(PlayerTable.id)],
      cursorFilter: or(
        gt(PlayerTable.updatedAt, data.timestamp),
        and(
          eq(PlayerTable.updatedAt, data.timestamp),
          gt(PlayerTable.id, data.playerId),
        ),
      ),
    },
  };

  const filters = and(
    eq(PlayerTable.userId, userId),
    searchFilter,
    ageGroupFilter,
    sortByMap[sortBy].cursorFilter,
  );

  const players = await db
    .select()
    .from(PlayerTable)
    .where(filters)
    .orderBy(...sortByMap[sortBy].sortBy)
    .limit(PAGE_SIZE + 1);

  const hasNextPage = players.length > PAGE_SIZE;
  const nextCursor = hasNextPage
    ? {
        playerId: players[PAGE_SIZE - 1].id,
        timestamp:
          sortBy === "oldest"
            ? players[PAGE_SIZE - 1].createdAt
            : players[PAGE_SIZE - 1].updatedAt,
      }
    : null;
};
export const readPlayersAction = async (options: ReadPlayersOptionsSchema) => {
  const { userId } = await getCurrentUser();
  if (!userId) return null;

  return readCachedPlayersAction(userId, options);
};

export const createPlayerAction = async (unsafeData: CreatePlayerSchema) => {
  const { userId } = await getCurrentUser();
  if (!userId) {
    return {
      error: true as const,
      message: UNAUTHED_ERROR_MESSAGE,
    };
  }

  const { success, data } = createPlayerSchema.safeParse(unsafeData);
  if (!success) {
    return {
      error: true as const,
      message: INVALID_DATA_ERROR_MESSAGE,
    };
  }

  try {
    const insertedPlayer = await insertPlayerDb({ ...data, userId });
    if (!insertedPlayer) throw new Error("Failed to insert player.");

    return {
      error: false as const,
      message: "Player created successfully!",
      playerId: insertedPlayer.id,
    };
  } catch (error) {
    console.error(error);
    return {
      error: true as const,
      message: getErrorMessage(error),
    };
  }
};

export const updatePlayerAction = async (
  playerId: string,
  unsafeData: UpdatePlayerSchema,
) => {
  if (!isValidIds(playerId)) {
    return {
      error: true as const,
      message: NOT_FOUND_ERROR_MESSAGE,
    };
  }

  const { userId } = await getCurrentUser();
  if (!userId) {
    return {
      error: true as const,
      message: UNAUTHED_ERROR_MESSAGE,
    };
  }

  const existingPlayer = await confirmUserPlayerOwnershipDb(userId, playerId);
  if (!existingPlayer) {
    return {
      error: true as const,
      message: NOT_FOUND_ERROR_MESSAGE,
    };
  }

  const { success, data } = updatePlayerSchema.safeParse({
    ...existingPlayer,
    unsafeData,
  });
  if (!success) {
    return {
      error: true as const,
      message: INVALID_DATA_ERROR_MESSAGE,
    };
  }

  try {
    const updatedPlayer = await updatePlayerDb(existingPlayer.id, data);
    if (!updatedPlayer) throw new Error("Failed to update player.");

    return {
      error: true as const,
      message: "Player updated successfully!",
      playerId: updatedPlayer.id,
    };
  } catch (error) {
    console.error(error);
    return {
      error: true as const,
      message: getErrorMessage(error),
    };
  }
};

export const deletePlayerAction = async (playerId: string) => {
  if (!isValidIds(playerId)) {
    return {
      error: true as const,
      message: NOT_FOUND_ERROR_MESSAGE,
    };
  }

  const { userId } = await getCurrentUser();
  if (!userId) {
    return {
      error: true as const,
      message: UNAUTHED_ERROR_MESSAGE,
    };
  }

  const existingPlayer = await confirmUserPlayerOwnershipDb(userId, playerId);
  if (!existingPlayer) {
    return {
      error: true as const,
      message: NOT_FOUND_ERROR_MESSAGE,
    };
  }

  try {
    const deletedPlayer = await deletePlayerDb(existingPlayer.id);
    if (!deletedPlayer) throw new Error("Failed to delete player.");

    return {
      error: false as const,
      message: "Player deleted successfully!",
      playerId: deletedPlayer.id,
    };
  } catch (error) {
    console.error(error);
    return {
      error: true as const,
      message: getErrorMessage(error),
    };
  }
};
