// // app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { AuthOptions } from "next-auth";
import axios from "axios";

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        // const res = await fetch("http://localhost:5000/api/user/login", {
        //   method: "POST",
        //   headers: { "Content-Type": "application/json" },
        //   body: JSON.stringify({
        //     email: credentials?.email,
        //     password: credentials?.password,
        //   }),
        // });

        // const data = await res.json();

        // if (res.ok && data?.token && data?.userInfo) {

        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/login`,
          {
            email: credentials?.email,
            password: credentials?.password,
          }
        );

        const data = response.data;

        if (response.status === 200 && data?.token && data?.userInfo) {
          return {
            id: data.userInfo.id,
            name: data.userInfo.name,
            email: data.userInfo.email,
            image: data.userInfo.image,
            accessToken: data.token,
          };
        }

        return null;
      },
    }),
  ],

  callbacks: {
    // session: ({ session, token }) => {
    //   return {
    //     ...session,
    //     user: {
    //       ...session.user,
    //       id: token.id as string,
    //       accessToken: token.accessToken as string,
    //     },
    //   };
    // },
    // jwt: ({ user, token }) => {
    //   if (user) {
    //     return {
    //       ...token,
    //       id: user.id,
    //       accessToken: (user as any).accessToken,
    //     };
    //   }
    //   return token;
    // },

    async signIn({ user, account }) {
      if (account?.provider === "google") {
        try {
          // Call your backend to sync/create user & get JWT token
          const response = await axios.post(
            // `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/google-login`,
            `http://localhost:5000/auth/google-login`,
            {
              email: user.email,
              name: user.name,
            }
          );

          // Attach token and user info to the user object
          (user as any).accessToken = response.data.accessToken;
          user.id = response.data.id;
          user.image = response.data.image || null;
        } catch (error) {
          console.error("Error syncing Google user:", error);
          return false; // fail sign-in if backend sync/token fails
        }
      }
      return true;
    },

    // jwt and session callbacks as you already have
    jwt({ user, token }) {
      if (user) {
        return {
          ...token,
          id: user.id,
          accessToken: (user as any).accessToken,
        };
      }
      return token;
    },

    session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          accessToken: token.accessToken,
        },
      };
    },
  },
  session: {
    strategy: "jwt",
  },

  secret: process.env.NEXTAUTH_SECRET,
};

// ✅ Export route handlers
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
