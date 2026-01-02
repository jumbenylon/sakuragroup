export const dynamic = "force-dynamic";

import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function AdminConsole() {
  // ROLE-BASED GUARD
  const sessionToken = cookies().get("axis_session")?.value;
  const session = await prisma.session.findUnique({
    where: { token: sessionToken },
    include: { user: true }
  });

  if (!session || session.user.role !== "ADMIN") {
    redirect("/axis/login");
  }

  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="min-h-screen bg-[#050505] text-white p-8">
       {/* UI code as previously provided */}
       <h1 className="text-4xl font-black italic uppercase">Master Control</h1>
       {/* ... Render User Table ... */}
    </div>
  );
}
