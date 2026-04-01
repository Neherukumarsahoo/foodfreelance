import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const categories = [
  { 
    label: "Artisanal Burgers", 
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=600&h=800&auto=format&fit=crop", 
    accent: "from-orange-500/20 to-transparent"
  },
  { 
    label: "Wood-fired Pizza", 
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=600&h=800&auto=format&fit=crop", 
    accent: "from-red-500/20 to-transparent"
  },
  { 
    label: "Premium Sushi", 
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=600&h=800&auto=format&fit=crop", 
    accent: "from-blue-500/20 to-transparent"
  },
  { 
    label: "Hand-crafted Pasta", 
    image: "https://images.unsplash.com/photo-1473093226795-af9932fe5856?q=80&w=600&h=800&auto=format&fit=crop", 
    accent: "from-yellow-500/20 to-transparent"
  },
  { 
    label: "Elite Mixology", 
    image: "https://images.unsplash.com/photo-1544145945-f904253d0c7b?q=80&w=600&h=800&auto=format&fit=crop", 
    accent: "from-purple-500/20 to-transparent"
  },
  { 
    label: "Signature Sweets", 
    image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?q=80&w=600&h=800&auto=format&fit=crop", 
    accent: "from-pink-500/20 to-transparent"
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { y: 40, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

const Categories = () => (
  <section className="py-24 md:py-32 bg-white overflow-hidden">
    <div className="max-w-7xl mx-auto px-6 md:px-8">
      <header className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16 px-4">
        <div className="max-w-2xl">
          <p className="text-primary text-[10px] font-black uppercase tracking-[0.4em] mb-4">Artisanal Discovery</p>
          <h2 className="font-headline text-5xl md:text-7xl font-black text-stone-900 tracking-tighter leading-[0.9]">
            Curation by <br/> <span className="underline underline-offset-[12px] decoration-stone-100">Cuisine Style</span>
          </h2>
        </div>
        <Link 
          to="/categories" 
          className="group flex items-center gap-4 text-xs font-black uppercase tracking-widest text-primary hover:gap-6 transition-all"
        >
          Explore All Styles
          <span className="material-symbols-outlined text-lg">arrow_forward</span>
        </Link>
      </header>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6"
      >
        {categories.map((item) => (
          <Link key={item.label} to="/categories" className="block">
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="relative aspect-[3/4] rounded-[40px] overflow-hidden group shadow-2xl bg-stone-50 cursor-pointer"
            >
              <img 
                src={item.image} 
                alt={item.label} 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-[1.5s]"
              />
              <div className={`absolute inset-0 bg-gradient-to-t ${item.accent} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000`} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-8 flex flex-col justify-end translate-y-4 group-hover:translate-y-0 transition-transform duration-700">
                <p className="text-[10px] font-black text-primary-fixed uppercase tracking-widest mb-1 opacity-0 group-hover:opacity-100 transition-opacity delay-100">Explore</p>
                <h3 className="text-xl font-black text-white tracking-tight leading-tight">{item.label}</h3>
              </div>
            </motion.div>
          </Link>
        ))}
      </motion.div>
    </div>
  </section>
);

export default Categories;

