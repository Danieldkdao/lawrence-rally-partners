import { Card, CardContent } from "@/components/ui/card";
import { SessionForm } from "@/features/sessions/components/session-form";

export default function Home() {
  return (
    <Card>
      <CardContent>
        <SessionForm />
      </CardContent>
    </Card>
  );
}
