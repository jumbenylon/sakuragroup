import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getPrisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, CheckCircle, XCircle, FileText, User } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

interface PageProps {
  params: { id: string };
}

export default async function CampaignDetailsPage({ params }: PageProps) {
  // 1. Secure Authentication
  const session = await getServerSession(authOptions);
  
  if (!session || !session.user) {
    redirect("/axis/login");
  }

  const prisma = getPrisma();
  
  // 2. Fetch Campaign (Scoped to User)
  const campaign = await prisma.campaign.findUnique({
    where: { 
      id: params.id 
    },
    include: {
        user: {
            select: { name: true, email: true }
        }
    }
  });

  if (!campaign) {
    return notFound();
  }

  // 3. Security Guard: Ensure the user owns this campaign (unless Admin)
  // We cast to any because TS types for session might be basic
  const isOwner = campaign.userId === (session.user as any).id;
  const isAdmin = (session.user as any).role === "ADMIN";

  if (!isOwner && !isAdmin) {
    return notFound(); // Hide it completely from prying eyes
  }

  // 4. Determine Status Color
  const statusColors: any = {
    DRAFT: "bg-slate-100 text-slate-600",
    SCHEDULED: "bg-blue-100 text-blue-700",
    IN_PROGRESS: "bg-purple-100 text-purple-700",
    COMPLETED: "bg-emerald-100 text-emerald-700",
    FAILED: "bg-red-100 text-red-700",
    CANCELLED: "bg-slate-100 text-slate-400"
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="flex items-center gap-4 border-b border-slate-200 pb-6">
        <Link href="/axis/portal/campaigns" className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400 hover:text-slate-800">
            <ArrowLeft size={20} />
        </Link>
        <div>
            <h1 className="text-2xl font-bold text-slate-900">{campaign.name}</h1>
            <p className="text-xs font-mono text-slate-400 mt-1 uppercase tracking-widest">
                ID: {campaign.id}
            </p>
        </div>
        <div className={`ml-auto px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest ${statusColors[campaign.status] || "bg-slate-100"}`}>
            {campaign.status}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Main Content */}
          <div className="md:col-span-2 space-y-6">
              <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm">
                  <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                      <FileText size={14} /> Message Content
                  </h3>
                  <div className="p-4 bg-slate-50 rounded-lg text-slate-700 font-mono text-sm leading-relaxed whitespace-pre-wrap">
                      {campaign.message}
                  </div>
              </div>

              {/* Stats Grid (Placeholder for real logs) */}
              <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
                      <div>
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Dispatched</p>
                          <p className="text-xl font-bold text-slate-900 mt-1">
                             {/* Future: campaign.logs.count */}
                             --
                          </p>
                      </div>
                      <CheckCircle className="text-emerald-500 opacity-20" size={32} />
                  </div>
                  <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
                      <div>
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Failed</p>
                          <p className="text-xl font-bold text-slate-900 mt-1">--</p>
                      </div>
                      <XCircle className="text-red-500 opacity-20" size={32} />
                  </div>
              </div>
          </div>

          {/* Sidebar Info */}
          <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
                  <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Metadata</h3>
                  
                  <div className="flex items-center gap-3 text-sm text-slate-600">
                      <Clock size={16} className="text-slate-400" />
                      <div>
                          <p className="text-[10px] font-bold uppercase text-slate-400">Created At</p>
                          <p>{new Date(campaign.createdAt).toLocaleString()}</p>
                      </div>
                  </div>

                  <div className="flex items-center gap-3 text-sm text-slate-600 pt-4 border-t border-slate-100">
                      <User size={16} className="text-slate-400" />
                      <div>
                          <p className="text-[10px] font-bold uppercase text-slate-400">Created By</p>
                          <p>{campaign.user.email}</p>
                      </div>
                  </div>
              </div>
          </div>

      </div>
    </div>
  );
}
