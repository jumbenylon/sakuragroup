import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { getPrisma } from "@/lib/prisma"; 

export const authOptions: NextAuthOptions = {
  // 1. Production Strategy
  session: { strategy: "jwt" },
  pages: { 
    signIn: "/login", // We direct them to the subdomain login, not the main site
    error: "/login" 
  }, 
  secret: process.env.NEXTAUTH_SECRET,
  trustHost: true, // Critical for Cloud Run / Vercel proxies

  // 🟢 2. UNIVERSAL COOKIE (The Magic)
  // This allows the login to persist across axis., pay., and root.
  cookies: {
    sessionToken: {
      name: `__Secure-next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: true,
        domain: process.env.NODE_ENV === "production" ? '.sakuragroup.co.tz' : undefined
      }
    }
  },

  // 3. Providers (The Keys)
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      allowDangerousEmailAccountLinking: true,
    }),
    CredentialsProvider({
      name: "Sakura OTP",
      credentials: {
        email: { label: "Email", type: "text" },
        otp: { label: "Code", type: "text" } // 🟢 Changed from 'password' to 'otp'
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.otp) return null;

        const prisma = getPrisma();
        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        });

        // 🟢 OTP LOGIC STARTS HERE
        if (!user || !user.otp || !user.otpExpires) {
            // No user, or no code was ever requested
            return null;
        }

        // 1. Check if OTP matches
        if (user.otp !== credentials.otp) {
            throw new Error("INVALID_CODE");
        }

        // 2. Check if expired (Current time > Expiration time)
        if (new Date() > user.otpExpires) {
            throw new Error("CODE_EXPIRED");
        }

        // 3. Success! Clear the OTP so it can't be reused.
        await prisma.user.update({
            where: { id: user.id },
            data: { otp: null, otpExpires: null }
        });

        if (user.status !== "ACTIVE") {
          throw new Error("ACCOUNT_PENDING_APPROVAL");
        }

        return user;
      }
    })
  ],
  
  // 4. Callbacks (Attaching the Rank)
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
