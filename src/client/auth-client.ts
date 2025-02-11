import { createAuthClient } from "better-auth/react";
import { env } from "~/env";

console.log(env.NEXT_PUBLIC_BESE_URL);
export const authClient = createAuthClient({
  baseURL: env.NEXT_PUBLIC_BESE_URL,
});

export const { signIn, signOut, signUp, useSession } = authClient;
