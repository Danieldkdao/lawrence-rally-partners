import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export const useConfirm = (
  title: string,
  description: string,
  confirmInput?: string,
) => {
  const [confirmInputValue, setConfirmInputValue] = useState("");
  const [promise, setPromise] = useState<{
    resolve: (value: boolean) => void;
  } | null>(null);

  const canAction = confirmInput?.length
    ? confirmInputValue === confirmInput
    : true;

  const confirm = () => {
    return new Promise<boolean>((resolve) => {
      setPromise({ resolve });
    });
  };

  const close = () => {
    setPromise(null);
  };

  const accept = () => {
    if (!canAction) return;

    promise?.resolve(true);
    close();
  };

  const cancel = () => {
    promise?.resolve(false);
    close();
  };

  const ConfirmationDialog = (
    <Dialog
      open={promise !== null}
      onOpenChange={(open) => {
        if (open) {
          setConfirmInputValue("");
        }
        if (!open) {
          cancel();
        }
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">{title}</DialogTitle>
          <DialogDescription className="text-lg text-muted-foreground">
            {description}
          </DialogDescription>
        </DialogHeader>
        {confirmInput?.length && (
          <div className="flex flex-col gap-2">
            <span className="text-muted-foreground">
              To confirm this action, please enter &quot;
              <span className="text-foreground font-medium">
                {confirmInput}
              </span>
              &quot; in the input below.
            </span>
            <Input
              className="text-lg md:text-lg"
              value={confirmInputValue}
              onChange={(e) => setConfirmInputValue(e.target.value)}
            />
          </div>
        )}
        <div className="pt-4 w-full flex flex-col-reverse gap-y-2 lg:flex-row gap-x-2 items-center justify-end">
          <Button
            onClick={cancel}
            variant="outline"
            className="w-full lg:w-auto"
          >
            Cancel
          </Button>
          <Button
            onClick={accept}
            disabled={!canAction}
            className="w-full lg:w-auto"
          >
            Confirm
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );

  return { confirm, ConfirmationDialog };
};
