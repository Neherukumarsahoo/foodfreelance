import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";

const ContactPage = () => {
  const [formState, setFormState] = useState("idle"); // idle, sending, success
  const formRef = useRef(null);
  const infoRef = useRef(null);

  useEffect(() => {
    // Entrance Animation
    const ctx = gsap.context(() => {
      gsap.from(".animate-title", {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power4.out"
      });
      gsap.from(".animate-card", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        delay: 0.3
      });
    });
    return () => ctx.revert();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormState("sending");
    // Mock API Delay
    setTimeout(() => {
      setFormState("success");
      gsap.to(".submit-btn", { scale: 1.1, backgroundColor: "#10b981", duration: 0.3 });
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-white text-stone-900 pt-32 pb-40 px-6 font-inter selection:bg-primary selection:text-white">
      {/* Decorative Orbs */}
      <div className="fixed top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[160px] pointer-events-none -mr-96 -mt-96" />
      <div className="fixed bottom-0 left-0 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none -ml-72 -mb-72" />

      <div className="max-w-7xl mx-auto relative z-10">
        <header className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-12">
           <div className="max-w-2xl animate-title">
              <p className="text-primary text-[10px] font-black uppercase tracking-[0.6em] mb-6">REACH OUR CURATORS</p>
              <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-8 text-stone-900">Get in <br/> Touch.</h1>
              <p className="text-stone-500 text-lg font-medium leading-relaxed max-w-md">Whether you're looking for an elite partnership or need assistance with a curation journey, our team is always ready to guide you.</p>
           </div>
           
           <div className="flex gap-4 animate-title">
              <div className="w-16 h-16 rounded-3xl bg-stone-50 flex items-center justify-center text-primary border border-stone-100 shadow-xl group hover:scale-110 transition-transform cursor-pointer">
                 <span className="material-symbols-outlined text-2xl">call</span>
              </div>
              <div className="w-16 h-16 rounded-3xl bg-stone-50 flex items-center justify-center text-primary border border-stone-100 shadow-xl group hover:scale-110 transition-transform cursor-pointer">
                 <span className="material-symbols-outlined text-2xl">alternate_email</span>
              </div>
              <div className="w-16 h-16 rounded-3xl bg-stone-50 flex items-center justify-center text-primary border border-stone-100 shadow-xl group hover:scale-110 transition-transform cursor-pointer">
                 <span className="material-symbols-outlined text-2xl">share</span>
              </div>
           </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr,0.8fr] gap-20 items-start">
           {/* Comprehensive Form */}
           <section className="animate-card bg-white border border-stone-200 rounded-[56px] p-8 md:p-16 shadow-[0_40px_100px_rgba(0,0,0,0.06)] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-32 -mt-32" />
              
              {formState === "success" ? (
                <div className="min-h-[400px] flex flex-col items-center justify-center text-center">
                   <div className="w-24 h-24 bg-emerald-500 text-white rounded-full flex items-center justify-center mb-8 shadow-2xl animate-bounce">
                      <span className="material-symbols-outlined text-5xl">done_all</span>
                   </div>
                   <h2 className="text-4xl font-black tracking-tighter mb-4 text-stone-900">Message Delivered.</h2>
                   <p className="text-stone-500 font-medium mb-10 max-w-xs">One of our master curators will respond to your signal within 24 hours.</p>
                   <button onClick={() => setFormState("idle")} className="h-14 px-10 bg-stone-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all">Send Another Signal</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-10 relative z-10">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                         <label className="text-[10px] font-black uppercase tracking-widest text-stone-400 px-3">Your Curation Name</label>
                         <input required type="text" placeholder="Johnathan Doe" className="w-full h-18 bg-stone-50 border border-stone-100 rounded-[28px] px-8 font-bold text-stone-900 focus:border-primary focus:bg-white outline-none transition-all shadow-inner" />
                      </div>
                      <div className="space-y-3">
                         <label className="text-[10px] font-black uppercase tracking-widest text-stone-400 px-3">Elite Email Signal</label>
                         <input required type="email" placeholder="john@curator.com" className="w-full h-18 bg-stone-50 border border-stone-100 rounded-[28px] px-8 font-bold text-stone-900 focus:border-primary focus:bg-white outline-none transition-all shadow-inner" />
                      </div>
                   </div>

                   <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-widest text-stone-400 px-3">Subject Tier</label>
                      <select className="w-full h-18 bg-stone-50 border border-stone-100 rounded-[28px] px-8 font-bold text-stone-900 focus:border-primary focus:bg-white outline-none transition-all shadow-inner appearance-none">
                         <option>Elite Partnership Inquiry</option>
                         <option>Journey Support Signal</option>
                         <option>Culinary Press Request</option>
                         <option>General Curiousity</option>
                      </select>
                   </div>

                   <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-widest text-stone-400 px-3">Your Message Transmission</label>
                      <textarea required placeholder="How can our curators assist you today?" className="w-full min-h-[220px] bg-stone-50 border border-stone-100 rounded-[40px] p-8 font-bold text-stone-900 focus:border-primary focus:bg-white outline-none transition-all shadow-inner resize-none"></textarea>
                   </div>

                   <button disabled={formState === "sending"} className="submit-btn group w-full h-20 bg-primary text-white rounded-[32px] font-black text-lg shadow-2xl shadow-primary/30 hover:scale-[1.01] active:scale-95 transition-all overflow-hidden relative">
                      <div className="flex items-center justify-center gap-4">
                         {formState === "sending" ? (
                           <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                         ) : (
                           <>
                             Transmitting Signal
                             <span className="material-symbols-outlined text-2xl group-hover:translate-x-2 transition-transform">send</span>
                           </>
                         )}
                      </div>
                   </button>
                </form>
              )}
           </section>

           {/* Info Cards */}
           <aside className="space-y-8">
              <div className="animate-card bg-stone-900 text-white rounded-[48px] p-10 relative overflow-hidden group">
                 <div className="absolute top-0 right-0 w-48 h-48 bg-primary/20 rounded-full blur-3xl -mr-24 -mt-24" />
                 <h3 className="text-primary text-[10px] font-black uppercase tracking-widest mb-6 px-2">OFFICE HEADQUARTERS</h3>
                 <p className="text-3xl font-black tracking-tighter mb-4 leading-tight">12 Gourmet Plaza <br/> Vasant Kunj, Delhi</p>
                 <p className="text-stone-400 font-medium mb-10 leading-relaxed text-sm">Our master hub where curators design every culinary journey for the city.</p>
                 <div className="h-[200px] bg-stone-800 rounded-[32px] overflow-hidden group-hover:scale-105 transition-transform duration-700">
                    <img src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1200&q=80" alt="Map Mock" className="w-full h-full object-cover grayscale opacity-60" />
                 </div>
              </div>

              <div className="animate-card bg-white border border-stone-200 rounded-[48px] p-10 shadow-xl group cursor-pointer hover:border-primary transition-all">
                 <h3 className="text-stone-400 text-[10px] font-black uppercase tracking-widest mb-4">DIRECT SIGNAL</h3>
                 <p className="text-2xl font-black text-stone-900 group-hover:text-primary transition-colors">+91 98765 43210</p>
              </div>

              <div className="animate-card bg-white border border-stone-200 rounded-[48px] p-10 shadow-xl group cursor-pointer hover:border-primary transition-all">
                 <h3 className="text-stone-400 text-[10px] font-black uppercase tracking-widest mb-4">EMAIL CURATORS</h3>
                 <p className="text-2xl font-black text-stone-900 group-hover:text-primary transition-colors">hello@curator.com</p>
              </div>
           </aside>
        </div>
      </div>
    </main>
  );
};

export default ContactPage;
