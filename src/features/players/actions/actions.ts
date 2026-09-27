"use server";

import { db } from "@/db/db";
import { PlayerSelectData, PlayerTable } from "@/db/schema";
import { getCurrentUser } from "@/lib/auth/helpers";
import {
  INVALID_DATA_ERROR_MESSAGE,
  NOT_FOUND_ERROR_MESSAGE,
  PAGE_SIZE,
  UNAUTHED_ERROR_MESSAGE,
} from "@/lib/constants";
import { KeysOfType } from "@/lib/types";
import { getErrorMessage, isValidIds, writeCursor } from "@/lib/utils";
import {
  and,
  asc,
  desc,
  eq,
  gt,
  ilike,
  inArray,
  lt,
  or,
  SQL,
} from "drizzle-orm";
import { cacheTag } from "next/cache";
import { PlayersSortByOption } from "../lib/params";
import { getUserPlayerTag } from "../server/cache/players";
import {
  confirmUserPlayerOwnershipDb,
  deletePlayerDb,
  insertPlayerDb,
  updatePlayerDb,
} from "../server/players";
import {
  createPlayerSchema,
  CreatePlayerSchema,
  playersPaginationCursorSchema,
  ReadPlayersOptionsSchema,
  updatePlayerSchema,
  UpdatePlayerSchema,
} from "./schemas";

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
  if (lastCursor && (!success || !data.timestamp)) return null;

  const sortByMap: Record<
    PlayersSortByOption,
    {
      cursorFilter: SQL<unknown> | undefined;
      sortBy: SQL<unknown>[];
      nextCursorField: KeysOfType<PlayerSelectData, Date>;
    }
  > = {
    recently_created: {
      sortBy: [desc(PlayerTable.createdAt), desc(PlayerTable.id)],
      cursorFilter: data
        ? or(
            lt(PlayerTable.createdAt, data.timestamp),
            and(
              eq(PlayerTable.createdAt, data.timestamp),
              lt(PlayerTable.id, data.playerId),
            ),
          )
        : undefined,
      nextCursorField: "createdAt",
    },
    oldest: {
      sortBy: [asc(PlayerTable.createdAt), asc(PlayerTable.id)],
      cursorFilter: data
        ? or(
            gt(PlayerTable.createdAt, data.timestamp),
            and(
              eq(PlayerTable.createdAt, data.timestamp),
              gt(PlayerTable.id, data.playerId),
            ),
          )
        : undefined,
      nextCursorField: "createdAt",
    },
    recently_updated: {
      sortBy: [desc(PlayerTable.updatedAt), desc(PlayerTable.id)],
      cursorFilter: data
        ? or(
            lt(PlayerTable.updatedAt, data.timestamp),
            and(
              eq(PlayerTable.updatedAt, data.timestamp),
              lt(PlayerTable.id, data.playerId),
            ),
          )
        : undefined,
      nextCursorField: "updatedAt",
    },
  };

  const sortByOption = sortByMap[sortBy];

  const filters = and(
    eq(PlayerTable.userId, userId),
    searchFilter,
    ageGroupFilter,
    sortByOption.cursorFilter,
  );

  const players = await db
    .select()
    .from(PlayerTable)
    .where(filters)
    .orderBy(...sortByOption.sortBy)
    .limit(PAGE_SIZE + 1);

  const hasNextPage = players.length > PAGE_SIZE;
  const nextCursor = hasNextPage
    ? writeCursor({
        playerId: players[PAGE_SIZE - 1].id,
        timestamp:
          players[PAGE_SIZE - 1][sortByOption.nextCursorField].toISOString(),
      })
    : null;

  const playersKey = JSON.stringify({
    players: players.map((player) => ({
      id: player.id,
      updated: player.updatedAt.toISOString(),
    })),
    filters: {
      search: options.search,
      sortBy: options.sortBy,
      ageGroups: options.ageGroups,
    },
  });

  return {
    data: players.slice(0, PAGE_SIZE),
    nextCursor,
    key: playersKey,
  };
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
    ...unsafeData,
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
      error: false as const,
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
