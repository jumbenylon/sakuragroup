export const dynamic = "force-dynamic";

import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { TrendingUp, Users, MessageSquare, Landmark } from "lucide-react";

export default async function AdminMasterDashboard() {
  const sessionToken = cookies().get("axis_session")?.value;
  const session = await prisma.session.findUnique({
    where: { token: sessionToken ?? "" },
    include: { user: true }
  });

  if (!session || session.user.role !== "ADMIN") redirect("/login");

  // Aggregate System-Wide Intelligence
  const stats = await prisma.$transaction([
    prisma.user.count({ where: { role: "USER" } }),
    prisma.messageLog.aggregate({
      _sum: { costToTenant: true, costToAdmin: true },
      where: { status: "SENT" }
    }),
    prisma.senderId.count({ where: { status: "PENDING" } })
  ]);

  const [resellerCount, financials, pendingSenders] = stats;
  const totalRevenue = financials._sum.costToTenant || 0;
  const totalCost = financials._sum.costToAdmin || 0;
  const netProfit = totalRevenue - totalCost;

  return (
    <div className="min-h-screen bg-[#020202] text-white p-10 font-sans selection:bg-pink-500/30">
      <div className="max-w-7xl mx-auto space-y-12">
        
        <header className="flex justify-between items-end border-b border-white/5 pb-8">
          <div>
            <h1 className="text-4xl font-black tracking-tighter uppercase italic">Master Console</h1>
            <p className="text-slate-500 text-[10px] font-mono tracking-[0.4em] mt-2">SAKURA GROUP • SYSTEM AUTHORITY</p>
          </div>
          <div className="text-right">
             <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest">Global Margin</p>
             <p className="text-2xl font-black text-green-500 italic">+{(netProfit / 100).toLocaleString()} TZS</p>
          </div>
        </header>

        {/* METRIC GRID */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <MetricCard title="Active Resellers" value={resellerCount} icon={<Users size={20}/>} color="text-blue-500" />
          <MetricCard title="Pending Brands" value={pendingSenders} icon={<Clock size={20}/>} color="text-orange-500" pulse={pendingSenders > 0} />
          <MetricCard title="System Revenue" value={`${(totalRevenue / 100).toLocaleString()}`} icon={<Landmark size={20}/>} color="text-white" />
          <MetricCard title="Net Profit (Minor)" value={netProfit.toLocaleString()} icon={<TrendingUp size={20}/>} color="text-green-400" />
        </div>

        {/* RECENT ACTIVITY / QUICK ACTIONS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <section className="space-y-6">
                <h3 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400">System Controls</h3>
                <div className="grid grid-cols-2 gap-4">
                    <ActionButton label="Approve Senders" href="/axis/admin/sender-ids" count={pendingSenders} />
                    <ActionButton label="Manage Resellers" href="/axis/admin/users" />
                    <ActionButton label="System Logs" href="/axis/admin/logs" />
                    <ActionButton label="Rate Config" href="/axis/admin/rates" />
                </div>
            </section>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ title, value, icon, color, pulse }: any) {
    return (
        <div className="bg-[#050505] border border-white/10 p-6 rounded-sm relative overflow-hidden group">
            <div className={`absolute top-0 right-0 p-4 opacity-10 ${color}`}>
                {icon}
            </div>
            <p className="text-slate-500 text-[9px] font-black uppercase tracking-widest mb-2">{title}</p>
            <h2 className={`text-3xl font-black italic tracking-tight ${color} ${pulse ? 'animate-pulse' : ''}`}>
                {value}
            </h2>
        </div>
    );
}

function ActionButton({ label, href, count }: any) {
    return (
        <a href={href} className="flex items-center justify-between bg-white/[0.03] border border-white/5 p-4 hover:border-pink-600/50 hover:bg-white/5 transition-all group">
            <span className="text-[10px] font-bold uppercase tracking-widest group-hover:text-pink-500">{label}</span>
            {count > 0 && <span className="bg-pink-600 text-[9px] px-2 py-0.5 font-black">{count}</span>}
        </a>
    );
}
