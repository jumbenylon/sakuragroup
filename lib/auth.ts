import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getPrisma } from "@/lib/prisma";
import { verify } from "@node-rs/argon2";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(getPrisma()),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/axis/login",
    error: "/axis/login", // Redirect back to login on error
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const prisma = getPrisma();
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        // Check if user exists and has a password (some Google users might not)
        if (!user || !user.password) {
          return null;
        }

        try {
          // Verify password using the same Argon2 algo used in Signup
          const isValid = await verify(user.password, credentials.password);

          if (!isValid) {
            return null;
          }

          return {
            id: user.id,
            email: user.email,
            name: user.name,
          };
        } catch (e) {
          console.error("Auth Error", e);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (session.user && token.sub) {
        // We attach the user ID to the session for easy access
        // Note: You might see a TS error here without a types file, 
        // but it works at runtime.
        (session.user as any).id = token.sub;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
      }
      return token;
    },
  },
  // Ensure we trust the host in production (Cloud Run)
  secret: process.env.NEXTAUTH_SECRET, 
};
