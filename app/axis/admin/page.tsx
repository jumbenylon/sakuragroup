// This is the "Skip the test" instruction for the build crew
export const dynamic = "force-dynamic";

import prisma from "@/lib/prisma";
import { UserCheck, Wallet, ShieldAlert } from "lucide-react";
import { activateUser } from "./_actions/approve";
import { addCredits } from "./_actions/wallet";

export default async function AdminConsole() {
  // This code will now ONLY run when you actually open the website,
  // not while it is being built.
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="min-h-screen bg-[#050505] text-white p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-10">
        <header className="flex justify-between items-center border-b border-white/10 pb-10">
          <div>
            <h1 className="text-4xl font-black tracking-tighter uppercase italic">Control Panel</h1>
            <p className="text-slate-500 text-xs font-mono mt-2 tracking-[0.3em]">SAKURA GROUP • ADMIN ENGINE</p>
          </div>
          <div className="h-12 w-12 rounded-full border border-white/10 flex items-center justify-center bg-green-500/10 text-green-500">
            <ShieldAlert size={20} />
          </div>
        </header>

        <div className="overflow-hidden border border-white/10 rounded-sm bg-[#0a0a0a]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-white/5">
                <th className="p-4 text-[10px] uppercase tracking-widest text-slate-500">Reseller Identity</th>
                <th className="p-4 text-[10px] uppercase tracking-widest text-slate-500">Status</th>
                <th className="p-4 text-[10px] uppercase tracking-widest text-slate-500">Wallet Balance</th>
                <th className="p-4 text-[10px] uppercase tracking-widest text-slate-500 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                  <td className="p-4 font-bold text-sm">{user.email}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 text-[9px] font-bold rounded-sm uppercase ${
                      user.status === 'ACTIVE' ? 'bg-green-500/20 text-green-400' : 'bg-pink-500/20 text-pink-400 animate-pulse'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="p-4 font-mono text-sm">{user.balance.toLocaleString()} TZS</td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-2 text-[10px] font-black uppercase">
                       {/* Actions go here */}
                       Manage
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
