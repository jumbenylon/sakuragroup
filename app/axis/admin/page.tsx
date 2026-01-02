import prisma from "@/lib/prisma";
import { UserCheck, Wallet, ShieldAlert, TrendingUp } from "lucide-react";
import { activateUser } from "./_actions/approve";
import { addCredits } from "./_actions/wallet";

export default async function AdminConsole() {
  // Fetch all users to give you the "Master View"
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="min-h-screen bg-[#050505] text-white p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* HEADER SECTION */}
        <header className="flex justify-between items-center border-b border-white/10 pb-10">
          <div>
            <h1 className="text-4xl font-black tracking-tighter uppercase italic">Control Panel</h1>
            <p className="text-slate-500 text-xs font-mono mt-2 tracking-[0.3em]">SAKURA GROUP • ADMIN ENGINE</p>
          </div>
          <div className="flex gap-4">
            <div className="h-12 w-12 rounded-full border border-white/10 flex items-center justify-center bg-green-500/10 text-green-500 shadow-[0_0_15px_rgba(34,197,94,0.2)]">
              <ShieldAlert size={20} />
            </div>
          </div>
        </header>

        {/* USER MANAGEMENT TABLE */}
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
                  <td className="p-4">
                    <div className="font-bold text-sm">{user.email}</div>
                    <div className="text-[10px] text-slate-500 font-mono">Rate: {user.smsRate} TZS/SMS</div>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 text-[9px] font-bold rounded-sm uppercase tracking-tighter ${
                      user.status === 'ACTIVE' ? 'bg-green-500/20 text-green-400' : 'bg-pink-500/20 text-pink-400 animate-pulse'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="p-4 font-mono text-sm">
                    {user.balance.toLocaleString()} <span className="text-[10px] text-slate-500">TZS</span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-2">
                      {user.status === "PENDING" && (
                        <form action={async () => {
                          "use server";
                          await activateUser(user.id, 25);
                        }}>
                          <button className="flex items-center gap-2 px-3 py-2 bg-white text-black text-[10px] font-black uppercase hover:bg-pink-500 hover:text-white transition-all">
                            <UserCheck size={14} /> Activate
                          </button>
                        </form>
                      )}
                      <form action={async () => {
                        "use server";
                        await addCredits(user.id, 50000);
                      }}>
                        <button className="flex items-center gap-2 px-3 py-2 border border-white/10 hover:border-white/30 text-white text-[10px] font-black uppercase transition-all">
                          <Wallet size={14} /> +50k Credits
                        </button>
                      </form>
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
