"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LoadingSwap } from "@/components/ui/loading-swap";
import { PlayerSelectData } from "@/db/schema";
import { PencilIcon, Trash2Icon } from "lucide-react";
import { ReactElement } from "react";
import { useDeletePlayer } from "../hooks/use-delete-player";
import { useUpdatePlayer } from "../hooks/use-update-player";

export const PlayerOptions = ({
  children,
  player,
}: {
  children: ReactElement;
  player: PlayerSelectData;
}) => {
  const { updatePlayer, UpdatePlayerDialog } = useUpdatePlayer({ player });
  const { deletePlayer, isDeletionPending, ConfirmDeletePlayerDialog } =
    useDeletePlayer({ playerId: player.id });

  return (
    <>
      {UpdatePlayerDialog}
      {ConfirmDeletePlayerDialog}
      <DropdownMenu>
        <DropdownMenuTrigger
          render={children}
          onClick={(e) => e.stopPropagation()}
        />
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              updatePlayer();
            }}
          >
            <PencilIcon className="size-4 mr-2" />
            Edit player
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer text-destructive focus:bg-destructive/10 focus:text-destructive"
            onClick={(e) => {
              e.stopPropagation();
              deletePlayer();
            }}
            disabled={isDeletionPending}
          >
            <LoadingSwap
              isLoading={isDeletionPending}
              className="flex items-center gap-2"
            >
              <Trash2Icon className="size-4 mr-2" />
              Delete player
            </LoadingSwap>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
