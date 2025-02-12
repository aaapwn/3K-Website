import { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import axios from "axios";

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({ account }) {

      try {
        console.log("before login");
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/google-login`, {
          token: account?.id_token,
        });
        console.log("after login");
        return true;
      } catch (error) {
        console.error("Login failed:", error);
        return false;
      }
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith(baseUrl)) {
        return url;
      }
      return baseUrl;
    },
    async jwt({ token, account }) {
      if (account) {
        try {
          const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/google-login`, {
            token: account?.id_token,
          });

          token.accessToken = res.data.accessToken;
          token.user = res.data.user;
        } catch (error) {
          console.error("JWT Fetch Error:", error);
        }
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.user = token.user;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
};