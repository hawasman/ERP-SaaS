"use server";
import { headers } from "next/headers";
import { redirect, RedirectType } from "next/navigation";
import { z } from "zod";
import { auth } from "~/server/auth";
import { validatedAction } from "~/utils/validation-herlpers";
import { user } from "../db/schema/auth-schema";

export const getUser = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return session?.user;
};

type ReturnType = { user: typeof user | null; error: string | null };
export const signInEmail = async (
  email: string,
  password: string,
): Promise<ReturnType> => {
  try {
    const { user } = await auth.api.signInEmail({
      body: {
        email: email,
        password: password,
      },
    });
  } catch (error: any) {
    console.log(error);
    return {
      user: null,
      error: error.body.message,
    };
  }
  return { user, error: null };
};

export const redirectIfAuthenticated = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (session) {
    redirect("/dashboard", RedirectType.push);
  }
};

const signInSchema = z.object({
  email: z.string().email().min(3).max(255),
  password: z.string().min(8).max(100),
  social: z
    .enum([
      "github",
      "apple",
      "discord",
      "facebook",
      "microsoft",
      "google",
      "spotify",
      "twitch",
      "twitter",
      "dropbox",
      "linkedin",
      "gitlab",
      "reddit",
    ])
    .optional(),
});

export const signInAction = validatedAction(signInSchema, async (data) => {
  const { email, password, social } = data;

  if (!social) {
    const { error } = await signInEmail(email, password);

    if (error) return { error };

    redirect("/dashboard");
  } else {
    await auth.api.signInSocial({
      body: {
        provider: social,
        callbackURL: "/dashboard",
      },
    });
  }
});

export const signOut = async () => {
  await auth.api.signOut({
    headers: await headers(),
  });
  redirect("/sign-in");
};
