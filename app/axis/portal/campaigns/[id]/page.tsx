export const dynamic = "force-dynamic";

import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Filter, ChevronLeft, Download, AlertCircle, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default async function CampaignReport({ params, searchParams }: any) {
  const { id } = params;
  const statusFilter = searchParams.status || undefined;

  const session = cookies().get("axis_session")?.value;
  const sessionUser = await prisma.session.findUnique({
    where: { token: session ?? "" },
    include: { user: true }
  });

  if (!sessionUser) redirect("/axis/login");

  // Fetch campaign with security check and message pagination
  const campaign = await prisma.campaign.findFirst({
    where: { id, userId: sessionUser.user.id },
    include: {
      messages: {
        where: { status: statusFilter },
        orderBy: { recipient: "asc" },
        take: 500 // Prevents DOM overflow
      }
    }
  });

  if (!campaign) {
    return (
      <div className="min-h-screen bg-[#020202] text-white flex flex-col items-center justify-center font-mono">
        <AlertCircle className="text-pink-600 mb-4" size={48} />
        <h2 className="text-sm uppercase tracking-[0.3em]">Campaign Not Found or Access Denied</h2>
        <Link href="/axis/portal" className="mt-6 text-[10px] border border-white/10 px-4 py-2 hover:bg-white hover:text-black transition-all uppercase">Back to Portal</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020202] text-white p-6 md:p-12 font-sans selection:bg-pink-600/30">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* BREADCRUMB & ACTIONS */}
        <div className="flex justify-between items-center">
          <Link href="/axis/portal" className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors text-[10px] uppercase font-black tracking-widest">
            <ChevronLeft size={14} /> Back to Dashboard
          </Link>
          <button className="bg-white/5 border border-white/10 px-4 py-2 text-[9px] font-black uppercase flex items-center gap-2 hover:bg-white hover:text-black transition-all">
            <Download size={12} /> Export CSV
          </button>
        </div>

        {/* HEADER STATS */}
        <header className="grid grid-cols-1 md:grid-cols-3 gap-6 border-b border-white/5 pb-10">
          <div className="space-y-1">
            <h1 className="text-3xl font-black italic uppercase tracking-tighter">Campaign Audit</h1>
            <p className="text-slate-600 font-mono text-[10px] uppercase">ID: {campaign.id}</p>
          </div>
          <div className="bg-white/[0.02] border border-white/5 p-4 rounded-sm">
             <p className="text-[9px] text-slate-500 uppercase font-black tracking-widest mb-1">Total Recipients</p>
             <p className="text-2xl font-black italic">{campaign.totalRecipients.toLocaleString()}</p>
          </div>
          <div className="bg-white/[0.02] border border-white/5 p-4 rounded-sm">
             <p className="text-[9px] text-slate-500 uppercase font-black tracking-widest mb-1">Commitment</p>
             <p className="text-2xl font-black italic text-pink-600">{(campaign.totalCost / 100).toLocaleString()} TZS</p>
          </div>
        </header>

        {/* FILTERS */}
        <div className="flex gap-2">
            <FilterLink label="All Logs" active={!statusFilter} href={`/axis/portal/campaigns/${id}`} />
            <FilterLink label="Sent" active={statusFilter === "SENT"} href={`?status=SENT`} />
            <FilterLink label="Failed" active={statusFilter === "FAILED"} href={`?status=FAILED`} />
        </div>

        {/* LOG TABLE */}
        <div className="bg-[#050505] border border-white/10 rounded-sm overflow-hidden">
          <table className="w-full text-left font-mono text-[11px]">
            <thead>
              <tr className="border-b border-white/10 bg-white/5 text-slate-500 uppercase tracking-widest">
                <th className="p-4">Recipient</th>
                <th className="p-4">Status</th>
                <th className="p-4">Timestamp</th>
                <th className="p-4 text-right">Reference</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {campaign.messages.map((msg) => (
                <tr key={msg.id} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="p-4 font-bold tracking-widest">{msg.recipient}</td>
                  <td className="p-4">
                    <span className={`flex items-center gap-2 ${msg.status === 'SENT' ? 'text-green-500' : 'text-rose-600'}`}>
                      {msg.status === 'SENT' ? <CheckCircle2 size={12}/> : <AlertCircle size={12}/>}
                      {msg.status}
                    </span>
                  </td>
                  <td className="p-4 text-slate-500 italic">
                    {msg.sentAt ? new Date(msg.sentAt).toLocaleString() : 'PENDING'}
                  </td>
                  <td className="p-4 text-right text-slate-600 group-hover:text-slate-400 transition-colors">
                    {msg.providerMessageId || 'N/A'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {campaign.totalRecipients > 500 && (
            <div className="p-4 bg-white/5 text-center text-[9px] text-slate-500 uppercase tracking-[0.2em]">
              Showing first 500 records. Use export for full data.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function FilterLink({ label, active, href }: { label: string, active: boolean, href: string }) {
    return (
        <Link 
            href={href} 
            className={`px-4 py-2 text-[9px] font-black uppercase border transition-all ${
                active ? 'bg-white text-black border-white' : 'border-white/10 text-slate-500 hover:border-white/30'
            }`}
        >
            {label}
        </Link>
    );
}
