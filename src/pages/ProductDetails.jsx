import React, { useMemo, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import ProductCarousel from "../components/ProductCarousel";

// Common product data used across the app (ideally would be in a store/context)
const commonProducts = {
  specials: [
    {
      title: "Rustic Pepperoni",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDMwk2O8V0kNHz0ixFsEu97Y3M2FR8bDBf3Ldy96JxyiP5SfFlrpBQXgSv_n5LvEY5rlY8W3uvkMQ9CBN79TeIUJleoiy69iONe4cTj2NC2TxvP_NwJZkF1GsCGwtDzjOLt-GiRrVss8iN1GvDhqXqiHzSf8eDsoxO1sJxEG8DZfsdHmYnS5fyi1g-ZYQ_wcIRuqOPNEzV-bi6dumMjyNbj1RYjcxJfKcXu7zrpAHEBZR3rDF8pcjCx3s4Pe_mv_wr6hrnBoOxxp7c",
      badge: "20% OFF",
      rating: "4.8",
      price: "₹1,249",
      delivery: "15-20 Mins Delivery",
      description: "Hand-stretched artisan dough topped with premium dry-aged pepperoni, San Marzano tomato sauce, and a blend of three aged cheeses. Wood-fired to perfection with a hint of smoky flavor.",
    },
    {
      title: "Green Glow Bowl",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCr9RAdpf7ye5SVsKbab_NtGE3gMmnbZUNyqC9ayqT8Y3Tf2vEUCwtUY4-i8AVLO3zWvHDQcZJT6pqDMMQkA_aGyD-F_7F77IxUsH9SlrG30hLTmP8t1AkKQPM49OXRh4aJL903xkL8ESbZgsM09M7tMu4Wby0jSn4hQNmK_ttvJmgbQc9FlLtj8Ol-GjT89Hza3tXEusB1Va53Q6Lz6s3Wsem6-iYshDOImTPD0mHb4A07W2IZWMK6g3Xom44dAR2m-SdudHe77Sk",
      badge: "Chef's Choice",
      rating: "4.9",
      price: "₹1,038",
      delivery: "10-15 Mins Delivery",
      description: "A nutrient-rich power bowl featuring organic kale, quinoa, avocado slices, roasted chickpeas, and a signature citrus-tahini dressing. The perfect balance of health and gourmet taste.",
    },
    {
      title: "The Curator Burger",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBIQOPMQpYERlhhcYbV3_YEDDLwuGGkGDrnsySWaQKEpezMkwCnZBfYKIKUj5VDtfobG-KbKwzkjhBI_CmJ6wHT-YPH1AKe5fSMx9SoTbaUDoT25SSIccx02LEZNIl6iCpfJKse8lFR_k_ESEN_4ZawSqrq6tLC5CZtLRRa6UxsQ1PFbW_yyyESugmjgEVCGn0lKGlL1co7gF3s0ITFbjqqS1ZFAR9Aujes0ykEh-u6eOlLX6BXEDyWo2OFMWdu1oYxaoyLCJGRexI",
      rating: "4.7",
      price: "₹1,328",
      delivery: "20-25 Mins Delivery",
      description: "A masterclass in burger craft. Wagyu beef patty, truffle-infused caramelized onions, swiss emmental, and house-made brioche bun. Served with sea salt parmesan crisps.",
    },
  ],
};

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

  // Find product by title (demo logic)
  const productData = useMemo(() => {
    const all = [...commonProducts.specials].find(p => p.title.toLowerCase().replace(/ /g, '-') === id);
    return all || commonProducts.specials[0]; // Fallback to first
  }, [id]);

  const isHearted = heartedItems.some(h => h.title === productData.title);

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
              {productData.rating}
            </div>
            <div className="text-3xl font-black text-on-surface">
              {productData.price}
            </div>
          </div>

          <p className="text-on-surface-variant text-lg leading-relaxed mb-10 max-w-xl">
             {productData.description || "Discover the finest culinary craft with our signature products. Every ingredient is sourced sustainably to ensure the highest quality experience for your palate."}
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
                  className={`h-16 w-16 rounded-full border-2 border-primary/20 flex items-center justify-center transition hover:bg-primary/5 active:scale-90 ${isHearted ? 'text-primary' : 'text-primary'}`}
                >
                  <span className={`material-symbols-outlined ${isHearted ? 'filled' : ''}`}>favorite</span>
                </button>
             </div>

             <div className="flex items-center gap-4 text-sm font-semibold text-on-surface-variant px-4">
                <span className="material-symbols-outlined text-primary">schedule</span>
                {productData.delivery}
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
      <div className="border-t border-outline/10 mt-10">
        <ProductCarousel 
          title="Specials For You" 
          items={commonProducts.specials} 
        />
      </div>
    </main>
  );
};

export default ProductDetails;
