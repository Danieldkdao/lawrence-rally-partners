"use server";

import { db } from "@/db/db";
import { sessionSchema, SessionSchemaType } from "./schemas";
import { SessionTable } from "@/db/schema";

export const createSessionAction = async (unsafeData: SessionSchemaType) => {
  const { data, success } = sessionSchema.safeParse(unsafeData);
  if (!success) {
    return {
      error: true,
      message: "Invalid data. Please try again.",
    };
  }

  try {
    const insertedSession = await db
      .insert(SessionTable)
      .values(data)
      .returning();
    if (!insertedSession) throw new Error("Failed to create session.");

    return {
      error: false,
      message: "Session created successfully!",
    };
  } catch (error) {
    console.error(error);
    return {
      error: true,
      message: "Failed to create session. Please try again.",
    };
  }
};
