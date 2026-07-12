import { SessionTable } from "@/db/schema";
import {
  CalendarDaysIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  TargetIcon,
  TrophyIcon,
} from "lucide-react";
import { Suspense } from "react";
import { getSessions } from "../actions/actions";
import {
  formatAgeGroup,
  formatSport,
  formatWorkOnOption,
} from "../lib/formatters";

export const SessionsList = () => {
  return (
    <Suspense fallback={<SessionsListLoading />}>
      <SessionsListSuspense />
    </Suspense>
  );
};

const SessionsListLoading = () => {
  return (
    <div className="space-y-4">
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index} className="h-32 animate-pulse rounded-md bg-muted" />
      ))}
    </div>
  );
};

const SessionsListSuspense = async () => {
  const sessions = await getSessions();

  return sessions.length ? (
    <div className="grid grid-cols-1 w-full gap-8">
      {sessions.map((session) => (
        <SessionListItem key={session.id} session={session} />
      ))}
    </div>
  ) : (
    <div className="w-full flex items-center gap-2">
      <h3 className="text-2xl font-semibold text-center">No sessions yet</h3>
      <p className="text-xl text-center text-muted-foreground">
        Be the first to book a session by filling out the form above.
      </p>
    </div>
  );
};

export function SessionListItem({
  session,
}: {
  session: typeof SessionTable.$inferSelect;
}) {
  const formattedPhone = session.phoneNumber.replace(
    /^(\d{3})(\d{3})(\d{4})$/,
    "($1) $2-$3",
  );

  return (
    <article className="border-b py-5">
      <div className="flex items-start justify-between gap-6">
        <div className="min-w-0 flex-1">
          <header className="mb-4 flex flex-wrap items-center gap-4">
            <h2 className="text-2xl font-semibold">{session.name}</h2>

            <span className="text-lg text-muted-foreground">
              {formatAgeGroup(session.ageGroup)}
            </span>
          </header>

          <dl className="grid gap-4 text-sm sm:grid-cols-2 lg:grid-cols-3">
            <div className="flex min-w-0 items-start gap-2">
              <TrophyIcon className="mt-0.5 size-6 shrink-0 text-muted-foreground" />
              <div>
                <dt className="font-medium text-lg">Sport</dt>
                <dd className="text-muted-foreground text-lg">
                  {formatSport(session.sport)}
                </dd>
              </div>
            </div>

            <div className="flex min-w-0 items-start gap-2">
              <TargetIcon className="mt-0.5 size-6 shrink-0 text-muted-foreground" />
              <div>
                <dt className="font-medium text-lg">Focus</dt>
                <dd className="text-muted-foreground text-lg">
                  {formatWorkOnOption(session.workOnOption)}
                </dd>
              </div>
            </div>

            <div className="flex min-w-0 items-start gap-2">
              <CalendarDaysIcon className="mt-0.5 size-6 shrink-0 text-muted-foreground" />
              <div>
                <dt className="font-medium text-lg">Availability</dt>
                <dd className="wrap-break-word text-muted-foreground text-lg">
                  {session.availability}
                </dd>
              </div>
            </div>

            <div className="flex min-w-0 items-start gap-2">
              <MapPinIcon className="mt-0.5 size-6 shrink-0 text-muted-foreground" />
              <div>
                <dt className="font-medium text-lg">Location</dt>
                <dd className="wrap-break-word text-muted-foreground text-lg">
                  {session.location}
                </dd>
              </div>
            </div>

            <div className="flex min-w-0 items-start gap-2">
              <MailIcon className="mt-0.5 size-6 shrink-0 text-muted-foreground" />
              <div className="min-w-0">
                <dt className="font-medium text-lg">Email</dt>
                <dd className="break-all text-muted-foreground text-lg">
                  {session.email}
                </dd>
              </div>
            </div>

            <div className="flex min-w-0 items-start gap-2">
              <PhoneIcon className="mt-0.5 size-6 shrink-0 text-muted-foreground" />
              <div>
                <dt className="font-medium text-lg">Phone</dt>
                <dd className="text-muted-foreground text-lg">
                  {formattedPhone}
                </dd>
              </div>
            </div>
          </dl>
        </div>
      </div>
    </article>
  );
}
