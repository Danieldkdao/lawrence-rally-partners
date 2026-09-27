import { PlayerAgeGroup } from "@/db/shared";
import { PlayersSortByOption } from "./params";

export const formatPlayerAgeGroup = (ageGroup: PlayerAgeGroup) => {
  switch (ageGroup) {
    case "under_8":
      return "Under 8";
    case "8_to_12":
      return "8 to 12";
    case "13_to_17":
      return "13 to 17";
    case "adult":
      return "Adult";
    default:
      throw new Error(`Unknown age group: ${ageGroup satisfies never}`);
  }
};

export const formatPlayersSortByOption = (option: PlayersSortByOption) => {
  switch (option) {
    case "oldest":
      return "Oldest";
    case "recently_created":
      return "Recently Created";
    case "recently_updated":
      return "Recently Updated";
    default:
      throw new Error(`Unknown sort by option: ${option satisfies never}`);
  }
};
