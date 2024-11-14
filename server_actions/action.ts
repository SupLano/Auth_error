"use server"

import { signIn } from "next-auth/react";

export async function OneTapSignIn(credential?: string) {
    "use server"
    signIn("google-one-tap", { credential });
  }
