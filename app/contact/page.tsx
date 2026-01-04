const ContactForm = () => {
  const searchParams = useSearchParams();
  const initialService = searchParams.get("service") || "general";
  
  const [activeTab, setActiveTab] = useState(initialService);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [txId, setTxId] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API Call
    setTimeout(() => {
      setTxId(`SAK-${Math.random().toString(36).toUpperCase().substring(2, 8)}`);
      setSubmitted(true);
      setIsSubmitting(false);
    }, 2000);
  };

  const services = [
    { id: "logistics", label: "Logistics", color: "bg-yellow-500" },
    { id: "agency", label: "Creative", color: "bg-orange-500" },
    { id: "roofcleaning", label: "Industrial", color: "bg-emerald-500" },
    { id: "general", label: "General", color: "bg-slate-400" }
  ];

  return (
    <div className="w-full max-w-2xl mx-auto lg:mx-0 relative">
      <AnimatePresence mode="wait">
        {!submitted ? (
          <motion.div key="form" exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }}>
            <div className="flex flex-wrap gap-3 mb-12">
              {services.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setActiveTab(s.id)}
                  className={`px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all border ${
                    activeTab === s.id ? `border-white/40 bg-white/5 text-white` : "border-white/5 text-slate-500 hover:border-white/20"
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <ContactSpotlight className="p-1"><input required type="text" placeholder="Full Name" className="w-full bg-transparent p-4 text-white outline-none text-sm" /></ContactSpotlight>
                <ContactSpotlight className="p-1"><input required type="email" placeholder="Email Address" className="w-full bg-transparent p-4 text-white outline-none text-sm" /></ContactSpotlight>
              </div>
              <ContactSpotlight className="p-1"><input type="text" placeholder="Company" className="w-full bg-transparent p-4 text-white outline-none text-sm" /></ContactSpotlight>
              <ContactSpotlight className="p-1"><textarea required rows={5} placeholder="Inquiry Details" className="w-full bg-transparent p-4 text-white outline-none text-sm resize-none" /></ContactSpotlight>

              <button 
                disabled={isSubmitting}
                className="w-full py-6 bg-white text-black font-black text-xs uppercase tracking-[0.4em] rounded-xl hover:bg-yellow-500 transition-all flex items-center justify-center gap-4 disabled:opacity-50"
              >
                {isSubmitting ? "Encrypting..." : "Secure Transmission"} 
                {!isSubmitting && <Send size={16} />}
              </button>
            </form>
          </motion.div>
        ) : (
          /* THE SUCCESS RECEIPT */
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="bg-white text-black p-10 rounded-sm shadow-2xl relative overflow-hidden"
          >
            {/* Aesthetic Perforated Edge */}
            <div className="absolute top-0 left-0 w-full h-2 bg-[radial-gradient(circle,_transparent_70%,_white_70%)] bg-[length:15px_15px] -translate-y-1" />
            
            <div className="flex justify-between items-start mb-12">
              <div>
                <h3 className="font-black text-2xl tracking-tighter">SAKURA GROUP.</h3>
                <p className="text-[10px] font-mono uppercase text-slate-500">Transmission Confirmed</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-mono text-slate-400">ID: {txId}</p>
                <p className="text-[10px] font-mono text-slate-400">{new Date().toLocaleDateString()}</p>
              </div>
            </div>

            <div className="space-y-6 mb-12 border-y border-slate-100 py-8">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-400 uppercase">Department</span>
                <span className="font-bold uppercase tracking-widest">{activeTab}</span>
              </div>
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-400 uppercase">Priority</span>
                <span className="font-bold uppercase tracking-widest">High-Speed</span>
              </div>
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-400 uppercase">Response Window</span>
                <span className="font-bold uppercase tracking-widest">&lt; 12 Hours</span>
              </div>
            </div>

            <div className="text-center">
              <p className="text-sm font-light leading-relaxed mb-8 italic">
                "Our engineers have received your transmission. The future of your project starts now."
              </p>
              <button 
                onClick={() => setSubmitted(false)}
                className="text-[10px] font-black uppercase tracking-[0.3em] border-b-2 border-black pb-1 hover:text-yellow-600 hover:border-yellow-600 transition-all"
              >
                New Transmission
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};