import { revalidateTag } from "next/cache";

export const getSessionsGlobalTag = () => {
  return "global:sessions" as const;
};

export const revalidateSessionsCache = () => {
  revalidateTag(getSessionsGlobalTag(), { expire: 0 });
};
