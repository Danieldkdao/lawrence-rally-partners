import { ageGroups, sports, workOnOptions } from "@/db/schema";
import z from "zod";

export const sessionSchema = z.object({
  name: z.string().trim().min(1, { error: "Please enter your full name." }),
  email: z.email({ error: "Please enter a valid email address." }),
  phoneNumber: z.string().regex(/^\d{10}$/, {
    error: "Please enter a valid phone number 10 digits.",
  }),
  ageGroup: z.enum(ageGroups),
  sport: z.enum(sports),
  workOnOption: z.enum(workOnOptions),
  availability: z
    .string()
    .trim()
    .min(10, { error: "Please enter at least 10 characters." }),
  location: z
    .string()
    .trim()
    .min(10, { error: "Please enter at least 10 characters." }),
  additionalNotes: z.string().nullish(),
});
export type SessionSchemaType = z.infer<typeof sessionSchema>;
