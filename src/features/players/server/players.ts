import { db } from "@/db/db";
import { PlayerInsertData, PlayerSelectData, PlayerTable } from "@/db/schema";
import { getCurrentUser } from "@/lib/auth/helpers";
import { and, eq } from "drizzle-orm";
import { revalidatePlayerCache } from "./cache/players";

export const confirmUserPlayerOwnershipDb = async (
  userId: string,
  playerId: string,
) => {
  const [existingPlayer] = await db
    .select()
    .from(PlayerTable)
    .where(and(eq(PlayerTable.userId, userId), eq(PlayerTable.id, playerId)));

  return existingPlayer ?? null;
};

export const insertPlayerDb = async (playerData: PlayerInsertData) => {
  const [insertedPlayer] = await db
    .insert(PlayerTable)
    .values(playerData)
    .returning();

  if (!insertedPlayer) return null;

  revalidatePlayerCache(insertedPlayer.userId, insertedPlayer.id);

  return insertedPlayer;
};

export const updatePlayerDb = async (
  playerId: string,
  playerData: Partial<
    Pick<PlayerSelectData, "name" | "ageGroup" | "goals" | "coachingNotes">
  >,
) => {
  const { userId } = await getCurrentUser();
  if (!userId) return null;

  const existingPlayer = await confirmUserPlayerOwnershipDb(userId, playerId);
  if (!existingPlayer) return null;

  const [updatedPlayer] = await db
    .update(PlayerTable)
    .set(playerData)
    .where(and(eq(PlayerTable.userId, userId), eq(PlayerTable.id, playerId)))
    .returning();

  if (!updatedPlayer) return null;

  revalidatePlayerCache(updatedPlayer.userId, updatedPlayer.id);

  return updatedPlayer;
};

export const deletePlayerDb = async (playerId: string) => {
  const { userId } = await getCurrentUser();
  if (!userId) return null;

  const existingPlayer = await confirmUserPlayerOwnershipDb(userId, playerId);
  if (!existingPlayer) return null;

  const [deletedPlayer] = await db
    .delete(PlayerTable)
    .where(and(eq(PlayerTable.userId, userId), eq(PlayerTable.id, playerId)))
    .returning();

  if (!deletedPlayer) return null;

  revalidatePlayerCache(deletedPlayer.userId, deletedPlayer.id);

  return deletedPlayer;
};
