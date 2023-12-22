import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { SupabaseAdapter } from "@auth/supabase-adapter";
import prisma from "@/db/prisma";
import bcrypt from "bcrypt";
import CustomError from "@/lib/custom-error";

interface Credentials {
  email: string;
  password: string;
}

export const options: NextAuthOptions = {
  adapter: SupabaseAdapter({
    url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    secret: process.env.SUPABASE_SERVICE_ROLE_KEY!,
  }),
  callbacks: {
    // async signIn({ user, account, profile, email, credentials }) {
    //   return true;
    // },
    async redirect({ url, baseUrl }) {
      return url.startsWith(baseUrl)
        ? Promise.resolve(url)
        : Promise.resolve(baseUrl);
    },
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials) {
        try {
          const { email, password } = credentials as Credentials;

          if (!email || !password)
            throw new CustomError("Email and password required", 401);

          const user = await prisma.users.findUnique({
            where: {
              email: credentials?.email,
            },
          });

          if (!user) throw new CustomError("Email does not exist", 401);

          const passwordMatch = await bcrypt.compare(
            password,
            user.hashedPassword as string
          );

          console.log(passwordMatch);

          if (!passwordMatch) throw new CustomError("Incorrect password", 401);

          return user;
        } catch (err) {
          if (err instanceof CustomError) throw new Error(err.message);
          console.error(err);
          throw new Error(
            JSON.stringify({
              error: err,
              status: false,
            })
          );
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  pages: {
    signIn: "/auth/login",
    // verifyRequest: "/auth/verify-request", // (used for check email message)
  },
  // Other configuration options
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
};
