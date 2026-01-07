import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { getPrisma } from "@/lib/prisma"; 
import { verify } from "@node-rs/argon2";

export const authOptions: NextAuthOptions = {
  // 1. Cloud Run & Security Settings
  debug: process.env.NODE_ENV === "development", // Enable debug logs in dev
  session: { strategy: "jwt" },
  pages: { signIn: "/axis/login" }, // This directs unauthenticated users to your login page
  secret: process.env.NEXTAUTH_SECRET,
  
  // 🟢 CRITICAL FOR CLOUD RUN
  // This tells NextAuth to trust the HTTPS proxy provided by Cloud Run/Vercel
  trustHost: true,

  // -----------------------------------------------------------------
  // 🟢 CRITICAL FOR SUBDOMAINS (axis.sakuragroup.co.tz + pay...)
  // We explicitly set the domain to '.sakuragroup.co.tz' so the
  // cookie is shared across all subdomains.
  // -----------------------------------------------------------------
  cookies: {
    sessionToken: {
      name: `__Secure-next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: true, // Always true for HTTPS
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
    CredentialsProvider({
      name: "Sakura Axis",
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

        // Verify Password using Argon2
        try {
           const isValid = await verify(user.password, credentials.password);
           if (!isValid) return null;
        } catch (e) {
           console.error("Argon2 Verification Failed:", e);
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
      // Initial sign in
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.status = user.status;
        token.balance = user.balance;
      }
      return token;
    },
    async session({ session, token }) {
      // Pass token data to the client session
      if (session.user) {
        (session.user as any).id = token.id;
        (session.user as any).role = token.role;
        (session.user as any).status = token.status;
        (session.user as any).balance = token.balance;
      }
      return session;
    }
  }
};
