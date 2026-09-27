import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PlayerSelectData } from "@/db/schema";
import { Setter } from "@/lib/types";
import { format } from "date-fns";
import {
  CalendarIcon,
  ClipboardListIcon,
  DotIcon,
  PencilIcon,
  RefreshCcwIcon,
  TargetIcon,
  Trash2Icon,
  UsersRoundIcon,
} from "lucide-react";
import { ComponentProps, ReactElement, useState } from "react";
import { formatPlayerAgeGroup } from "../lib/formatters";
import { DeletePlayerButton } from "./delete-player-button";
import { PlayerDialog } from "./player-dialog";

export const PlayerInfoDialog = ({
  player,
  children,
  open,
  setOpen,
  triggerProps,
  ...props
}: {
  player: PlayerSelectData;
  children?: ReactElement;
  open?: boolean;
  setOpen?: Setter<boolean>;
  triggerProps?: Omit<ComponentProps<typeof DialogTrigger>, "render">;
} & Omit<ComponentProps<typeof Dialog>, "open" | "onOpenChange">) => {
  const [isOpen, setIsOpen] = useState(false);

  const openToUse = open ?? isOpen;
  const setOpenToUse = setOpen ?? setIsOpen;

  return (
    <Dialog open={openToUse} onOpenChange={setOpenToUse} {...props}>
      {children && <DialogTrigger render={children} {...triggerProps} />}
      <DialogContent className="sm:max-w-xl max-h-[90vh] overflow-y-auto gap-4">
        <DialogHeader className="gap-1 text-left">
          <DialogTitle className="text-2xl font-semibold tracking-tight">
            {player.name}
          </DialogTitle>
          <div className="flex flex-wrap items-center gap-1 pt-1 text-muted-foreground">
            <div className="flex items-center gap-2">
              <UsersRoundIcon className="size-5" />
              <span className="text-lg font-medium">
                {formatPlayerAgeGroup(player.ageGroup)}
              </span>
            </div>
            <DotIcon className="text-muted-foreground size-5" />
            <div className="flex items-center gap-1.5" title="Created At">
              <CalendarIcon className="size-5" />
              <span className="text-lg font-medium">
                Joined {format(new Date(player.createdAt), "MMM d, yyyy")}
              </span>
            </div>
          </div>
        </DialogHeader>
        <div className="flex flex-col gap-4 py-4">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 font-semibold text-muted-foreground">
              <ClipboardListIcon className="size-5" />
              <span className="text-base">Coaching Notes</span>
            </div>
            <p className="text-lg">
              {player.coachingNotes || "No coaching notes added."}
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 font-semibold text-muted-foreground">
              <TargetIcon className="size-5" />
              <span className="text-base">Goals</span>
            </div>
            <p className="text-lg">{player.goals || "No goals added."}</p>
          </div>
        </div>
        <DialogFooter className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-t pt-4 mt-2 gap-4">
          <div className="text-xs text-muted-foreground flex items-center gap-1.5">
            {player.updatedAt && (
              <>
                <RefreshCcwIcon className="size-5" />
                <span className="text-lg">
                  Last updated{" "}
                  {format(new Date(player.updatedAt), "MMM d, yyyy")}
                </span>
              </>
            )}
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <PlayerDialog existingPlayer={player}>
              <Button variant="outline" className="gap-2 flex-1 sm:flex-none">
                <PencilIcon className="size-4" />
                Edit
              </Button>
            </PlayerDialog>
            <DeletePlayerButton
              playerId={player.id}
              variant="destructive"
              className="gap-2 flex-1 sm:flex-none"
              afterAction={() => setOpenToUse(false)}
            >
              <Trash2Icon className="size-4" />
              Delete
            </DeletePlayerButton>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
