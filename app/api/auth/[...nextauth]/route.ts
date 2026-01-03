import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth"; // <--- Now this works!

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
