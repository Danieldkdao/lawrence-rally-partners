import { AgeGroup, Sport, WorkOnOption } from "@/db/schema";

export const formatAgeGroup = (ageGroup: AgeGroup) => {
  switch (ageGroup) {
    case "12-14":
      return "Ages 12 - 14";
    case "15-18":
      return "Ages 15 - 18";
    case "adult":
      return "Adult";
    case "under-12":
      return "Under 12";
    default:
      throw new Error(`Unknown age group: ${ageGroup satisfies never}`);
  }
};

export const formatSport = (sport: Sport) => {
  switch (sport) {
    case "both":
      return "Both";
    case "pickleball":
      return "Pickleball";
    case "tennis":
      return "Tennis";
    default:
      throw new Error(`Unknown sport: ${sport satisfies never}`);
  }
};

export const formatWorkOnOption = (workOnOption: WorkOnOption) => {
  switch (workOnOption) {
    case "consistency-drills":
      return "Consistency drills";
    case "hitting-partner":
      return "Just looking for a hitting partner";
    case "match-play":
      return "Match play";
    case "rallying":
      return "Rallying";
    case "serve-practice":
      return "Serve practice";
    case "tournament-preparation":
      return "Tournament preparation";
    default:
      throw new Error(
        `Unknown work on option: ${workOnOption satisfies never}`,
      );
  }
};
