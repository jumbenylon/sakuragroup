import prisma from "@/lib/prisma";
import { ShieldAlert, UserCheck, Settings } from "lucide-react";
import { approveUser } from "./actions";

export default async function AdminDashboard() {
  const pendingUsers = await prisma.user.findMany({
    where: { status: "PENDING" },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="min-h-screen bg-[#050505] p-8 text-white">
      <div className="max-w-6xl mx-auto space-y-12">
        
        <header className="flex justify-between items-end border-b border-white/10 pb-8">
          <div>
            <h1 className="text-3xl font-black uppercase tracking-tighter">Master Control</h1>
            <p className="text-slate-500 font-mono text-xs">Sakura Group Gateway Admin</p>
          </div>
          <div className="flex gap-4">
             <div className="px-4 py-2 bg-pink-500/10 border border-pink-500/20 text-pink-500 text-[10px] font-bold rounded-sm uppercase tracking-widest flex items-center gap-2">
               <ShieldAlert size={14} /> System Secure
             </div>
          </div>
        </header>

        <section>
          <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">Pending Approvals ({pendingUsers.length})</h2>
          
          <div className="grid gap-4">
            {pendingUsers.length === 0 ? (
              <div className="p-12 text-center border border-dashed border-white/10 text-slate-600 rounded-sm italic">
                No users awaiting approval.
              </div>
            ) : (
              pendingUsers.map((user) => (
                <div key={user.id} className="p-6 bg-[#0a0a0a] border border-white/10 rounded-sm flex justify-between items-center group hover:border-white/20 transition-all">
                  <div>
                    <p className="text-lg font-bold font-mono">{user.email}</p>
                    <p className="text-[10px] text-slate-500 uppercase tracking-widest">Joined: {user.createdAt.toLocaleDateString()}</p>
                  </div>
                  
                  <div className="flex items-center gap-6">
                    {/* Simplified Form for logic demo */}
                    <div className="flex flex-col items-end gap-2">
                       <span className="text-[9px] text-slate-500 font-bold uppercase">Default Rate: 25 TZS</span>
                       <form action={async () => {
                         "use server";
                         await approveUser(user.id, 25, 0);
                       }}>
                         <button className="px-6 py-3 bg-white text-black text-[10px] font-black uppercase tracking-widest hover:bg-pink-500 hover:text-white transition-all rounded-sm flex items-center gap-2">
                           <UserCheck size={14} /> Approve & Activate
                         </button>
                       </form>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
