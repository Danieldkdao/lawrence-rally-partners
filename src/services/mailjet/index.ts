import { envServer } from "@/data/env/server";
import { getErrorMessage } from "@/lib/utils";
import Mailjet from "node-mailjet";

const DEFAULT_FROM_NAME = "Lawrence Rally Partners";

const mailjet = Mailjet.apiConnect(
  envServer.MAILJET_API_KEY,
  envServer.MAILJET_API_SECRET,
  { options: { timeout: 10_000 } },
);

type SendEmailOptions = {
  from?: string;
  fromName?: string;
  to: string | string[];
  subject: string;
  html: string;
  text: string;
};

export const sendEmail = async ({
  from = envServer.SENDER_EMAIL,
  fromName = DEFAULT_FROM_NAME,
  to,
  subject,
  html,
  text,
}: SendEmailOptions) => {
  const recipients = Array.isArray(to) ? to : [to];

  try {
    const response = await mailjet.post("send", { version: "v3.1" }).request({
      Messages: [
        {
          From: {
            Email: from,
            Name: fromName,
          },
          To: recipients.map((email) => ({
            Email: email,
          })),
          Subject: subject,
          TextPart: text,
          HTMLPart: html,
        },
      ],
    });

    return response.body;
  } catch (error) {
    const fullErrorMessage = `Mailjet send failed: ${getErrorMessage(error)}`;
    console.error(fullErrorMessage);
    throw new Error(fullErrorMessage);
  }
};
