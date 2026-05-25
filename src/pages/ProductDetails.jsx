import React, { useMemo, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import ProductCarousel from "../components/ProductCarousel";
import { PRODUCTS } from "../data/products";

const VisibilitySelector = () => (
  <div className="bg-surface-container rounded-3xl p-6 border border-outline/10 shadow-sm">
    <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-4 block">Product Visibility</label>
    <div className="flex items-center justify-between p-4 bg-surface rounded-2xl border border-outline/5 hover:border-primary/30 transition cursor-pointer group">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition">
          <span className="material-symbols-outlined text-xl">visibility</span>
        </div>
        <div>
          <p className="font-bold text-on-surface">Select visibility options</p>
          <p className="text-xs text-on-surface-variant">Manage who can view this premium item</p>
        </div>
      </div>
      <span className="material-symbols-outlined text-on-surface-variant">unfold_more</span>
    </div>
  </div>
);

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart, toggleHeart, heartedItems } = useCart();

  // Find product by id or by slug
  const productData = useMemo(() => {
    const found = PRODUCTS.find(p => p.id === id || p.title.toLowerCase().replace(/ /g, '-') === id);
    if (found) {
      return {
        ...found,
        description: found.description || `Indulge in our exquisite ${found.title}, prepared by our culinary artisans using premium ingredients, organic textures, and absolute gourmet design to satisfy your premium palate.`
      };
    }
    // Fallback to first product
    return PRODUCTS[0] ? {
      ...PRODUCTS[0],
      description: PRODUCTS[0].description || "Artisanal culinary preparation made with premium sourced ingredients."
    } : {
      title: "Gourmet Selection",
      price: "₹999",
      rating: "4.9",
      delivery: "15-20 Mins Delivery",
      description: "Premium selection crafted by our master chefs.",
      img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80"
    };
  }, [id]);

  const isHearted = heartedItems.some(h => h.title === productData.title);

  const specials = useMemo(() => {
    return PRODUCTS.filter(p => p.category === "Specials");
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  return (
    <main className="pt-20 pb-10 bg-surface">
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-10 grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Image Section */}
        <div className="relative group">
          <div className="aspect-[4/5] overflow-hidden rounded-[40px] shadow-2xl bg-surface-container-low">
            <img 
              src={productData.img} 
              alt={productData.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
            />
          </div>
          {productData.badge && (
            <div className="absolute top-8 left-8 bg-secondary-container text-white px-4 py-1.5 rounded-full font-bold text-xs shadow-xl backdrop-blur-md bg-opacity-90">
              {productData.badge}
            </div>
          )}
        </div>

        {/* Product Info Section */}
        <div className="flex flex-col justify-center">
          <div className="mb-2 flex items-center gap-3">
             <Link to="/" className="text-sm font-semibold text-primary flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">arrow_back</span>
                Home
             </Link>
             <span className="text-xs text-on-surface-variant">/</span>
             <span className="text-sm font-medium text-on-surface-variant">{productData.title}</span>
          </div>
          
          <h1 className="font-headline text-5xl md:text-6xl font-black text-on-surface mb-6 leading-tight">
            {productData.title}
          </h1>

          <div className="flex items-center gap-6 mb-8">
            <div className="flex items-center gap-2 bg-yellow-400/10 text-yellow-500 px-4 py-2 rounded-full font-bold">
              <span className="material-symbols-outlined filled text-xl">star</span>
              {productData.rating || "4.8"}
            </div>
            <div className="text-3xl font-black text-on-surface">
              {productData.price}
            </div>
          </div>

          <p className="text-on-surface-variant text-lg leading-relaxed mb-10 max-w-xl">
             {productData.description}
          </p>

          <div className="flex flex-col gap-6">
             {/* Accessibility and Order */}
             <div className="flex items-center gap-4">
                <button 
                  onClick={() => addToCart(productData)}
                  className="flex-1 bg-primary text-white h-16 rounded-full font-bold text-lg shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3"
                >
                  <span className="material-symbols-outlined">shopping_bag</span>
                  Add to Tray
                </button>
                <button 
                  onClick={() => toggleHeart(productData)}
                  className={`h-16 w-16 rounded-full border-2 border-primary/20 flex items-center justify-center transition hover:bg-primary/5 active:scale-90 text-primary`}
                >
                  <span className={`material-symbols-outlined ${isHearted ? 'filled' : ''}`}>favorite</span>
                </button>
             </div>

             <div className="flex items-center gap-4 text-sm font-semibold text-on-surface-variant px-4">
                <span className="material-symbols-outlined text-primary">schedule</span>
                {productData.delivery || "20-30 Mins Delivery"}
                <span className="w-1.5 h-1.5 rounded-full bg-outline/40"></span>
                <span className="material-symbols-outlined text-primary">eco</span>
                Sustainable Sourcing
             </div>

             {/* Visibility Tool Requested */}
             <VisibilitySelector />
          </div>
        </div>
      </div>

      {/* Special For You Section at Bottom */}
      {specials.length > 0 && (
        <div className="border-t border-outline/10 mt-10">
          <ProductCarousel 
            title="Specials For You" 
            items={specials} 
          />
        </div>
      )}
    </main>
  );
};

export default ProductDetails;
