"use client";

import { ComponentProps } from "react";
import { useDeletePlayer } from "../hooks/use-delete-player";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LoadingSwap } from "@/components/ui/loading-swap";

export const DeletePlayerButton = ({
  playerId,
  children,
  afterAction,
  disabled,
  className,
  ...props
}: {
  playerId: string;
  afterAction?: () => void;
} & Omit<ComponentProps<typeof Button>, "onClick">) => {
  const { deletePlayer, isDeletionPending, ConfirmDeletePlayerDialog } =
    useDeletePlayer({ playerId, afterAction });

  return (
    <>
      {ConfirmDeletePlayerDialog}
      <Button
        {...props}
        onClick={deletePlayer}
        disabled={disabled}
        className={cn(className)}
      >
        <LoadingSwap
          isLoading={isDeletionPending}
          className="flex items-center gap-2"
        >
          {children}
        </LoadingSwap>
      </Button>
    </>
  );
};
