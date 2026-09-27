import { useState } from "react";
import { PlayerDialog } from "../components/player-dialog";
import { PlayerSelectData } from "@/db/schema";

export const useUpdatePlayer = ({ player }: { player: PlayerSelectData }) => {
  const [updateOpen, setUpdateOpen] = useState(false);

  const UpdatePlayerDialog = (
    <PlayerDialog
      existingPlayer={player}
      open={updateOpen}
      setOpen={setUpdateOpen}
    />
  );

  const updatePlayer = () => {
    setUpdateOpen(true);
  };

  return { updatePlayer, UpdatePlayerDialog };
};
