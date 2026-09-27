"use client";

import { Controller, useForm } from "react-hook-form";
import { createPlayerSchema, CreatePlayerSchema } from "../actions/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Field,
  FieldContent,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { playerAgeGroups } from "@/db/shared";
import { formatPlayerAgeGroup } from "../lib/formatters";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { LoadingSwap } from "@/components/ui/loading-swap";
import { PlayerSelectData } from "@/db/schema";
import { createPlayerAction, updatePlayerAction } from "../actions/actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const PlayerForm = ({
  existingPlayer,
  afterAction,
}: {
  existingPlayer?: PlayerSelectData;
  afterAction?: () => void;
}) => {
  const router = useRouter();
  const form = useForm<CreatePlayerSchema>({
    resolver: zodResolver(createPlayerSchema),
    defaultValues: existingPlayer
      ? {
          name: existingPlayer.name,
          ageGroup: existingPlayer.ageGroup,
          coachingNotes: existingPlayer.coachingNotes ?? "",
          goals: existingPlayer.goals ?? "",
        }
      : {
          name: "",
          ageGroup: "under_8",
          coachingNotes: "",
          goals: "",
        },
  });

  const handleSubmit = async (data: CreatePlayerSchema) => {
    const action = existingPlayer
      ? updatePlayerAction(existingPlayer.id, data)
      : createPlayerAction(data);
    const response = await action;
    if (response.error) {
      toast.error(response.message);
    } else {
      toast.success(response.message);
      router.refresh();
      afterAction?.();
    }
  };

  return (
    <form
      onSubmit={form.handleSubmit(handleSubmit)}
      className="flex flex-col gap-4"
    >
      <Controller
        control={form.control}
        name="name"
        render={({ field, fieldState }) => (
          <Field data-invalid={!!fieldState.error}>
            <FieldLabel htmlFor="player-form-name">Name</FieldLabel>
            <FieldContent>
              <Input
                id="player-form-name"
                placeholder="Enter player name"
                aria-invalid={!!fieldState.error}
                {...field}
              />
            </FieldContent>
            {fieldState.error && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <Controller
        control={form.control}
        name="ageGroup"
        render={({ field: { value, onChange, ...props }, fieldState }) => (
          <Field data-invalid={!!fieldState.error}>
            <FieldLabel htmlFor="player-form-age-group">Age Group</FieldLabel>
            <FieldContent>
              <Select value={value} onValueChange={onChange} {...props}>
                <SelectTrigger
                  id="player-form-age-group"
                  aria-invalid={!!fieldState.error}
                  className="w-full"
                >
                  <SelectValue placeholder="Select an age group">
                    {formatPlayerAgeGroup(value)}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {playerAgeGroups.map((ageGroup) => (
                    <SelectItem key={ageGroup} value={ageGroup}>
                      {formatPlayerAgeGroup(ageGroup)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FieldContent>
            {fieldState.error && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <Controller
        control={form.control}
        name="coachingNotes"
        render={({ field, fieldState }) => (
          <Field data-invalid={!!fieldState.error}>
            <FieldLabel htmlFor="player-form-coaching-notes">
              Coaching Notes
            </FieldLabel>
            <FieldContent>
              <Textarea
                id="player-form-coaching-notes"
                placeholder="Anything we should know when coaching this player?"
                className="max-h-32"
                aria-invalid={!!fieldState.error}
                {...field}
              />
            </FieldContent>
            {fieldState.error && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <Controller
        control={form.control}
        name="goals"
        render={({ field, fieldState }) => (
          <Field data-invalid={!!fieldState.error}>
            <FieldLabel htmlFor="player-form-goals">Goals</FieldLabel>
            <FieldContent>
              <Textarea
                id="player-form-goals"
                placeholder="What are this player's goals?"
                className="max-h-32"
                aria-invalid={!!fieldState.error}
                {...field}
              />
            </FieldContent>
            {fieldState.error && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <Button type="submit" disabled={form.formState.isSubmitting}>
        <LoadingSwap isLoading={form.formState.isSubmitting}>
          {existingPlayer ? "Save Changes" : "Create Player"}
        </LoadingSwap>
      </Button>
    </form>
  );
};
