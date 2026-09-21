import { getIdTag, getUserResourceTag } from "@/lib/data-cache";
import { revalidateTag } from "next/cache";

export const getPlayerIdTag = (playerId: string) => {
  return getIdTag(playerId, "players");
};

export const getUserPlayerTag = (userId: string) => {
  return getUserResourceTag(userId, "players");
};

export const revalidatePlayerCache = (userId: string, playerId: string) => {
  revalidateTag(getPlayerIdTag(playerId), { expire: 0 });
  revalidateTag(getUserPlayerTag(userId), { expire: 0 });
};
