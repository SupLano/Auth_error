import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"

 
export const { handlers, signIn, signOut, auth  } = 
NextAuth({
  // trustHost: true,
  secret: process.env.AUTH_SECRET ?? "",
  session: {
    strategy: "jwt",    
  },
  providers: [   
    Credentials({
      name: "google-one-tap",
      id: "google-one-tap",
      credentials: {
        credential: { type : "text" },
      },
      async authorize(credentials) {
        // "use server" // even tried this in the authorize function
        const session = await auth()
        if (session) {
          console.log('session already active', session)
          throw new Error("Session already exists")
        }
        const { credential } = credentials ?? {}
        if (credentials === null) return null;  
        //example of what the verification looks like      
        const response = await fetch("https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=" + credential)
        const data = await response.json()
        console.log('data', data)

        if (data.email_verified) {
          return {
            id: data.sub,
            email: data.email,
            name: data.name,
            image: data.picture
          }
        }
        //ERROR OCCURS HERE
        //Error: Cookies can only be modified in a Server Action or Route Handler. Read more: https://nextjs.org/docs/app/api-reference/functions/cookies#cookiessetname-value-options at Proxy.callable (file:///Users/XXX/XXX/XXX/XXX.org/node_modules/next/dist/compiled/next-server/dist/src/server/web/spec-extension/adapters/request-cookies.ts:22:10) at signIn (turbopack://[project]/node_modules/next-auth/lib/actions.js:47:18) 45 | const cookieJar = await cookies(); 46 | for (const c of res?.cookies ?? [])
        return null
      }
    })
  ],
  
})