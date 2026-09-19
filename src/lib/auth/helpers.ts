import { headers } from "next/headers";
import { auth } from "./auth";

export const getCurrentUser = async (outsideHeaders?: Headers) => {
  const h = outsideHeaders ?? (await headers());
  const session = await auth.api.getSession({
    headers: h,
  });

  return {
    userId: session?.user.id ?? null,
    user: session?.user ?? null,
    session: session?.session ?? null,
  };
};
