"use client";

export function GlobalFooter() {
  return (
    <footer className="py-12 text-center border-t border-white/10 bg-neutral-950 text-white">
      <div className="flex flex-col items-center gap-6">
        <div className="flex gap-8 text-xs font-mono uppercase tracking-widest text-neutral-500">
           <a href="https://instagram.com/sakuragroup.tz" target="_blank" className="hover:text-white transition-colors">
             @sakuragroup.tz
           </a>
           <span className="hover:text-white transition-colors cursor-pointer">LinkedIn</span>
           <span className="hover:text-white transition-colors cursor-pointer">Legal</span>
        </div>
        <p className="text-neutral-600 text-xs">
          &copy; {new Date().getFullYear()} Sakura Group. All Systems Nominal.
        </p>
      </div>
    </footer>
  );
}
