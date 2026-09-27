import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PlayerSelectData } from "@/db/schema";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import {
  CalendarIcon,
  ClipboardListIcon,
  MoreVertical,
  RefreshCcwIcon,
  TargetIcon,
  UsersRoundIcon,
} from "lucide-react";
import { formatPlayerAgeGroup } from "../lib/formatters";
import { PlayerInfoDialog } from "./player-info-dialog";
import { PlayerOptions } from "./player-options";

export const PlayerCard = ({ player }: { player: PlayerSelectData }) => {
  return (
    <Card className="flex flex-col h-full overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="flex flex-row items-start justify-between gap-4 space-y-0">
        <PlayerInfoDialog
          player={player}
          triggerProps={{ nativeButton: false }}
        >
          <CardTitle className="text-2xl font-semibold truncate mt-1 cursor-pointer">
            {player.name}
          </CardTitle>
        </PlayerInfoDialog>
        <div className="flex items-center gap-2">
          <Badge
            variant="outline"
            className="flex items-center gap-1.5 whitespace-nowrap"
          >
            <UsersRoundIcon className="size-3.5" />
            {formatPlayerAgeGroup(player.ageGroup)}
          </Badge>
          <PlayerOptions player={player}>
            <Button variant="ghost" size="icon" className="size-8 -mr-2">
              <MoreVertical className="size-4" />
              <span className="sr-only">Open menu</span>
            </Button>
          </PlayerOptions>
        </div>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col gap-5 min-w-0">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
            <ClipboardListIcon className="size-5" />
            <span className="text-base">Coaching Notes</span>
          </div>
          <p
            className={cn(
              "text-lg leading-relaxed line-clamp-2",
              !player.coachingNotes
                ? "italic text-muted-foreground/70"
                : "text-foreground/90",
            )}
          >
            {player.coachingNotes || "No coaching notes added."}
          </p>
        </div>
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
            <TargetIcon className="size-4" />
            <span className="text-base">Goals</span>
          </div>
          <p
            className={cn(
              "text-lg leading-relaxed line-clamp-2",
              !player.goals
                ? "italic text-muted-foreground/70"
                : "text-foreground/90",
            )}
          >
            {player.goals || "No goals added."}
          </p>
        </div>
      </CardContent>
      <CardFooter className="pt-4 border-t bg-muted/10 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
        <div className="flex items-center gap-1.5" title="Created At">
          <CalendarIcon className="size-3.5" />
          <span className="text-base">
            Created {format(new Date(player.createdAt), "MMM d, yyyy")}
          </span>
        </div>
        {player.updatedAt && (
          <div className="flex items-center gap-1.5" title="Last Updated">
            <RefreshCcwIcon className="size-3.5" />
            <span className="text-base">
              Updated {format(new Date(player.updatedAt), "MMM d, yyyy")}
            </span>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};
