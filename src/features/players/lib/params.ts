import { playerAgeGroups } from "@/db/shared";
import {
  createLoader,
  parseAsArrayOf,
  parseAsString,
  parseAsStringEnum,
  type inferParserType,
} from "nuqs/server";

export const playersSortByOptions = [
  "recently_created",
  "oldest",
  "recently_updated",
] as const;
export type PlayersSortByOption = (typeof playersSortByOptions)[number];

export const playersSearchParams = {
  search: parseAsString.withDefault("").withOptions({ clearOnDefault: true }),
  sortBy: parseAsStringEnum([...playersSortByOptions])
    .withDefault("recently_created")
    .withOptions({ clearOnDefault: true }),
  ageGroups: parseAsArrayOf(parseAsStringEnum([...playerAgeGroups]))
    .withDefault([])
    .withOptions({ clearOnDefault: true }),
};

export const loadPlayersSearchParams = createLoader(playersSearchParams);
