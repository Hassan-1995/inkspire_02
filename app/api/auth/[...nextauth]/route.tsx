// // // app/api/auth/[...nextauth]/route.ts
// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import GoogleProvider from "next-auth/providers/google";
// import { AuthOptions } from "next-auth";
// import axios from "axios";
// import { DefaultUser } from "next-auth";
// import type { JWT } from "next-auth/jwt";
// import type { Account } from "next-auth";

// interface UserWithToken extends DefaultUser {
//   accessToken?: string;
//   id: string;
//   image?: string | null;
// }

// export const authOptions: AuthOptions = {
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID!,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//     }),
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: {},
//         password: {},
//       },
//       async authorize(credentials) {
//         const response = await axios.post(
//           `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/login`,
//           {
//             email: credentials?.email,
//             password: credentials?.password,
//           }
//         );

//         const data = response.data;
//         if (response.status === 200 && data?.token && data?.userInfo) {
//           return {
//             id: data.userInfo.id,
//             name: data.userInfo.name,
//             email: data.userInfo.email,
//             image: data.userInfo.image,
//             accessToken: data.token,
//           };
//         }

//         return null;
//       },
//     }),
//   ],

//   callbacks: {
//     async signIn({
//       user,
//       account,
//     }: {
//       user: UserWithToken;
//       account?: Account | null;
//     }) {
//       if (account?.provider === "google") {
//         try {
//           const response = await axios.post(
//             `http://localhost:5000/auth/google-login`,
//             {
//               email: user.email,
//               name: user.name,
//             }
//           );

//           user.accessToken = response.data.accessToken;
//           user.id = response.data.id;
//           user.image = response.data.image || null;
//         } catch (error) {
//           console.error("Error syncing Google user:", error);
//           return false;
//         }
//       }
//       return true;
//     },

//     jwt({ user, token }: { user?: UserWithToken; token: JWT }) {
//       if (user) {
//         return {
//           ...token,
//           id: user.id,
//           accessToken: user.accessToken,
//         };
//       }
//       return token;
//     },

//     session({ session, token }) {
//       return {
//         ...session,
//         user: {
//           ...session.user,
//           id: token.id,
//           accessToken: token.accessToken,
//         },
//       };
//     },
//   },
//   session: {
//     strategy: "jwt",
//   },

//   secret: process.env.NEXTAUTH_SECRET,
// };

// // ✅ Export route handlers
// const handler = NextAuth(authOptions);

// export { handler as GET, handler as POST };

import NextAuth from "next-auth";
import { authOptions } from "@/lib/authOptions"; // or relative path

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
