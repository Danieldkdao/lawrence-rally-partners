import { ErrorState } from "@/components/error-state";
import { Button } from "@/components/ui/button";
import { readPlayersAction } from "@/features/players/actions/actions";
import { PlayerDialog } from "@/features/players/components/player-dialog";
import { PlayersFilters } from "@/features/players/components/players-filters";
import { PlayersList } from "@/features/players/components/players-list";
import { loadPlayersSearchParams } from "@/features/players/lib/params";
import { SearchParamsProps } from "@/lib/types";
import { PlusIcon } from "lucide-react";
import { Suspense } from "react";

const PlayersPage = (props: SearchParamsProps) => {
  return (
    <div className="w-full min-w-0 flex flex-col gap-4">
      <div className="w-full flex items-center justify-between gap-4">
        <h1 className="text-3xl font-semibold">Players</h1>
        <PlayerDialog>
          <Button>
            <PlusIcon />
            Add
          </Button>
        </PlayerDialog>
      </div>
      <Suspense fallback={<PlayersLoading />}>
        <PlayersSuspense {...props} />
      </Suspense>
    </div>
  );
};

const PlayersLoading = () => {
  return <div>loading</div>;
};

const PlayersSuspense = async ({ searchParams }: SearchParamsProps) => {
  const filters = await loadPlayersSearchParams(searchParams);
  const response = await readPlayersAction(filters);

  if (!response) {
    return (
      <ErrorState
        title="Error loading players"
        description="There was an error loading the players. Please try again."
      />
    );
  }

  const { data, nextCursor, key } = response;
  return (
    <div className="flex flex-col gap-4">
      <PlayersFilters />
      <PlayersList
        key={key}
        initialPlayers={data}
        initialNextCursor={nextCursor}
      />
    </div>
  );
};

export default PlayersPage;
