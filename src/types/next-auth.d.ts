// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from "next-auth"

declare module "next-auth" {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        user: {
            role: string,
            email: string,
            name: string,
            picture: string,
            googleId: string,
        },
        accessToken: string,
    }
    /**
     * The shape of the user object returned in the OAuth providers' `profile` callback,
     * or the second parameter of the `session` callback, when using a database.
     */
    interface User {
        user: {
            role: string,
            email: string,
            name: string,
            picture: string,
            googleId: string,
        },
        accessToken: string,
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        user: {
            role: string,
            email: string,
            name: string,
            picture: string,
            googleId: string,
        },
        accessToken: string,
    }
}