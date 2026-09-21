import { useQueryStates } from "nuqs";
import { playersSearchParams } from "../lib/params";

export const usePlayerParams = () => {
  return useQueryStates(playersSearchParams, { shallow: false });
};
