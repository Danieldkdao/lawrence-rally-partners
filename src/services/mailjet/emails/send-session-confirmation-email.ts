import { envServer } from "@/data/env/server";
import { SessionSchemaType } from "@/features/sessions/actions/schemas";
import { sendEmail } from "..";
import {
  formatAgeGroup,
  formatSport,
  formatWorkOnOption,
} from "@/features/sessions/lib/formatters";
import { AgeGroup, Sport, WorkOnOption } from "@/db/schema";

type EmailRecipient = "internal" | "customer";
type EmailType = "html" | "text";

const INTERNAL_DETAILS_URL = envServer.APP_URL;

function escapeHtml(value: unknown): string {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function formatPhoneNumber(phoneNumber: string): string {
  return phoneNumber.replace(/^(\d{3})(\d{3})(\d{4})$/, "($1) $2-$3");
}

export function createSessionEmail(
  recipient: EmailRecipient,
  type: EmailType,
  data: SessionSchemaType,
): string {
  const {
    name,
    email,
    phoneNumber,
    ageGroup,
    sport,
    workOnOption,
    availability,
    location,
    additionalNotes,
  } = data;

  const formattedPhoneNumber = formatPhoneNumber(phoneNumber);

  if (recipient === "customer" && type === "text") {
    return [
      `Thank you, ${name}!`,
      "",
      "Lawrence Tennis Partners",
      "",
      "We received your session request and will contact you soon to confirm the details.",
      "",
      `Sport: ${formatSport(sport)}`,
      `Age group: ${formatAgeGroup(ageGroup)}`,
      `What you want to work on: ${formatWorkOnOption(workOnOption)}`,
      `Availability: ${availability}`,
      `Location: ${location}`,
      "",
      "We look forward to working with you!",
      "",
      "Lawrence Tennis Partners",
    ].join("\n");
  }

  if (recipient === "internal" && type === "text") {
    return [
      "",
      "Lawrence Tennis Partners",
      "",
      "A new session request has been submitted.",
      "",
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${formattedPhoneNumber}`,
      `Sport: ${formatSport(sport)}`,
      `Age group: ${formatAgeGroup(ageGroup)}`,
      `What they want to work on: ${formatWorkOnOption(workOnOption)}`,
      `Availability: ${availability}`,
      `Location: ${location}`,
      ...(additionalNotes?.trim()
        ? [`Additional notes: ${additionalNotes.trim()}`]
        : []),
      "",
      `View details: ${INTERNAL_DETAILS_URL}`,
    ].join("\n");
  }

  const safe = {
    name: escapeHtml(name),
    email: escapeHtml(email),
    phoneNumber: escapeHtml(formattedPhoneNumber),
    phoneHref: escapeHtml(phoneNumber),
    ageGroup: escapeHtml(ageGroup),
    sport: escapeHtml(sport),
    workOnOption: escapeHtml(workOnOption),
    availability: escapeHtml(availability),
    location: escapeHtml(location),
    additionalNotes: escapeHtml(additionalNotes?.trim()),
    detailsUrl: escapeHtml(INTERNAL_DETAILS_URL),
  };

  if (recipient === "customer" && type === "html") {
    return `<!doctype html>
<html lang="en">
  <body style="margin: 0; padding: 24px; font-family: Arial, sans-serif; color: #111; line-height: 1.5;">
    <p><strong>Thank you, ${safe.name}!</strong></p>
    <p><strong>Lawrence Tennis Partners</strong></p>

    <p>
      We received your session request and will contact you soon to
      confirm the details.
    </p>

    <p><strong>Sport:</strong> ${formatSport(safe.sport as Sport)}</p>
    <p><strong>Age group:</strong> ${formatAgeGroup(safe.ageGroup as AgeGroup)}</p>
    <p><strong>What you want to work on:</strong> ${formatWorkOnOption(safe.workOnOption as WorkOnOption)}</p>
    <p><strong>Availability:</strong> ${safe.availability}</p>
    <p><strong>Location:</strong> ${safe.location}</p>

    <p>We look forward to working with you!</p>
    <p>Lawrence Tennis Partners</p>
  </body>
</html>`;
  }

  const additionalNotesHtml = safe.additionalNotes
    ? `\n    <p><strong>Additional notes:</strong> ${safe.additionalNotes}</p>`
    : "";

  return `<!doctype html>
<html lang="en">
  <body style="margin: 0; padding: 24px; font-family: Arial, sans-serif; color: #111; line-height: 1.5;">
    <p><strong>Lawrence Tennis Partners</strong></p>

    <p>A new session request has been submitted.</p>

    <p><strong>Name:</strong> ${safe.name}</p>
    <p>
      <strong>Email:</strong>
      <a href="mailto:${safe.email}">${safe.email}</a>
    </p>
    <p>
      <strong>Phone:</strong>
      <a href="tel:${safe.phoneHref}">${safe.phoneNumber}</a>
    </p>
    <p><strong>Sport:</strong> ${formatSport(safe.sport as Sport)}</p>
    <p><strong>Age group:</strong> ${formatAgeGroup(safe.ageGroup as AgeGroup)}</p>
    <p><strong>What they want to work on:</strong> ${formatWorkOnOption(safe.workOnOption as WorkOnOption)}</p>
    <p><strong>Availability:</strong> ${safe.availability}</p>
    <p><strong>Location:</strong> ${safe.location}</p>${additionalNotesHtml}

    <p>
      <a
        href="${safe.detailsUrl}"
        style="display: inline-block; padding: 10px 16px; background: #111; color: #fff; text-decoration: none; font-weight: bold;"
      >
        View Details
      </a>
    </p>
  </body>
</html>`;
}

export const sendSessionConfirmationEmail = async (
  recipient: EmailRecipient,
  data: SessionSchemaType,
) => {
  await sendEmail({
    to: data.email,
    subject:
      recipient === "customer" ? "Session confirmation" : "New session booking",
    html: createSessionEmail(recipient, "html", data),
    text: createSessionEmail(recipient, "text", data),
  });
};
