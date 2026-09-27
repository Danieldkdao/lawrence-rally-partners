import { useConfirm } from "@/hooks/use-confirm";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { deletePlayerAction } from "../actions/actions";
import { toast } from "sonner";

export const useDeletePlayer = ({
  playerId,
  afterAction,
}: {
  playerId: string;
  afterAction?: () => void;
}) => {
  const { confirm, ConfirmationDialog } = useConfirm(
    "Confirm Deletion",
    "Are you sure you want to delete this player? This action cannot be undone.",
  );
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const deletePlayer = async () => {
    const confirmation = await confirm();
    if (!confirmation) return;

    startTransition(async () => {
      const response = await deletePlayerAction(playerId);
      if (response.error) {
        toast.error(response.message);
      } else {
        toast.success(response.message);
        router.refresh();
        afterAction?.();
      }
    });
  };

  return {
    deletePlayer,
    ConfirmDeletePlayerDialog: ConfirmationDialog,
    isDeletionPending: isPending,
  };
};
