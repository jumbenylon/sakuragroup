import { getPrisma } from "@/lib/prisma";
import { 
  Users, 
  MessageSquare, 
  Activity, 
  ShieldAlert, 
  DollarSign,
  TrendingUp,
  Trash2,
  CheckCircle,
  XCircle
} from "lucide-react";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";

export default async function AdminMasterDashboard() {
  const prisma = getPrisma();

  // 🟢 1. FETCH REAL INFRASTRUCTURE DATA
  const [
    userCount,
    smsCount,
    revenue,
    pendingSenderIds,
    pendingOffloads
  ] = await Promise.all([
    prisma.user.count(),
    prisma.messageLog.count(),
    prisma.messageLog.aggregate({ _sum: { costToTenant: true } }),
    prisma.senderId.count({ where: { status: "PENDING" } }),
    prisma.user.findMany({ 
      where: { status: "DELETION_PENDING" }, // This status marks users who requested offload
      select: { id: true, name: true, organization: true, email: true }
    })
  ]);

  const totalRevenue = revenue._sum.costToTenant || 0;

  // 🟢 2. SERVER ACTIONS (The "Real Stuff")
  async function approveOffload(userId: string) {
    "use server";
    const p = getPrisma();
    // Senior Logic: Cascading deletion or deactivation
    await p.user.delete({ where: { id: userId } });
    revalidatePath("/axis/admin");
  }

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex justify-between items-end pb-4 border-b border-slate-200">
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase italic">Master Control</h1>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mt-2 flex items-center gap-2">
              Sakura Group <span className="w-1 h-1 bg-slate-300 rounded-full"></span> Axis Gateway Infrastructure
            </p>
          </div>
          <div className="flex items-center gap-3 px-4 py-2 bg-white border border-slate-200 rounded-full shadow-sm">
            <span className="h-2 w-2 bg-emerald-500 rounded-full animate-pulse"></span>
            <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Gateway Nominal</span>
          </div>
        </div>

        {/* KPI Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <KpiCard label="Nodes Active" value={userCount.toString()} icon={Users} color="text-blue-600" />
          <KpiCard label="Traffic Vol" value={smsCount.toLocaleString()} icon={MessageSquare} color="text-purple-600" />
          <KpiCard label="Gross Revenue" value={`${totalRevenue.toLocaleString()} TZS`} icon={DollarSign} color="text-emerald-600" />
          <KpiCard 
            label="Security Alerts" 
            value={pendingOffloads.length.toString()} 
            icon={ShieldAlert} 
            color={pendingOffloads.length > 0 ? "text-red-600 animate-bounce" : "text-slate-400"} 
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* 🟢 3. OFFLOAD APPROVAL QUEUE (Real Interaction) */}
          <div className="md:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
            <div className="p-6 border-b border-slate-50 flex justify-between items-center">
               <h3 className="text-[11px] font-black text-slate-900 uppercase tracking-[0.2em] flex items-center gap-2">
                  <Trash2 size={14} className="text-red-600" /> Infrastructure Offload Queue
               </h3>
               <span className="text-[10px] font-bold px-2 py-1 bg-red-50 text-red-600 rounded uppercase tracking-tighter">Requires Action</span>
            </div>
            
            <div className="flex-1">
              {pendingOffloads.length === 0 ? (
                <div className="h-64 flex flex-col items-center justify-center text-slate-300 gap-3 italic">
                  <div className="p-4 bg-slate-50 rounded-full"><CheckCircle size={32} /></div>
                  <p className="text-[10px] font-bold uppercase tracking-widest">No pending removal requests.</p>
                </div>
              ) : (
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-100">
                      <th className="px-6 py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest">Identity</th>
                      <th className="px-6 py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest">Organization</th>
                      <th className="px-6 py-4 text-[9px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pendingOffloads.map((node) => (
                      <tr key={node.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors group">
                        <td className="px-6 py-4">
                          <div className="text-xs font-bold text-slate-900">{node.name}</div>
                          <div className="text-[10px] text-slate-400 font-mono">{node.email}</div>
                        </td>
                        <td className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-tighter">
                          {node.organization}
                        </td>
                        <td className="px-6 py-4 text-right">
                           <div className="flex justify-end gap-2">
                             <form action={async () => { "use server"; await approveOffload(node.id); }}>
                               <button className="p-2 hover:bg-red-50 text-red-400 hover:text-red-600 rounded-lg transition-all" title="Approve Deletion">
                                 <XCircle size={18} />
                               </button>
                             </form>
                           </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>

          {/* System Performance Status */}
          <div className="space-y-4">
             <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="text-[11px] font-black text-slate-900 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                   <TrendingUp size={14} className="text-blue-600" /> Gateway Status
                </h3>
                <PerformanceBar label="Engine Load" value={14} color="bg-blue-500" />
                <PerformanceBar label="Database" value={38} color="bg-emerald-500" />
                <PerformanceBar label="API Latency" value={92} color="bg-pink-500" />
             </div>
             
             <div className="bg-slate-900 p-6 rounded-2xl text-white shadow-xl shadow-slate-200">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Infrastructure Secret</p>
                <div className="flex justify-between items-center">
                  <code className="text-xs font-mono text-pink-400">AXIS-PROD-0922</code>
                  <Activity size={14} className="text-emerald-400" />
                </div>
             </div>
          </div>
        </div>

      </div>
    </div>
  );
}

function KpiCard({ label, value, icon: Icon, color }: any) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">{label}</p>
          <h2 className="text-3xl font-black text-slate-900 tracking-tighter">{value}</h2>
        </div>
        <div className={`p-4 rounded-xl bg-slate-50 ${color}`}>
          <Icon size={24} />
        </div>
      </div>
    </div>
  );
}

function PerformanceBar({ label, value, color }: { label: string, value: number, color: string }) {
  return (
    <div className="space-y-2 mb-4">
      <div className="flex justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest">
        <span>{label}</span>
        <span className="text-slate-900 font-mono">{value}%</span>
      </div>
      <div className="w-full bg-slate-50 h-1.5 rounded-full overflow-hidden">
        <div className={`${color} h-full transition-all duration-1000`} style={{ width: `${value}%` }}></div>
      </div>
    </div>
  );
}
