import { organizationClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import { env } from "~/env";

export const authClient = createAuthClient({
  baseURL: env.NEXT_PUBLIC_BESE_URL,
  plugins: [organizationClient()],
});

export const { signIn, signOut, signUp, useSession } = authClient;
