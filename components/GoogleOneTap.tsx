"use client"

import React, { useEffect } from 'react'
import googleOneTap from "google-one-tap";
import { signIn } from 'next-auth/react';
import { OneTapSignIn } from '@/server_actions/action';

type Props = {}

const options = {
	client_id: 'GOOGLE ID HERE', // REQUIRED
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

//This file does'nt belong here, it belongs in the server_actions/ folder, where server actions are stored - "use server"
//it was placed here in the error build for viewing simplicity, it's been moved back to its original location

// export async function OneTapSignIn(credential?: string) {
//     "use server"
//     signIn("google-one-tap", { credential });
//   }
