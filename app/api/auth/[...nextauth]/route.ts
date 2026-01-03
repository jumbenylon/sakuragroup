import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import { verify } from "@node-rs/argon2";

const handler = NextAuth({
  session: { strategy: "jwt" },
  pages: { signIn: "/axis/login" },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      allowDangerousEmailAccountLinking: true,
      // All Google signups are PENDING by default via Prisma's @default(PENDING)
    }),
    CredentialsProvider({
      name: "Sakura Axis",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        });

        if (!user || !user.password) return null;

        const isValid = await verify(user.password, credentials.password);
        if (!isValid) return null;

        // BLOCK PENDING USERS: Admins bypass, users must be ACTIVE
        if (user.role !== "ADMIN" && user.status !== "ACTIVE") {
          throw new Error("ACCOUNT_PENDING_APPROVAL");
        }

        return user; // TypeScript now understands this contains role, status, etc.
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
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.status = token.status;
        session.user.balance = token.balance;
        session.user.smsRate = token.smsRate;
      }
      return session;
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
