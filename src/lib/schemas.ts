import { parseISO } from "date-fns";
import z from "zod";
import { isValidDate } from "./utils";

export const isoTimestampSchema = z.iso.datetime().transform((val, ctx) => {
  const parsedDate = parseISO(val);

  if (isValidDate(parsedDate)) return parsedDate;

  ctx.addIssue({
    code: "custom",
    message: "Invalid timestamp.",
  });
  return z.NEVER;
});
