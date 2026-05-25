import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const SuccessPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { orderItems, orderTotal, address, orderId: passedOrderId } = location.state || {};
  const [orderId] = useState(() => passedOrderId || `ORD-${Math.floor(100000 + Math.random() * 900000)}`);

  // Force dark background on body only for this page
  useEffect(() => {
    const originalBodyBg = document.body.style.background;
    const originalHtmlBg = document.documentElement.style.background;
    
    document.body.style.background = "#09090b";
    document.documentElement.style.background = "#09090b";
    
    return () => {
      document.body.style.background = originalBodyBg;
      document.documentElement.style.background = originalHtmlBg;
    };
  }, []);

  // Redirect if no order data is present (e.g. direct access)
  useEffect(() => {
    if (!orderItems) {
      const timer = setTimeout(() => navigate("/"), 5000);
      return () => clearTimeout(timer);
    }
  }, [orderItems, navigate]);

  if (!orderItems) {
    return (
      <main className="min-h-screen bg-[#09090b] flex flex-col items-center justify-center p-6 text-center text-white">
        <h1 className="text-2xl font-bold mb-4">No order found</h1>
        <p className="text-zinc-400 mb-8">Redirecting you to the home page...</p>
        <Link to="/" className="text-primary hover:underline font-bold">Return Home Now</Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#09090b] pt-16 pb-12 px-6 overflow-x-hidden relative flex items-center justify-center font-inter">
      {/* Dynamic Green Touches (Glowing Orbs) */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-emerald-600/10 rounded-full blur-[120px] -mr-48 -mt-48 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px] -ml-48 -mb-48 pointer-events-none" />

      <div className="max-w-5xl w-full relative z-10">
        
        {/* Success Hero Section - Compact */}
        <div className="text-center mb-8 animate-in fade-in slide-in-from-top-6 duration-1000">
          <div className="relative inline-block mb-4">
            <div className="absolute inset-0 bg-emerald-400/20 rounded-full blur-2xl animate-pulse" />
            <div className="relative w-20 h-20 rounded-full bg-gradient-to-tr from-emerald-600 to-emerald-400 flex items-center justify-center shadow-[0_0_40px_rgba(16,185,129,0.3)]">
               <span className="material-symbols-outlined text-white text-4xl filled animate-in zoom-in-50 duration-700 delay-300">check_circle</span>
            </div>
          </div>

          <h1 className="font-headline text-4xl md:text-5xl font-black text-black mb-1 tracking-tighter leading-none">
            ORDER <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-primary">SUCCESSFUL</span>
          </h1>
         
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch max-w-4xl mx-auto">
          
          {/* Order Details Card - Obsidian Dark */}
          <div className="bg-zinc-900/60 backdrop-blur-3xl border border-white/5 rounded-[40px] p-8 shadow-2xl flex flex-col animate-in slide-in-from-left-6 duration-700 delay-300">
             <div className="flex justify-between items-start mb-6">
                <div>
                   <p className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-600 mb-1">Receipt ID</p>
                   <p className="text-zinc-200 font-mono text-xs font-bold tracking-wider">{orderId}</p>
                </div>
                <div className="text-right text-emerald-400/80 flex items-center gap-2">
                   <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                   <span className="text-[9px] font-black uppercase tracking-widest">Confirmed</span>
                </div>
             </div>

             <div className="space-y-4 mb-6 overflow-y-auto max-h-[160px] pr-2 scrollbar-hide flex-1">
                {orderItems.map((item) => (
                  <div key={item.title} className="flex justify-between items-center group">
                    <div className="flex items-center gap-4">
                       <img src={item.img} alt={item.title} className="w-10 h-10 rounded-xl object-cover ring-1 ring-white/5 group-hover:scale-110 transition-all duration-300" />
                       <div>
                          <h4 className="text-zinc-100 font-bold text-xs">{item.title}</h4>
                          <p className="text-zinc-500 text-[10px] font-bold">{item.quantity} × {item.price}</p>
                       </div>
                    </div>
                    <span className="text-zinc-200 font-black text-xs">₹{(parseFloat(item.price.replace(/[^\d.-]/g, "")) * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
             </div>

             <div className="h-px bg-white/5 mb-6" />

             <div className="flex justify-between items-center">
                <span className="text-zinc-500 font-bold text-[10px] uppercase tracking-widest">Total Paid</span>
                <span className="text-white text-3xl font-black tracking-tighter">₹{orderTotal.toLocaleString()}</span>
             </div>
             
             {address && (
               <div className="bg-zinc-800/40 rounded-2xl p-4 mt-6 flex gap-3 items-start border border-white/5">
                  <span className="material-symbols-outlined text-primary text-lg">location_on</span>
                  <div>
                    <p className="text-zinc-300 text-[10px] font-bold mb-0.5">Delivering to {address.label}</p>
                    <p className="text-zinc-500 text-[10px] leading-relaxed line-clamp-1">{address.address}</p>
                  </div>
               </div>
             )}
          </div>

          {/* Contact & Support Section - Obsidian Dark */}
          <div className="flex flex-col gap-6 animate-in slide-in-from-right-6 duration-700 delay-500">
             <div className="flex-1 bg-zinc-900/60 backdrop-blur-3xl border border-white/5 rounded-[40px] p-8 shadow-2xl flex flex-col justify-center">
                <h3 className="text-white font-headline text-lg font-black mb-2">Need Help?</h3>
                <p className="text-zinc-500 text-[11px] mb-6 font-medium leading-relaxed">Our support team is available 24/7 to assist with your journey.</p>
                
                <div className="space-y-4">
                   <a href="mailto:support@culinarycurator.com" className="flex items-center gap-4 group">
                      <div className="w-10 h-10 rounded-xl bg-zinc-800/50 border border-white/5 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all duration-500">
                        <span className="material-symbols-outlined text-white text-lg">mail</span>
                      </div>
                      <div>
                        <p className="text-[9px] font-black uppercase tracking-[0.15em] text-zinc-600 mb-0.5">Email Address</p>
                        <p className="text-zinc-200 text-[11px] font-bold group-hover:text-primary transition-colors">support@culinarycurator.com</p>
                      </div>
                   </a>

                   <a href="tel:+911800FOODIE" className="flex items-center gap-4 group">
                      <div className="w-10 h-10 rounded-xl bg-zinc-800/50 border border-white/5 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all duration-500">
                        <span className="material-symbols-outlined text-white text-lg">call</span>
                      </div>
                      <div>
                        <p className="text-[9px] font-black uppercase tracking-[0.15em] text-zinc-600 mb-0.5">Contact Number</p>
                        <p className="text-zinc-200 text-[11px] font-bold group-hover:text-primary transition-colors">+91 1800-FOOD-CURATOR</p>
                      </div>
                   </a>
                </div>
             </div>

            
          </div>

        </div>

        {/* Compact Brand Footer */}
       

      </div>
    </main>
  );
};

export default SuccessPage;
