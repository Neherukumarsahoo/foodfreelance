import React, { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Play, Pause, ArrowUpRight, ShoppingBag } from "lucide-react";
import { gsap } from "gsap";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const HERO_SLIDES = [
  {
    id: "wood-fired-pizza",
    title: "The Artisan Craft",
    highlight: "Sourdough Pizza",
    description: "Experience the perfect blistered crust, hand-stretched and fired in our 900-degree stone oven. A symphony of San Marzano and buffalo mozzarella.",
    media: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1600&q=80",
    accent: "#ff6b00"
  },
  {
    id: "tokyo-sushi",
    title: "Oceanic Purity",
    highlight: "Omakase Mastery",
    description: "Sustainably sourced, expertly sliced. Our chefs honor centuries of tradition to bring you the pinnacle of Japanese culinary precision.",
    media: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=1600&q=80",
    accent: "#ec4899"
  },
  {
    id: "gourmet-patisserie",
    title: "Sweet Indulgence",
    highlight: "Velvet Ganache",
    description: "A masterclass in pastry. Layered textures of single-origin dark chocolate and 24-carat gold leaf for the ultimate dessert finale.",
    media: "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=1600&q=80",
    accent: "#ffd700"
  }
];

const Hero = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const highlightRef = useRef(null);
  const descRef = useRef(null);
  const actionRef = useRef(null);
  
  const slide = HERO_SLIDES[index];

  const nextSlide = useCallback(() => {
    setIndex((prev) => (prev + 1) % HERO_SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setIndex((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  }, []);

  useEffect(() => {
    if (isPaused) return undefined;
    const timer = setInterval(nextSlide, 8000);
    return () => clearInterval(timer);
  }, [isPaused, nextSlide]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Clear previous states
      gsap.set([titleRef.current, highlightRef.current, descRef.current, actionRef.current], { 
        y: 100, 
        opacity: 0 
      });

      // Professional Masked reveal
      const tl = gsap.timeline({ defaults: { ease: "expo.out", duration: 1.2 }});
      
      tl.to(titleRef.current, { y: 0, opacity: 1 }, 0.2)
        .to(highlightRef.current, { y: 0, opacity: 1 }, 0.35)
        .to(descRef.current, { y: 0, opacity: 1 }, 0.5)
        .to(actionRef.current, { y: 0, opacity: 1 }, 0.65);

    }, containerRef);

    return () => ctx.revert();
  }, [index]);

  return (
    <section 
      ref={containerRef}
      className="relative w-full min-h-[90vh] bg-stone-950 overflow-hidden flex items-center"
    >
      {/* Immersive Background Engine with Ken Burns Zoom */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 1.15 }}
            animate={{ opacity: 1, scale: 1.05 }}
            exit={{ opacity: 0, scale: 1 }}
            transition={{ duration: 1.8, ease: [0.19, 1, 0.22, 1] }}
            className="w-full h-full relative will-change-transform"
          >
            <img
              src={slide.media}
              alt=""
              className="w-full h-full object-cover"
            />
            {/* Ambient Gradients for Text Legibility */}
            <div className="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-950/70 to-stone-950/20" />
            <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 py-16 md:py-24">
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-10 lg:gap-16">
          <div className="flex-1 space-y-8">
            <div className="overflow-hidden">
              <p 
                ref={titleRef}
                className="text-white/70 text-xs md:text-sm font-semibold uppercase tracking-[0.5em] inline-flex items-center gap-3"
              >
                <span className="w-10 h-px bg-white/40" />
                The Culinary Curator
              </p>
            </div>

            <div className="space-y-4">
              <div className="overflow-hidden">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-tight tracking-tight">
                  <span ref={highlightRef} className="block">{slide.title}</span>
                  <span className="text-primary-fixed italic font-serif font-light"> {slide.highlight}</span>
                </h1>
              </div>
              <div className="overflow-hidden">
                <p 
                  ref={descRef}
                  className="text-lg md:text-xl text-white/70 font-normal leading-relaxed max-w-2xl"
                >
                  {slide.description}
                </p>
              </div>
            </div>

            <div ref={actionRef} className="flex flex-wrap items-center gap-4 sm:gap-6">
              <button 
                onClick={() => addToCart({ ...slide, img: slide.media })}
                className="px-10 h-14 bg-white text-black rounded-full font-semibold text-sm uppercase tracking-[0.2em] shadow-[0_20px_40px_rgba(255,255,255,0.15)] hover:scale-105 active:scale-95 transition-all flex items-center gap-3 group"
              >
                Begin Journey <ShoppingBag size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button 
                onClick={() => navigate(`/product/${slide.id}`)}
                className="text-sm font-semibold text-white uppercase tracking-[0.25em] hover:text-primary transition-colors flex items-center gap-2 group"
              >
                Details <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </div>
          </div>

          <div className="w-full lg:w-[420px] backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6 shadow-2xl space-y-6">
            <div className="text-white">
              <p className="text-sm uppercase tracking-[0.3em] text-white/60 mb-2">Chef's note</p>
              <p className="text-xl font-semibold leading-relaxed">
                Curated omakase, stone-fired doughs, and patisserie crafted for golden-hour feasts.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-3 text-center text-white/80">
              <div className="bg-white/5 rounded-2xl py-3 border border-white/10">
                <p className="text-2xl font-black">{index + 1}</p>
                <p className="text-xs uppercase tracking-widest">of {HERO_SLIDES.length}</p>
              </div>
              <div className="bg-white/5 rounded-2xl py-3 border border-white/10">
                <p className="text-2xl font-black">900°</p>
                <p className="text-xs uppercase tracking-widest">Stone Oven</p>
              </div>
              <div className="bg-white/5 rounded-2xl py-3 border border-white/10">
                <p className="text-2xl font-black">24k</p>
                <p className="text-xs uppercase tracking-widest">Detail</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Extreme Minimalist Navigation - SaaS Dot Style */}
      <div className="absolute bottom-16 inset-x-0 z-20 flex flex-col items-center gap-8">
        <div className="flex gap-4">
           {HERO_SLIDES.map((_, i) => (
             <button 
               key={i}
               onClick={() => setIndex(i)}
               className={`h-1 rounded-full transition-all duration-1000 ${i === index ? 'w-20 bg-white' : 'w-6 bg-white/20 hover:bg-white/40'}`}
             />
           ))}
        </div>

        <div className="flex items-center gap-12">
            <button 
              onClick={prevSlide}
              className="text-white/20 hover:text-white transition-colors"
              aria-label="Previous"
            >
              <ArrowLeft size={24} />
            </button>
            
            <button 
              onClick={() => setIsPaused(!isPaused)}
              className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:bg-white/5 transition-all"
            >
               {isPaused ? <Play size={18} fill="currentColor" /> : <Pause size={18} fill="currentColor" />}
            </button>

            <button 
              onClick={nextSlide}
              className="text-white/20 hover:text-white transition-colors"
              aria-label="Next"
            >
              <ArrowRight size={24} />
            </button>
        </div>
      </div>

      {/* SaaS Decorative Accents */}
      <div className="absolute top-0 bottom-0 left-12 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent hidden xl:block" />
      <div className="absolute top-0 bottom-0 right-12 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent hidden xl:block" />
    </section>
  );
};

export default Hero;
