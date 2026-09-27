"use client";

import {
  MultiSelect,
  MultiSelectContent,
  MultiSelectItem,
  MultiSelectTrigger,
  MultiSelectValue,
} from "@/components/multi-select";
import { SearchInput } from "@/components/search-input";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PlayerAgeGroup, playerAgeGroups } from "@/db/shared";
import { FilterIcon } from "lucide-react";
import { usePlayerParams } from "../hooks/use-player-params";
import {
  formatPlayerAgeGroup,
  formatPlayersSortByOption,
} from "../lib/formatters";
import { PlayersSortByOption, playersSortByOptions } from "../lib/params";

export const PlayersFilters = () => {
  const [filters, setFilters] = usePlayerParams();

  return (
    <div className="flex items-center gap-2">
      <SearchInput
        initialValue={filters.search}
        onSearch={(search) => setFilters({ search })}
        placeholder="Search players by name, notes, or goals..."
        className="w-full flex-1"
      />
      <Popover>
        <PopoverTrigger
          render={
            <Button variant="outline" size="icon">
              <FilterIcon />
            </Button>
          }
        />
        <PopoverContent align="end">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <span className="text-base font-medium">Sort By</span>
              <Select
                value={filters.sortBy}
                onValueChange={(value) =>
                  setFilters({ sortBy: value as PlayersSortByOption })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a sort option">
                    {formatPlayersSortByOption(filters.sortBy)}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {playersSortByOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {formatPlayersSortByOption(option)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-base font-medium">Age Group</span>
              <MultiSelect
                values={filters.ageGroups}
                onValuesChange={(values) =>
                  setFilters({ ageGroups: values as PlayerAgeGroup[] })
                }
              >
                <MultiSelectTrigger className="w-full">
                  <MultiSelectValue placeholder="Select age groups" />
                </MultiSelectTrigger>
                <MultiSelectContent>
                  {playerAgeGroups.map((ageGroup) => (
                    <MultiSelectItem key={ageGroup} value={ageGroup}>
                      {formatPlayerAgeGroup(ageGroup)}
                    </MultiSelectItem>
                  ))}
                </MultiSelectContent>
              </MultiSelect>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};
