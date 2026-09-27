"use client";

import { ListError, ListLoader, Sentinel } from "@/components/list-components";
import { NotFound } from "@/components/not-found";
import { PlayerSelectData } from "@/db/schema";
import { useInfiniteCursor } from "@/hooks/use-infinite-cursor";
import { useCallback } from "react";
import { readPlayersAction } from "../actions/actions";
import { usePlayerParams } from "../hooks/use-player-params";
import { PlayerCard } from "./player-card";

export const PlayersList = ({
  initialPlayers,
  initialNextCursor,
}: {
  initialPlayers: PlayerSelectData[];
  initialNextCursor: string | null;
}) => {
  const [filters] = usePlayerParams();
  const fetchPlayers = useCallback(
    async (lastCursor: string | null) => {
      return await readPlayersAction({
        ...filters,
        lastCursor: lastCursor,
      });
    },
    [filters],
  );

  const {
    items: players,
    isPending,
    nextCursor,
    error,
    sentinelRef,
  } = useInfiniteCursor(initialPlayers, initialNextCursor, fetchPlayers, {
    additionalDeps: [filters],
    customErrorMessage: "Failed to load players. Please try again.",
  });

  return (
    <div className="w-full min-w-0 @container flex-col">
      {players?.length ? (
        <div className="grid grid-cols-1 @2xl:grid-cols-2 @4xl:grid-cols-3 gap-4">
          {players.map((player) => (
            <PlayerCard key={player.id} player={player} />
          ))}
        </div>
      ) : (
        <NotFound
          title="No players found"
          description="Try adjusting your filters or adding new players."
        />
      )}
      {isPending && <ListLoader />}
      {nextCursor && <Sentinel ref={sentinelRef} />}
      {error && <ListError error={error} />}
    </div>
  );
};
