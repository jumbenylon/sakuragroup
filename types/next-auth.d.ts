import NextAuth, { DefaultSession } from "next-auth";
import { Role, AccountStatus } from "@prisma/client";

declare module "next-auth" {
  interface User {
    id: string;
    role: Role;
    status: AccountStatus;
    balance: number;
    smsRate: number;
  }

  interface Session {
    user: {
      id: string;
      role: Role;
      status: AccountStatus;
      balance: number;
      smsRate: number;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: Role;
    status: AccountStatus;
    balance: number;
    smsRate: number;
  }
}
