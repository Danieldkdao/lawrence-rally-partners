"use server";

import { db } from "@/db/db";
import { SessionTable } from "@/db/schema";
import { sendSessionConfirmationEmail } from "@/services/mailjet/emails/send-session-confirmation-email";
import { sessionSchema, SessionSchemaType } from "./schemas";

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

    await Promise.all([
      sendSessionConfirmationEmail("customer", data),
      sendSessionConfirmationEmail("internal", data),
    ]);

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
