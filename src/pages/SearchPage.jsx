import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { searchProducts, getTrendingProducts } from "../data/products";
import { useCart } from "../context/CartContext";

const SearchPage = () => {
  const { addToCart, toggleHeart, heartedItems } = useCart();
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const [query, setQuery] = useState("");
  const [recentSearches] = useState([
    "Rustic Pepperoni",
    "Glow Bowl",
    "Chef Choice",
    "Low Calorie",
  ]);

  const trending = getTrendingProducts();

  useEffect(() => {
    // Focus input on mount
    inputRef.current?.focus();
  }, []);

  const results = React.useMemo(() => {
    if (query.trim()) {
      return searchProducts(query);
    }
    return [];
  }, [query]);

  const handleClear = () => {
    setQuery("");
    inputRef.current?.focus();
  };

  const handleRecentClick = (term) => {
    setQuery(term);
  };

  const handleAddToCart = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  const handleToggleHeart = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    toggleHeart(product);
  };

  return (
    <main className="min-h-screen bg-surface pt-28 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        
        {/* SaaS Header - Search & Back */}
        <div className="flex items-center gap-4 mb-12">
          <button 
            onClick={() => navigate(-1)} 
            className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center hover:bg-primary hover:text-white transition-all group active:scale-90"
          >
            <span className="material-symbols-outlined group-hover:-translate-x-1 transition-transform">arrow_back</span>
          </button>
          
          <div className="flex-1 relative group">
             <div className="absolute left-6 top-1/2 -translate-y-1/2 text-primary">
                <span className="material-symbols-outlined text-2xl">search</span>
             </div>
             <input 
               ref={inputRef}
               type="text"
               value={query}
               onChange={(e) => setQuery(e.target.value)}
               placeholder="Search for flavors, cravings, or chefs..."
               className="w-full h-16 pl-14 pr-14 bg-white rounded-[28px] border-none shadow-xl shadow-primary/5 focus:ring-4 focus:ring-primary/10 transition-all text-lg font-medium placeholder:text-on-surface-variant/40 outline-none"
             />
             {query && (
               <button 
                 onClick={handleClear}
                 className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-surface-container-highest flex items-center justify-center hover:bg-error hover:text-white transition-all animate-in zoom-in duration-300"
               >
                  <span className="material-symbols-outlined text-sm">close</span>
               </button>
             )}
          </div>
        </div>

        {/* Recently Searched Chips */}
        {!query && (
          <div className="mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant mb-4 px-2">Recently Searched</h3>
            <div className="flex flex-wrap gap-3">
               {recentSearches.map((term) => (
                 <button 
                   key={term}
                   onClick={() => handleRecentClick(term)}
                   className="px-6 h-10 bg-white rounded-full text-sm font-bold text-on-surface-variant hover:bg-primary-container hover:text-primary transition-all border border-outline/5 shadow-sm active:scale-95"
                 >
                   {term}
                 </button>
               ))}
            </div>
          </div>
        )}

        {/* Dynamic Content Area */}
        <section>
          <div className="flex items-center justify-between mb-8 px-2">
            <h2 className="font-headline text-2xl font-black text-on-surface">
              {query ? `Results for "${query}"` : "Trending Now"}
            </h2>
            {query && results.length > 0 && <span className="text-xs font-bold text-on-surface-variant">{results.length} flavors found</span>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {(query ? results : trending).map((product, idx) => (
              <Link 
                to={`/product/${product.id || idx}`}
                key={product.title} 
                className="group bg-white rounded-[40px] p-4 flex gap-6 items-center border border-outline/5 transition-all hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-1 active:scale-[0.98] relative"
              >
                <div className="w-24 h-24 rounded-3xl overflow-hidden shadow-inner bg-surface-container-highest shrink-0 relative">
                  <img src={product.img} alt={product.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <button 
                    onClick={(e) => handleToggleHeart(e, product)}
                    className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/40 backdrop-blur-md border border-white/20 flex items-center justify-center text-primary shadow-lg hover:scale-110 transition-all z-20"
                  >
                    <span className={`material-symbols-outlined text-sm ${heartedItems.some(h => h.title === product.title) ? 'filled' : ''}`}>favorite</span>
                  </button>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                     <span className="text-[10px] font-black text-primary uppercase tracking-widest">{product.category}</span>
                     {product.badge && <span className="w-1 h-1 rounded-full bg-zinc-300" />}
                     {product.badge && <span className="text-[10px] font-bold text-on-surface-variant">{product.badge}</span>}
                  </div>
                  <h4 className="text-lg font-black text-on-surface truncate pr-16">{product.title}</h4>
                  <div className="flex items-center justify-between mt-2">
                     <span className="font-headline text-xl font-black text-primary">{product.price}</span>
                     <button 
                        onClick={(e) => handleAddToCart(e, product)}
                        className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all shadow-sm active:scale-90"
                     >
                        <span className="material-symbols-outlined text-sm">add</span>
                     </button>
                  </div>
                </div>
              </Link>
            ))}

            {query && results.length === 0 && (
              <div className="col-span-full py-20 text-center animate-in zoom-in duration-500">
                <div className="w-20 h-20 bg-surface-container rounded-full flex items-center justify-center mx-auto mb-6">
                   <span className="material-symbols-outlined text-4xl text-on-surface-variant opacity-20">search_off</span>
                </div>
                <h3 className="text-xl font-bold text-on-surface mb-2">No flavors found for "{query}"</h3>
                <p className="text-on-surface-variant text-sm max-w-xs mx-auto">Maybe try searching for something else, like "Pizza" or "Pasta"?</p>
                <button onClick={handleClear} className="mt-8 text-primary font-bold hover:underline">Clear Search</button>
              </div>
            )}
          </div>
        </section>

      </div>
    </main>
  );
};

export default SearchPage;
