import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getPrisma } from "@/lib/prisma";

// This helper secures your API routes
export async function getAuthSession() {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.email) {
    return null;
  }

  // Optional: Fetch fresh user data from DB if needed
  const prisma = getPrisma();
  const user = await prisma.user.findUnique({
     where: { email: session.user.email }
  });

  return user;
}
