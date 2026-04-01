import React, { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const coupons = [
  { code: "WELCOME10", discount: 0.1, label: "Welcome 10% Off" },
  { code: "GOURMET20", discount: 0.2, label: "Gourmet Exclusive 20%" },
  { code: "FREEDISH", discount: 150, label: "Flat ₹150 Off", type: "flat" },
];

const SUGGESTIONS_POOL = [
  { title: "Truffle Fries", price: "₹249", img: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=600&q=80", rating: "4.9" },
  { title: "Garlic Knots", price: "₹189", img: "https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?auto=format&fit=crop&w=600&q=80", rating: "4.7" },
  { title: "Artisan Tiramisu", price: "₹349", img: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=600&q=80", rating: "5.0" },
  { title: "Iced Hibiscus", price: "₹159", img: "https://images.unsplash.com/photo-1553909489-cd47e0907980?auto=format&fit=crop&w=600&q=80", rating: "4.6" },
  { title: "Chili Oil Dip", price: "₹49", img: "https://images.unsplash.com/photo-1596701062351-be129a1ef10a?auto=format&fit=crop&w=600&q=80", rating: "4.8" },
  { title: "Extra Burrata", price: "₹299", img: "https://images.unsplash.com/photo-1631515233349-2fce3053c5f7?auto=format&fit=crop&w=600&q=80", rating: "4.9" },
  { title: "Coke Classic", price: "₹89", img: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=600&q=80", rating: "4.5" },
  { title: "Sparkling Water", price: "₹129", img: "https://images.unsplash.com/photo-1559839914-17aee705115a?auto=format&fit=crop&w=600&q=80", rating: "4.9" },
];

const parsePrice = (priceStr) => {
  return parseFloat(priceStr.replace(/[^\d.-]/g, "")) || 0;
};

const CartPage = () => {
  const { cartItems, updateQuantity, removeFromCart, addToCart, subtotal, activeCoupon, setActiveCoupon } = useCart();
  const [isCouponOpen, setIsCouponOpen] = useState(false);
  const [activeSuggestions, setActiveSuggestions] = useState(SUGGESTIONS_POOL.slice(0, 4));
  const navigate = useNavigate();

  const discountAmount = useMemo(() => {
    if (!activeCoupon) return 0;
    if (activeCoupon.type === "flat") return activeCoupon.discount;
    return subtotal * activeCoupon.discount;
  }, [activeCoupon, subtotal]);

  const deliveryFee = subtotal > 1500 ? 0 : 99;
  const platformFee = 29;
  const totalPayable = subtotal - discountAmount + deliveryFee + platformFee;
  
  // Progress towards free delivery
  const freeDeliveryThreshold = 1500;
  const deliveryProgress = Math.min(100, (subtotal / freeDeliveryThreshold) * 100);
  const amountNeededForFree = Math.max(0, freeDeliveryThreshold - subtotal);

  const handleApplySuggestion = (item) => {
    addToCart({ ...item, delivery: "10-15 mins" });
    
    // Smart refresh: Replace the added item with a new one from the pool not currently in suggestions
    setActiveSuggestions(prev => {
      const currentTitles = prev.map(s => s.title);
      const availablePool = SUGGESTIONS_POOL.filter(s => !currentTitles.includes(s.title) && s.title !== item.title);
      
      if (availablePool.length > 0) {
        const randomIndex = Math.floor(Math.random() * availablePool.length);
        const nextItem = availablePool[randomIndex];
        return prev.map(s => s.title === item.title ? nextItem : s);
      }
      return prev;
    });
  };

  const handleCheckout = () => {
    navigate("/checkout");
  };

  if (cartItems.length === 0) {
    return (
      <main className="pt-32 pb-20 px-6 max-w-4xl mx-auto min-h-[70vh] flex flex-col items-center justify-center text-center">
        <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-6 animate-bounce">
          <span className="material-symbols-outlined text-5xl text-primary">shopping_cart</span>
        </div>
        <h1 className="font-headline text-4xl font-extrabold mb-4 text-on-surface">Your selection is empty</h1>
        <p className="text-on-surface-variant text-lg mb-8 max-w-md">
           Explore our curated menu and add some culinary excellence to your tray.
        </p>
        <Link 
          to="/" 
          className="bg-primary text-white px-10 py-4 rounded-full font-bold shadow-xl hover:scale-105 transition-all"
        >
          Explore Menu
        </Link>
      </main>
    );
  }

  return (
    <main className="pt-24 pb-24 bg-surface">
      <div className="max-w-[98%] xl:max-w-[1600px] mx-auto px-6 md:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[7fr,3fr] gap-12 xl:gap-20 items-start">
          {/* Cart Items List */}
          <section className="space-y-8">
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div 
                  key={item.title} 
                  className="bg-surface-container-lowest rounded-[40px] p-5 flex items-center gap-8 border border-outline/5 shadow-sm hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="h-32 w-32 rounded-3xl overflow-hidden shrink-0 shadow-inner bg-surface-container">
                    <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  </div>
                  
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-[1fr,auto,auto] items-center gap-8 md:gap-12">
                    {/* Info */}
                    <div className="max-w-md">
                      <h3 className="font-headline text-2xl font-bold text-on-surface mb-1">{item.title}</h3>
                      <p className="text-sm text-on-surface-variant flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary text-base">schedule</span>
                        {item.delivery}
                      </p>
                    </div>
                    
                    {/* Controls */}
                    <div className="flex items-center bg-surface-container rounded-full p-1.5 border border-outline/5 shadow-inner">
                      <button 
                        onClick={() => updateQuantity(item.title, -1)}
                        className="w-10 h-10 flex items-center justify-center hover:bg-surface rounded-full transition-all active:scale-90"
                      >
                        <span className="material-symbols-outlined text-sm">remove</span>
                      </button>
                      <span className="w-10 text-center font-black text-lg">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.title, 1)}
                        className="w-10 h-10 flex items-center justify-center hover:bg-surface rounded-full transition-all active:scale-90"
                      >
                        <span className="material-symbols-outlined text-sm">add</span>
                      </button>
                    </div>

                    {/* Price & Action */}
                    <div className="flex items-center gap-6 min-w-[140px] justify-end">
                      <span className="text-2xl font-black text-on-surface">
                         ₹{(parsePrice(item.price) * item.quantity).toLocaleString()}
                      </span>
                      <button 
                        onClick={() => removeFromCart(item.title)}
                        className="p-3 text-on-surface-variant hover:text-error hover:bg-error/10 rounded-full transition-all active:scale-90"
                      >
                        <span className="material-symbols-outlined">delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="pt-16 mt-10 border-t border-outline/10">
               <div className="flex items-center justify-between mb-8 px-2">
                  <div className="flex flex-col">
                    <span className="text-primary text-xs font-bold uppercase tracking-widest mb-1">Pair it with</span>
                    <h3 className="font-headline text-3xl font-black text-on-surface">You Might Also Like</h3>
                  </div>
                  <div className="flex gap-3">
                     <button className="w-10 h-10 rounded-full border border-outline/20 flex items-center justify-center text-on-surface-variant hover:bg-primary/5 hover:text-primary transition-all">
                        <span className="material-symbols-outlined">chevron_left</span>
                     </button>
                     <button className="w-10 h-10 rounded-full border border-outline/20 flex items-center justify-center text-on-surface-variant hover:bg-primary/5 hover:text-primary transition-all">
                        <span className="material-symbols-outlined">chevron_right</span>
                     </button>
                  </div>
               </div>
               <div className="flex gap-4 overflow-x-auto pb-8 px-2 scrollbar-hide snap-x snap-mandatory">
                  {activeSuggestions.map((suggested) => (
                    <div 
                      key={suggested.title}
                      className="min-w-[170px] md:min-w-[210px] flex-1 snap-start bg-surface-container-low rounded-[32px] p-4 border border-outline/5 hover:shadow-2xl transition-all duration-500 group flex flex-col"
                    >
                      <div className="relative aspect-square overflow-hidden rounded-[24px] mb-4">
                         <img 
                           src={suggested.img} 
                           alt={suggested.title} 
                           className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                         />
                         <div className="absolute top-3 right-3 bg-white/90 backdrop-blur text-stone-900 text-[9px] font-black px-2 py-1 rounded-full flex items-center gap-1 shadow-md">
                            <span className="material-symbols-outlined text-[9px] filled text-yellow-500">star</span>
                            {suggested.rating}
                         </div>
                      </div>
                      <h4 className="font-headline text-base font-bold text-on-surface mb-3 px-1 leading-tight line-clamp-1">{suggested.title}</h4>
                      <div className="flex items-center justify-between px-1 mt-auto">
                         <span className="font-black text-lg text-primary">{suggested.price}</span>
                         <button 
                            onClick={() => handleApplySuggestion(suggested)}
                            className="bg-primary text-white w-10 h-10 rounded-full flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-lg hover:shadow-primary/30"
                         >
                            <span className="material-symbols-outlined text-lg">add</span>
                         </button>
                      </div>
                    </div>
                  ))}
               </div>
            </div>
          </section>

          {/* Bill Summary */}
          <aside className="sticky top-18">
            <div className="bg-surface-container-high rounded-[48px] p-10 border border-outline/10 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 rounded-full -mr-24 -mt-24 pointer-events-none" />
              
              <h2 className="font-headline text-3xl font-black mb-8 text-on-surface tracking-tighter">Bill Summary</h2>
              
              {/* Free Delivery Tracker */}
              <div className="mb-10 bg-surface/40 p-5 rounded-3xl border border-outline/5 shadow-sm">
                 <div className="flex justify-between items-center mb-3">
                    <span className="text-xs font-black uppercase tracking-widest text-on-surface-variant">Free Delivery</span>
                    <span className="text-sm font-bold text-primary">₹{freeDeliveryThreshold}</span>
                 </div>
                 <div className="h-3 w-full bg-surface-container relative rounded-full overflow-hidden mb-3">
                    <div 
                      className={`absolute left-0 top-0 h-full transition-all duration-1000 ease-out ${deliveryProgress >= 100 ? 'bg-success' : 'bg-gradient-to-r from-primary to-orange-400'}`} 
                      style={{ width: `${deliveryProgress}%` }} 
                    />
                 </div>
                 <p className="text-[11px] font-medium text-on-surface-variant leading-relaxed">
                    {deliveryProgress >= 100 
                      ? <span className="text-success font-bold flex items-center gap-1">
                          <span className="material-symbols-outlined text-xs">verified</span>
                          Premium Delivery Unlocked!
                        </span> 
                      : `Add ₹${amountNeededForFree.toLocaleString()} more to unlock FREE Delivery.`}
                 </p>
              </div>

              {/* Promo Code Tool */}
              <div className="mb-8 relative z-20">
                <div 
                   onClick={() => setIsCouponOpen(!isCouponOpen)}
                   className="flex items-center justify-between p-4 bg-surface rounded-2xl border border-outline/20 cursor-pointer hover:border-primary/50 transition-all group"
                >
                   <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-primary">sell</span>
                      <span className="font-bold text-sm">
                        {activeCoupon ? activeCoupon.code : "Apply Promo Code"}
                      </span>
                   </div>
                   <span className={`material-symbols-outlined transition-transform duration-300 ${isCouponOpen ? 'rotate-180' : ''}`}>
                      expand_more
                   </span>
                </div>
                
                {isCouponOpen && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-surface border border-outline/20 rounded-2xl shadow-2xl overflow-hidden z-30 animate-in fade-in slide-in-from-top-4 duration-300">
                    <div className="p-2 space-y-1">
                      {coupons.map((c) => (
                        <button
                          key={c.code}
                          onClick={() => {
                            setActiveCoupon(c === activeCoupon ? null : c);
                            setIsCouponOpen(false);
                          }}
                          className={`w-full flex flex-col items-start p-3 rounded-xl transition-all ${activeCoupon?.code === c.code ? 'bg-primary text-white' : 'hover:bg-surface-container-highest'}`}
                        >
                          <span className="font-bold text-sm">{c.code}</span>
                          <span className={`text-[10px] uppercase font-bold opacity-70`}>{c.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-4 mb-8 text-sm font-medium">
                <div className="flex justify-between items-center text-on-surface-variant">
                  <span>Cart Subtotal (MRP)</span>
                  <span>₹{subtotal.toLocaleString()}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between items-center text-success font-bold">
                    <span>Promo Discount</span>
                    <span>- ₹{discountAmount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between items-center text-on-surface-variant">
                  <span>Delivery Fee</span>
                  <span>{deliveryFee === 0 ? <span className="text-success uppercase text-[10px] bg-success/10 px-2 py-0.5 rounded">Free</span> : `₹${deliveryFee}`}</span>
                </div>
                <div className="flex justify-between items-center text-on-surface-variant">
                  <span>Platform Fee</span>
                  <span>₹{platformFee}</span>
                </div>
              </div>

              <div className="h-px bg-outline/10 mb-6" />

              <div className="flex justify-between items-end mb-8">
                <div>
                  <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-1">Total Payable</p>
                  <p className="text-4xl font-black text-on-surface tracking-tighter">₹{totalPayable.toLocaleString()}</p>
                </div>
                <div className="text-[10px] text-right text-on-surface-variant max-w-[80px]">
                  Incl. all taxes and charges
                </div>
              </div>

              <button 
                onClick={handleCheckout}
                className="w-full h-16 rounded-full font-bold text-lg shadow-xl transition-all flex items-center justify-center gap-3 bg-primary text-white hover:shadow-primary/20 hover:scale-[1.02] active:scale-95"
              >
                Proceed to Checkout
                <span className="material-symbols-outlined">payments</span>
              </button>
              
              <p className="text-[10px] text-center mt-6 text-on-surface-variant px-4">
                 By clicking proceed, you agree to our terms and conditions for premium delivery.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
};

export default CartPage;
