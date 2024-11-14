"use server"

import { signIn } from "@/auth";

export async function OneTapSignIn(credential?: string) {
    "use server"
    signIn("google-one-tap", { credential });
  }
