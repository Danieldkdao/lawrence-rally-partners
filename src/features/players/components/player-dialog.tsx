"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PlayerSelectData } from "@/db/schema";
import { Setter } from "@/lib/types";
import { ReactElement, useState } from "react";
import { PlayerForm } from "./player-form";

export const PlayerDialog = ({
  existingPlayer,
  children,
  open,
  setOpen,
}: {
  existingPlayer?: PlayerSelectData;
  children?: ReactElement;
  open?: boolean;
  setOpen?: Setter<boolean>;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const openToUse = open ?? isOpen;
  const setOpenToUse = setOpen ?? setIsOpen;

  return (
    <Dialog open={openToUse} onOpenChange={setOpenToUse}>
      {children && <DialogTrigger render={children} />}
      <DialogContent>
        <DialogHeader className="sr-only">
          <DialogTitle>
            {existingPlayer ? "Update Player" : "Create Player"}
          </DialogTitle>
        </DialogHeader>
        <PlayerForm
          existingPlayer={existingPlayer}
          afterAction={() => setOpenToUse(false)}
        />
      </DialogContent>
    </Dialog>
  );
};
