import { Loader2Icon } from "lucide-react";
import { Ref } from "react";

export const ListLoader = () => {
  return (
    <div className="flex items-center justify-center">
      <Loader2Icon className="size-6 animate-spin text-primary" />
    </div>
  );
};

export const Sentinel = ({ ref }: { ref: Ref<HTMLDivElement> }) => {
  return <div ref={ref} className="h-1 w-full bg-transparent" />;
};

export const ListError = ({ error }: { error: string }) => {
  return (
    <div className="flex items-center justify-center">
      <p className="text-base font-medium text-destructive">{error}</p>
    </div>
  );
};
