import { getPrisma } from "@/lib/prisma";
import { 
  Users, 
  MessageSquare, 
  Activity, 
  ShieldAlert, 
  DollarSign,
  TrendingUp 
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminMasterDashboard() {
  // 🟢 UNLOCKED: We removed the Session/Redirect check.
  // We assume you are the Admin for now.
  
  const prisma = getPrisma();

  // Fetch real data from your DB
  const [
    userCount,
    smsCount,
    revenue,
    pendingSenderIds
  ] = await Promise.all([
    prisma.user.count(),
    prisma.messageLog.count(),
    prisma.messageLog.aggregate({ _sum: { costToTenant: true } }),
    prisma.senderId.count({ where: { status: "PENDING" } })
  ]);

  const totalRevenue = revenue._sum.costToTenant || 0;

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tighter uppercase">Master Control</h1>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-1">
              Sakura Group • Axis Gateway Node
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 bg-emerald-500 rounded-full animate-pulse"></span>
            <span className="text-xs font-bold text-emerald-700 uppercase">System Nominal</span>
          </div>
        </div>

        {/* KPI Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <KpiCard 
            label="Total Users" 
            value={userCount.toString()} 
            icon={Users} 
            color="text-blue-600" 
          />
          <KpiCard 
            label="Traffic Volume" 
            value={smsCount.toLocaleString()} 
            icon={MessageSquare} 
            color="text-purple-600" 
          />
          <KpiCard 
            label="Gross Revenue" 
            value={`${totalRevenue.toLocaleString()} TZS`} 
            icon={DollarSign} 
            color="text-emerald-600" 
          />
          <KpiCard 
            label="Pending IDs" 
            value={pendingSenderIds.toString()} 
            icon={ShieldAlert} 
            color={pendingSenderIds > 0 ? "text-amber-600 animate-pulse" : "text-slate-400"} 
          />
        </div>

        {/* Quick Actions / Logs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-4 flex items-center gap-2">
                 <Activity size={16} /> Recent System Logs
              </h3>
              <div className="h-48 flex items-center justify-center text-slate-400 text-xs italic bg-slate-50 rounded border border-dashed border-slate-200">
                 System logs visualization loading...
              </div>
           </div>
           
           <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-4 flex items-center gap-2">
                 <TrendingUp size={16} /> Node Performance
              </h3>
              <div className="space-y-4">
                 <div className="flex justify-between text-xs font-bold text-slate-500 uppercase">
                    <span>CPU Load</span>
                    <span>12%</span>
                 </div>
                 <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-blue-500 h-full w-[12%]"></div>
                 </div>

                 <div className="flex justify-between text-xs font-bold text-slate-500 uppercase">
                    <span>Database Connections</span>
                    <span>45/100</span>
                 </div>
                 <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full w-[45%]"></div>
                 </div>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
}

// Internal Component
function KpiCard({ label, value, icon: Icon, color }: any) {
  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{label}</p>
          <h2 className="text-2xl font-bold text-slate-900">{value}</h2>
        </div>
        <div className={`p-3 rounded-lg bg-slate-50 ${color}`}>
          <Icon size={20} />
        </div>
      </div>
    </div>
  );
}
