"use server";
import { z } from "zod";
import { auth } from "~/server/auth";

const signInShema = z.object({
  email: z.string().email(),
  password: z.string(),
});
type signInType = z.infer<typeof signInShema>;

const signIn = async ({ email, password }: signInType) => {
  await auth.api.signInEmail({
    body: {
      email: email,
      password: password,
    },
  });
};
