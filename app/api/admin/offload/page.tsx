// src/app/axis/admin/offload/page.tsx
import OffloadQueue from "@/components/admin/OffloadQueue";

export default function AdminOffloadingPage() {
  return (
    <div className="p-8">
      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-black">Infrastructure Oversight</h1>
        <p className="text-gray-500">Manage node deactivations and data offloading requests.</p>
      </header>
      
      <OffloadQueue />
    </div>
  );
}
