import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { getPrisma } from "@/lib/prisma";
import { verify } from "@node-rs/argon2";

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  pages: { signIn: "/login", error: "/login" },
  secret: process.env.NEXTAUTH_SECRET,
  trustHost: true, // Vital for Codespaces
  
  // 🟢 1. COOKIES (Keeps you logged in everywhere)
  cookies: {
    sessionToken: {
      name: `__Secure-next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: true, // Always true for HTTPS/Codespaces
        domain: process.env.NODE_ENV === "production" ? '.sakuragroup.co.tz' : undefined
      }
    }
  },

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      allowDangerousEmailAccountLinking: true,
    }),
    
    // 🟢 2. PASSWORD LOGIN (Restored)
    CredentialsProvider({
      name: "Sakura Identity",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const prisma = getPrisma();
        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        });

        if (!user || !user.password) return null;

        // Verify Password
        try {
           const isValid = await verify(user.password, credentials.password);
           if (!isValid) return null;
        } catch (e) {
           return null;
        }

        if (user.status !== "ACTIVE") {
          throw new Error("ACCOUNT_PENDING_APPROVAL");
        }

        return user;
      }
    })
  ],
  
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.org = user.organization;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id;
        (session.user as any).role = token.role;
        (session.user as any).organization = token.org;
      }
      return session;
    }
  }
};
