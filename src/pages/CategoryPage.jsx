import React, { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Filter, SlidersHorizontal, Star, ShoppingBag, ArrowRight } from "lucide-react";
import { PRODUCTS } from "../data/products";
import ProductCard from "../components/ProductCard";
import { ProductSkeleton } from "../components/Skeleton";
import { AnimatePresence, motion } from "framer-motion";

const CategoryPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [vegOnly, setVegOnly] = useState(false);
  const [sortBy, setSortBy] = useState("Popular");
  const [priceRange, setPriceRange] = useState(2500);
  const [selectedRating, setSelectedRating] = useState(0);
  const [selectedCuisines, setSelectedCuisines] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const toggleCuisine = (cuisine) => {
    setSelectedCuisines(prev => 
      prev.includes(cuisine) ? prev.filter(c => c !== cuisine) : [...prev, cuisine]
    );
  };

  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    if (searchQuery) {
      result = result.filter((p) => p.title.toLowerCase().includes(searchQuery.toLowerCase()));
    }

    if (vegOnly) {
      result = result.filter((p) => p.veg);
    }

    if (selectedRating > 0) {
      result = result.filter((p) => parseFloat(p.rating) >= selectedRating);
    }

    if (selectedCuisines.length > 0) {
      result = result.filter((p) => selectedCuisines.includes(p.category));
    }

    result = result.filter((p) => {
      const priceVal = parseInt(p.price.replace(/[^\d]/g, ""));
      return priceVal <= priceRange;
    });

    switch (sortBy) {
      case "Low to High":
        result.sort((a, b) => parseInt(a.price.replace(/[^\d]/g, "")) - parseInt(b.price.replace(/[^\d]/g, "")));
        break;
      case "High to Low":
        result.sort((a, b) => parseInt(b.price.replace(/[^\d]/g, "")) - parseInt(a.price.replace(/[^\d]/g, "")));
        break;
      case "Rating":
        result.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
        break;
      case "New Arrivals":
        result.sort((a) => (a.category === "New Arrivals" ? -1 : 1));
        break;
      case "Popular":
      default:
        result.sort((p) => (p.trending ? -1 : 1));
        break;
    }

    return result;
  }, [searchQuery, vegOnly, sortBy, priceRange, selectedRating, selectedCuisines]);

  const scrollToGrid = () => {
    const grid = document.getElementById("product-grid");
    if (grid) grid.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <main className="min-h-screen bg-stone-50 pt-20">
      {/* Cinematic Category Hero */}
      <section className="relative h-[60vh] overflow-hidden bg-stone-900 group">
        <img 
          src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1920&q=80" 
          alt="Gourmet Background" 
          className="w-full h-full object-cover opacity-60 scale-105 group-hover:scale-110 transition-transform duration-[3s]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/40 to-transparent" />
        
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-primary-fixed text-[10px] font-black uppercase tracking-[0.6em] mb-4"
          >
            Elite Selections
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white text-6xl md:text-9xl font-black tracking-tighter leading-none mb-8"
          >
            THE CURATED <br/> <span className="italic font-serif font-light text-primary-fixed">JOURNEY</span>
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <button 
              onClick={scrollToGrid}
              className="px-8 h-14 bg-primary text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl hover:scale-105 transition-all flex items-center gap-3"
            >
              Order a Masterpiece <ShoppingBag size={18} />
            </button>
            <button 
               onClick={scrollToGrid}
               className="px-8 h-14 bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-white/20 transition-all"
            >
              Curated Menu
            </button>
          </motion.div>
        </div>
      </section>

      {/* Gourmet Glass Filter Bar */}
      <div className="sticky top-20 z-40 bg-white/80 backdrop-blur-2xl border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between gap-8">
          <div className="flex-1 max-w-xl relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 group-focus-within:text-primary transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Search by flavor, ingredient, or masterpiece..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-12 bg-stone-100/50 rounded-2xl pl-12 pr-6 text-sm font-bold border border-transparent focus:border-primary/20 focus:bg-white outline-none transition-all shadow-inner"
            />
          </div>

          <div className="flex items-center gap-4">
             <div className="hidden md:flex items-center gap-2 bg-stone-100 rounded-2xl p-1 px-4 h-12 border border-stone-200 shadow-sm">
                <span className="text-[10px] font-black uppercase tracking-widest text-stone-400">Sort:</span>
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent text-xs font-black uppercase tracking-widest outline-none cursor-pointer text-stone-900"
                >
                  <option>Popular</option>
                  <option>New Arrivals</option>
                  <option>Low to High</option>
                  <option>High to Low</option>
                  <option>Rating</option>
                </select>
             </div>
             <button className="md:hidden w-12 h-12 bg-stone-900 text-white rounded-2xl flex items-center justify-center shadow-xl">
                <SlidersHorizontal size={20} />
             </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row gap-12" id="product-grid">
        {/* Minimalist Artisanal Sidebar */}
        <aside className="w-full md:w-72 shrink-0 space-y-12">
          {/* Diet Toggle */}
          <section className="bg-white p-8 rounded-[40px] shadow-[0_20px_50px_rgba(0,0,0,0.03)] border border-stone-100">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-stone-400 mb-6">Lifestyle Preference</h3>
            <label className="flex items-center justify-between cursor-pointer group">
              <span className="font-bold text-stone-900 group-hover:text-primary transition-colors">Purely Vegetarian</span>
              <div 
                onClick={() => setVegOnly(!vegOnly)}
                className={`w-12 h-7 rounded-full p-1 transition-all duration-500 ease-in-out ${vegOnly ? 'bg-primary' : 'bg-stone-200'}`}
              >
                <div className={`w-5 h-5 bg-white rounded-full shadow-lg transition-transform duration-500 ${vegOnly ? 'translate-x-5' : 'translate-x-0'}`} />
              </div>
            </label>
          </section>

          {/* Pricing Scale */}
          <section className="bg-white p-8 rounded-[40px] shadow-[0_20px_50px_rgba(0,0,0,0.03)] border border-stone-100">
            <div className="flex justify-between items-end mb-6">
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-stone-400">Gourmet Budget</h3>
              <span className="text-sm font-black text-primary tracking-tighter">₹{priceRange}</span>
            </div>
            <input 
              type="range" 
              min="200" 
              max="5000" 
              step="50"
              value={priceRange}
              onChange={(e) => setPriceRange(parseInt(e.target.value))}
              className="w-full h-1.5 bg-stone-100 rounded-full appearance-none cursor-pointer accent-primary"
            />
            <div className="flex justify-between mt-4 text-[8px] font-black text-stone-300 uppercase tracking-widest">
              <span>₹200</span>
              <span>₹5000</span>
            </div>
          </section>

          {/* Rating Engine */}
          <section className="bg-white p-8 rounded-[40px] shadow-[0_20px_50px_rgba(0,0,0,0.03)] border border-stone-100">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-stone-400 mb-6">Master Chef's Score</h3>
            <div className="space-y-3">
              {[5, 4, 3].map((r) => (
                <button 
                  key={r} 
                  onClick={() => setSelectedRating(selectedRating === r ? 0 : r)}
                  className={`w-full h-12 rounded-2xl px-4 flex items-center justify-between group transition-all ${
                    selectedRating === r ? 'bg-stone-900 shadow-xl' : 'bg-stone-50 hover:bg-stone-100'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} fill={i < r ? "#a04100" : "none"} color={i < r ? "#a04100" : "#d6d3d1"} />
                    ))}
                    <span className={`text-[10px] font-black uppercase tracking-widest ml-1 ${selectedRating === r ? 'text-white' : 'text-stone-400'}`}>{r}.0+</span>
                  </div>
                  <ArrowRight size={14} className={`${selectedRating === r ? 'text-primary animate-pulse' : 'text-stone-300 opacity-0 group-hover:opacity-100 transition-opacity'}`} />
                </button>
              ))}
            </div>
          </section>

          {/* Cuisines (Category) */}
          <section className="bg-white p-8 rounded-[40px] shadow-[0_20px_50px_rgba(0,0,0,0.03)] border border-stone-100">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-stone-400 mb-6">Flavor Architectures</h3>
            <div className="flex flex-wrap gap-2">
              {["Specials", "Trending", "New Arrivals", "Price Drop", "Popular"].map(c => (
                <button 
                  key={c} 
                  onClick={() => toggleCuisine(c)}
                  className={`h-9 px-4 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
                    selectedCuisines.includes(c) ? 'bg-primary text-white shadow-lg' : 'bg-stone-50 text-stone-500 hover:bg-emerald-500/10 hover:text-emerald-600'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </section>
        </aside>

        {/* Results Grid Engine */}
        <section className="flex-1">
          <div className="flex items-center justify-between mb-8 px-4">
             <div className="flex items-baseline gap-3">
               <h2 className="text-3xl font-black text-stone-900 tracking-tighter capitalize">{sortBy.replace("-", " ")}</h2>
               <span className="text-[10px] font-black text-stone-300 uppercase tracking-widest">({filteredProducts.length} Selections)</span>
             </div>
             { (searchQuery || vegOnly || selectedRating > 0 || selectedCuisines.length > 0 || priceRange < 2500) && (
               <button 
                 onClick={() => {
                   setSearchQuery("");
                   setVegOnly(false);
                   setSelectedRating(0);
                   setSelectedCuisines([]);
                   setPriceRange(2500);
                 }}
                 className="text-[10px] font-black text-primary uppercase tracking-widest hover:underline"
               >
                 Clear Filters
               </button>
             )}
          </div>

          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {loading ? (
                Array(6).fill(0).map((_, i) => (
                  <motion.div 
                    key={`skeleton-${i}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <ProductSkeleton />
                  </motion.div>
                ))
              ) : filteredProducts.length > 0 ? (
                filteredProducts.map((item, idx) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ 
                      duration: 0.6, 
                      delay: idx * 0.05,
                      ease: [0.16, 1, 0.3, 1] 
                    }}
                  >
                    <div onClick={() => navigate(`/product/${item.id}`)} className="cursor-pointer">
                      <ProductCard item={item} />
                    </div>
                  </motion.div>
                ))
              ) : (
                <motion.div className="col-span-full py-24 text-center">
                   <div className="w-20 h-20 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-6 text-stone-300">
                      <Filter size={32} />
                   </div>
                   <h3 className="text-xl font-bold text-stone-900">No Masterpieces Found</h3>
                   <p className="text-stone-500 mt-2">Try adjusting your filters or seeking a different flavor.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </section>
      </div>
    </main>
  );
};

export default CategoryPage;
