"use client"

import React, { useEffect } from 'react'
import googleOneTap from "google-one-tap";
import { signIn } from 'next-auth/react';

type Props = {}

const options = {
	client_id: 'USE GOOGLE CLIENT ID', // REQUIRED
	auto_select: true, // optional
	cancel_on_tap_outside: true, // optional
	context: 'signin', // optional
};

export default function GoogleOneTap({}: Props) {
    
    useEffect(() => {
        //@ts-ignore
            googleOneTap(options, (response : any) => {           
                if (response.credential) {
                    const token = response.credential;
                    console.log(token);
                    OneTapSignIn(token)
                }
            });
      }, []);

  return (
    null
  )
  
}


export async function OneTapSignIn(credential?: string) {
    "use server"
    signIn("google-one-tap", { credential });
  }
