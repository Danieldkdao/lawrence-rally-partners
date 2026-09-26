import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import z from "zod";
import { GENERAL_ERROR_MESSAGE } from "./constants";
import { OptionalZodObject } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isValidIds = (id: string | string[]) => {
  const idSchema = z.uuid();

  if (Array.isArray(id)) return id.every((i) => idSchema.safeParse(i).success);
  return idSchema.safeParse(id).success;
};

export const isValidDate = (date: unknown): date is Date => {
  return date instanceof Date && !isNaN(date.getTime());
};

export const optionalifyZodSchema = <T extends z.ZodObject>(
  schema: T,
): OptionalZodObject<T> => {
  const entries = Object.entries(schema.shape).map(([key, value]) => [
    key,
    value.optional(),
  ]);

  return z.object(Object.fromEntries(entries)) as OptionalZodObject<T>;
};

export const getErrorMessage = (error: unknown) =>
  Error.isError(error) ? error.message : GENERAL_ERROR_MESSAGE;

export const createPaginationCursorSchema = <T extends z.ZodObject>(
  schema: T,
) => {
  return z.base64url().transform((val, ctx) => {
    try {
      const decodedString = Buffer.from(val, "base64url").toString("utf-8");

      const parsedJson = JSON.parse(decodedString);

      return schema.parse(parsedJson);
    } catch (error) {
      console.error(error);
      ctx.addIssue({
        code: "custom",
        message: "Invalid cursor.",
      });
      return z.NEVER;
    }
  });
};

export const writeCursor = (data: unknown) => {
  const jsonData = JSON.stringify(data);
  return Buffer.from(jsonData).toString("base64url");
};
