"use client";

import { Controller, useForm } from "react-hook-form";
import { sessionSchema, SessionSchemaType } from "../actions/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Field,
  FieldContent,
  FieldDescription,
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
import {
  formatAgeGroup,
  formatSport,
  formatWorkOnOption,
} from "../lib/formatters";
import { ageGroups, sports, workOnOptions } from "@/db/schema";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { LoadingSwap } from "@/components/ui/loading-swap";
import { createSessionAction } from "../actions/actions";
import { toast } from "sonner";
import { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle2Icon } from "lucide-react";
import { useRouter } from "next/navigation";

export const SessionForm = () => {
  const router = useRouter();
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const form = useForm<SessionSchemaType>({
    resolver: zodResolver(sessionSchema),
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
      ageGroup: "under-12",
      sport: "tennis",
      workOnOption: "hitting-partner",
      availability: "",
      location: "",
      additionalNotes: "",
    },
  });

  const handleFormSubmission = async (data: SessionSchemaType) => {
    const response = await createSessionAction(data);
    if (response.error) {
      toast.error(response.message);
    } else {
      toast.success(response.message);
      form.reset();
      setHasSubmitted(true);
      router.refresh();
    }
  };

  return (
    <form
      onSubmit={form.handleSubmit(handleFormSubmission)}
      className="w-full flex flex-col gap-4"
    >
      <Controller
        control={form.control}
        name="name"
        render={({ field, fieldState }) => (
          <Field data-invalid={!!fieldState.error}>
            <FieldLabel htmlFor={fieldState.error && "name-invalid-input"}>
              Full Name
            </FieldLabel>
            <FieldContent>
              <Input
                id={fieldState.error && "name-invalid-input"}
                placeholder="Enter your full name"
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
        name="email"
        render={({ field, fieldState }) => (
          <Field data-invalid={!!fieldState.error}>
            <FieldLabel htmlFor={fieldState.error && "email-invalid-input"}>
              Email
            </FieldLabel>
            <FieldContent>
              <Input
                id={fieldState.error && "email-invalid-input"}
                placeholder="Enter your email address"
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
        name="phoneNumber"
        render={({ field, fieldState }) => (
          <Field data-invalid={!!fieldState.error}>
            <FieldLabel
              htmlFor={fieldState.error && "phone-number-invalid-input"}
            >
              Phone Number
            </FieldLabel>
            <FieldContent>
              <Input
                id={fieldState.error && "phone-number-invalid-input"}
                placeholder="Enter your phone number"
                aria-invalid={!!fieldState.error}
                {...field}
              />
            </FieldContent>
            <FieldDescription>Use the format: 1111111111</FieldDescription>
            {fieldState.error && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <Controller
        control={form.control}
        name="ageGroup"
        render={({ field: { value, onChange, ...props }, fieldState }) => (
          <Field data-invalid={!!fieldState.error}>
            <FieldLabel htmlFor={fieldState.error && "age-group-invalid-input"}>
              Age Group
            </FieldLabel>
            <FieldContent>
              <Select value={value} onValueChange={onChange} {...props}>
                <SelectTrigger
                  id={fieldState.error && "age-group-invalid-input"}
                  aria-invalid={!!fieldState.error}
                  className="w-full"
                >
                  <SelectValue placeholder="Select an age group">
                    <span>{formatAgeGroup(value)}</span>
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {ageGroups.map((ageGroup) => (
                    <SelectItem key={ageGroup} value={ageGroup}>
                      {formatAgeGroup(ageGroup)}
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
        name="sport"
        render={({ field: { value, onChange, ...props }, fieldState }) => (
          <Field data-invalid={!!fieldState.error}>
            <FieldLabel htmlFor={fieldState.error && "sport-invalid-input"}>
              Sport
            </FieldLabel>
            <FieldContent>
              <Select value={value} onValueChange={onChange} {...props}>
                <SelectTrigger
                  id={fieldState.error && "sport-invalid-input"}
                  aria-invalid={!!fieldState.error}
                  className="w-full"
                >
                  <SelectValue placeholder="Select a sport">
                    <span>{formatSport(value)}</span>
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {sports.map((sport) => (
                    <SelectItem key={sport} value={sport}>
                      {formatSport(sport)}
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
        name="workOnOption"
        render={({ field: { value, onChange, ...props }, fieldState }) => (
          <Field data-invalid={!!fieldState.error}>
            <FieldLabel
              htmlFor={fieldState.error && "work-on-option-invalid-input"}
            >
              What do you want to work on?
            </FieldLabel>
            <FieldContent>
              <Select value={value} onValueChange={onChange} {...props}>
                <SelectTrigger
                  id={fieldState.error && "work-on-option-invalid-input"}
                  aria-invalid={!!fieldState.error}
                  className="w-full"
                >
                  <SelectValue placeholder="Select an option">
                    <span>{formatWorkOnOption(value)}</span>
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {workOnOptions.map((workOnOption) => (
                    <SelectItem key={workOnOption} value={workOnOption}>
                      {formatWorkOnOption(workOnOption)}
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
        name="availability"
        render={({ field, fieldState }) => (
          <Field data-invalid={!!fieldState.error}>
            <FieldLabel
              htmlFor={fieldState.error && "availability-invalid-input"}
            >
              Availability
            </FieldLabel>
            <FieldContent>
              <Textarea
                id={fieldState.error && "availability-invalid-input"}
                placeholder="Please describe your availability and try be as specific as possible"
                aria-invalid={!!fieldState.error}
                className="max-h-32"
                {...field}
              />
            </FieldContent>
            {fieldState.error && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <Controller
        control={form.control}
        name="location"
        render={({ field, fieldState }) => (
          <Field data-invalid={!!fieldState.error}>
            <FieldLabel htmlFor={fieldState.error && "location-invalid-input"}>
              Where do you want to play?
            </FieldLabel>
            <FieldContent>
              <Textarea
                id={fieldState.error && "location-invalid-input"}
                placeholder="Enter the location where you would like to have the session. Please be as specific as possible."
                aria-invalid={!!fieldState.error}
                className="max-h-32"
                {...field}
              />
            </FieldContent>
            {fieldState.error && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <Controller
        control={form.control}
        name="additionalNotes"
        render={({ field: { value, ...props }, fieldState }) => (
          <Field data-invalid={!!fieldState.error}>
            <FieldLabel
              htmlFor={fieldState.error && "additional-notes-invalid-input"}
            >
              Anything else we should know?
            </FieldLabel>
            <FieldContent>
              <Textarea
                id={fieldState.error && "additional-notes-invalid-input"}
                placeholder="Enter any additional details here"
                aria-invalid={!!fieldState.error}
                className="max-h-32"
                value={value ?? ""}
                {...props}
              />
            </FieldContent>
          </Field>
        )}
      />
      {hasSubmitted && (
        <Alert>
          <CheckCircle2Icon className="text-emerald-500! size-10" />
          <AlertTitle className="text-xl! font-medium">
            Submission successful!
          </AlertTitle>
          <AlertDescription className="text-lg!">
            The session was submitted successfully! Our team will get back to
            you soon with the details. In the meantime, we have sent you a email
            to confirm the details of the session.
          </AlertDescription>
        </Alert>
      )}
      <Button
        disabled={form.formState.isSubmitting}
        type="submit"
        className="h-12 text-xl"
      >
        <LoadingSwap isLoading={form.formState.isSubmitting}>
          Submit
        </LoadingSwap>
      </Button>
    </form>
  );
};
