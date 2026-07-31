import { SessionsList } from "@/features/sessions/components/sessions-list";

const SessionsPage = () => {
  return (
    <section className="flex flex-col items-center w-full gap-16 max-w-400 mt-52 mx-auto">
      <div className="flex flex-col gap-4 items-center w-full">
        <h2 className="text-3xl md:text-5xl font-semibold text-center">
          All sessions
        </h2>
        <p className="text-2xl text-muted-foreground max-w-250 text-center">
          A list of all booked sessions so far. Note that this is for demo
          purposes and will be moved to a private admin-only dashboard in the
          future when this becomes real.
        </p>
      </div>

      <SessionsList />
    </section>
  );
};

export default SessionsPage;
