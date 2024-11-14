"use server"

import { signIn } from "@/auth";

export async function OneTapSignIn(credential?: string) {
    signIn("google-one-tap", { credential });
  }
