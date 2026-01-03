import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { getPrisma } from "@/lib/prisma"; 
import { verify } from "@node-rs/argon2";

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  pages: { signIn: "/axis/login" },
  
  // 1. TOP-LEVEL SECURITY CONFIG (Corrected Placement)
  secret: process.env.NEXTAUTH_SECRET,
  useSecureCookies: process.env.NODE_ENV === "production",

  trustHost: true,
  
  cookies: {
    sessionToken: {
      name: process.env.NODE_ENV === "production" 
        ? `__Secure-next-auth.session-token` 
        : `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === "production",
        domain: '.sakuragroup.co.tz' 
      },
    },
  },

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
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

        // Debug Logs for Cloud Run
        console.log(`[AUTH] Attempt: ${credentials.email} - User Found: ${!!user}`);

        if (!user || !user.password) return null;

        // Verify Argon2 Hash
        const isValid = await verify(user.password, credentials.password);
        console.log(`[AUTH] Password Valid: ${isValid}`);
        
        if (!isValid) return null;

        if (user.status !== "ACTIVE") {
          console.log(`[AUTH] Blocked: Status is ${user.status}`);
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
        token.status = user.status;
        token.balance = user.balance;
        token.smsRate = user.smsRate;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id;
        (session.user as any).role = token.role;
        (session.user as any).status = token.status;
        (session.user as any).balance = token.balance;
        (session.user as any).smsRate = token.smsRate;
      }
      return session;
    }
  }
};
