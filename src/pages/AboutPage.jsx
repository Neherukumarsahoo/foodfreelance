import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AboutPage = () => {
  const headerRef = useRef(null);
  const pillarRef = useRef(null);
  const statsRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    // Initial entry
    gsap.fromTo(headerRef.current, 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1.2, ease: "power4.out" }
    );

    // Scroll Animations
    const pillars = pillarRef.current.querySelectorAll(".pillar-card");
    gsap.fromTo(pillars,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: pillarRef.current,
          start: "top 80%",
        }
      }
    );

    const stats = statsRef.current.querySelectorAll(".stat-item");
    gsap.fromTo(stats,
      { opacity: 0, scale: 0.9 },
      {
        opacity: 1,
        scale: 1,
        duration: 1,
        stagger: 0.15,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: statsRef.current,
          start: "top 85%",
        }
      }
    );
  }, []);

  return (
    <main className="min-h-screen bg-stone-950 text-white overflow-x-hidden">
      
      {/* SaaS Hero Section */}
      <section 
        ref={headerRef}
        className="relative pt-40 pb-32 px-6 flex flex-col items-center justify-center text-center overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,#ff6b001a,transparent_50%)]" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="relative z-10 max-w-4xl mx-auto">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-[0.3em] mb-8 animate-pulse">
            Established 2024
          </span>
          <h1 className="font-headline text-6xl md:text-8xl font-black mb-8 tracking-tighter leading-none">
            REDEFINING <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-400">DINING</span> <br /> 
            THROUGH CURATION.
          </h1>
          <p className="text-stone-400 text-xl font-medium max-w-2xl mx-auto leading-relaxed">
            The Culinary Curator isn't just a delivery platform. It's a digital gallery that connects artisanal chefs with discerning diners who value integrity over convenience.
          </p>
        </div>
      </section>

      {/* Pillars of Excellence Grid */}
      <section ref={pillarRef} className="py-24 px-6 bg-stone-900/30">
        <div className="max-w-7xl mx-auto">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                { title: "Artisanal Integrity", desc: "Every chef is hand-picked. Every dish is vetted for authentic flavor profiles and high-grade ingredients.", icon: "temp_preferences_eco" },
                { title: "Precision Logistics", desc: "Our logistics layer treats food like fine art, ensuring optimal temperature and rapid courier dispatch.", icon: "precision_manufacturing" },
                { title: "Sensory UX", desc: "A world-class digital experience that translates the atmosphere of a kitchen into your fingertips.", icon: "touch_app" }
              ].map((pillar) => (
                <div key={pillar.title} className="pillar-card group p-10 rounded-[48px] bg-white/5 border border-white/5 transition-all hover:bg-white/10 hover:-translate-y-2 hover:shadow-2xl">
                   <div className="w-16 h-16 rounded-3xl bg-primary/20 flex items-center justify-center text-primary mb-8 group-hover:scale-110 transition-transform">
                      <span className="material-symbols-outlined text-3xl">{pillar.icon}</span>
                   </div>
                   <h3 className="font-headline text-2xl font-black mb-4 group-hover:text-primary transition-colors">{pillar.title}</h3>
                   <p className="text-stone-400 leading-relaxed font-medium">{pillar.desc}</p>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="py-32 px-6">
         <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
            {[
              { val: "500+", label: "Chef Artisans" },
              { val: "24/7", label: "Quality Guard" },
              { val: "15M", label: "Diners Served" },
              { val: "4.9", label: "Culinary Rating" }
            ].map((stat) => (
              <div key={stat.label} className="stat-item group">
                 <p className="text-6xl md:text-7xl font-black text-white tracking-tighter mb-2 group-hover:text-primary transition-colors">{stat.val}</p>
                 <p className="text-[10px] font-black uppercase tracking-[0.4em] text-stone-500">{stat.label}</p>
              </div>
            ))}
         </div>
      </section>

      {/* Partners/Community Banner */}
      <section ref={ctaRef} className="pb-32 px-6">
         <div className="max-w-7xl mx-auto relative rounded-[64px] overflow-hidden bg-white/5 border border-white/5 p-12 md:p-24 text-center">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=2000&q=80')] opacity-10 grayscale hover:opacity-15 transition-opacity" />
            <div className="relative z-10">
               <h2 className="font-headline text-4xl md:text-6xl font-black mb-8 tracking-tight">Are you a curated chef?</h2>
               <p className="text-stone-400 text-lg mb-12 max-w-xl mx-auto font-medium leading-relaxed">Join the world's most exclusive culinary network. We provide the logistics, you provide the mastery.</p>
               <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="bg-primary hover:bg-primary/90 text-white h-16 px-10 rounded-full font-headline font-black text-lg transition-all shadow-2xl shadow-primary/20 active:scale-95">
                    Apply to Partner
                  </button>
                  <button className="bg-white/5 hover:bg-white/10 text-white h-16 px-10 rounded-full font-headline font-black text-lg transition-all border border-white/10 active:scale-95">
                    Our Vetting Process
                  </button>
               </div>
            </div>
         </div>
      </section>

    </main>
  );
};

export default AboutPage;
