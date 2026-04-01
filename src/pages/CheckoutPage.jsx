import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import AddressModal from "../components/AddressModal";
import { motion, AnimatePresence } from "framer-motion";

const parsePrice = (priceStr) => parseFloat(priceStr.replace(/[^\d.-]/g, "")) || 0;

const CheckoutPage = () => {
  const { cartItems, subtotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Address, 2: Review, 3: Payment
  
  const [addresses, setAddresses] = useState([
    { id: 1, label: "Home", address: "123 Gourmet Heights, Skyline Towers", city: "New Delhi", phone: "+91 98765 43210" },
    { id: 2, label: "Work", address: "Design Studio, Block B, Creative Hub", city: "Gurugram", phone: "+91 98765 43211" },
  ]);
  const [selectedAddress, setSelectedAddress] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const deliveryFee = subtotal > 1500 ? 0 : 99;
  const platformFee = 29;
  const totalPayable = subtotal + deliveryFee + platformFee;

  const handlePay = () => {
    const orderItems = [...cartItems];
    const orderTotal = totalPayable;
    if (clearCart) clearCart();
    navigate("/success", { 
      state: { 
        orderItems, 
        orderTotal,
        address: addresses.find(a => a.id === selectedAddress)
      } 
    });
  };

  if (cartItems.length === 0) {
    return (
      <main className="pt-32 pb-20 text-center">
        <h1 className="text-2xl font-bold mb-4 font-headline">Your tray is empty, Curator.</h1>
        <Link to="/" className="text-primary hover:underline font-bold">Return to Menu</Link>
      </main>
    );
  }

  const stepVariants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  };

  return (
    <main className="pt-28 pb-32 bg-white min-h-screen font-inter selection:bg-primary-fixed selection:text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        
        {/* Concierge Greeting & Progress */}
        <header className="mb-16 max-w-2xl">
          <p className="text-primary text-[10px] font-black uppercase tracking-[0.4em] mb-4">Curator Concierge</p>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-stone-900 mb-8 leading-[0.9]">
            {step === 1 && "Where shall we envoy this journey?"}
            {step === 2 && "Audit your curated tray."}
            {step === 3 && "Securely initializing the vault."}
          </h1>
          
          {/* Progress Journey */}
          <div className="flex gap-2 h-1.5 w-48 mb-4">
             {[1, 2, 3].map(i => (
               <div key={i} className={`flex-1 rounded-full transition-all duration-700 ${step >= i ? 'bg-primary' : 'bg-stone-100'}`} />
             ))}
          </div>
          <p className="text-stone-400 text-xs font-medium tracking-tight">Step {step} of 3 • The Journey Path</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr,400px] gap-20 items-start">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.section 
                key="step-1"
                variants={stepVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-12"
              >
                <div className="flex items-center justify-between">
                   <h2 className="text-2xl font-black text-stone-900 tracking-tight">Select Destination Identity</h2>
                   <button onClick={() => setIsModalOpen(true)} className="text-primary text-xs font-black uppercase tracking-widest flex items-center gap-2 hover:gap-3 transition-all">
                      <span className="material-symbols-outlined text-base">add_location_alt</span>
                      New Address
                   </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   {addresses.map(addr => (
                     <div 
                       key={addr.id}
                       onClick={() => setSelectedAddress(addr.id)}
                       className={`p-10 rounded-[40px] border-2 transition-all cursor-pointer relative group ${selectedAddress === addr.id ? 'border-primary bg-primary/5' : 'border-stone-100 hover:border-stone-300'}`}
                     >
                        <div className="flex justify-between items-start mb-10">
                           <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${selectedAddress === addr.id ? 'bg-primary text-white' : 'bg-stone-50 text-stone-400'}`}>
                              <span className="material-symbols-outlined text-2xl">{addr.label === 'Home' ? 'home' : 'work'}</span>
                           </div>
                           {selectedAddress === addr.id && <span className="material-symbols-outlined text-primary text-2xl filled">verified</span>}
                        </div>
                        <h4 className="text-xl font-black text-stone-900 mb-2">{addr.label}</h4>
                        <p className="text-stone-500 text-sm leading-relaxed mb-1">{addr.address}</p>
                        <p className="text-stone-400 text-xs font-bold uppercase tracking-widest">{addr.city}</p>
                     </div>
                   ))}
                </div>

                <div className="pt-10 border-t border-stone-50">
                   <button onClick={() => setStep(2)} className="h-20 px-12 bg-primary text-white rounded-[32px] font-black text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-primary/30 flex items-center gap-6">
                      Continue to Tray Audit
                      <span className="material-symbols-outlined">arrow_forward</span>
                   </button>
                </div>
              </motion.section>
            )}

            {step === 2 && (
              <motion.section 
                key="step-2"
                variants={stepVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-12"
              >
                <div className="flex items-center justify-between">
                   <h2 className="text-2xl font-black text-stone-900 tracking-tight">Audit Gourmet Tray</h2>
                   <Link to="/cart" className="text-stone-400 text-xs font-bold hover:text-primary transition-colors underline underline-offset-8">Modify Selection</Link>
                </div>

                <div className="space-y-8 bg-stone-50/50 rounded-[56px] p-10 border border-stone-100">
                   {cartItems.map(item => (
                     <div key={item.title} className="flex items-center justify-between gap-8 group">
                        <div className="flex items-center gap-8">
                           <div className="w-24 h-24 rounded-[32px] overflow-hidden shadow-xl">
                              <img src={item.img} alt={item.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" />
                           </div>
                           <div>
                              <h4 className="text-xl font-black text-stone-900 tracking-tight mb-1">{item.title}</h4>
                              <p className="text-stone-400 text-xs font-black uppercase tracking-widest">{item.quantity} × {item.price}</p>
                           </div>
                        </div>
                        <span className="text-2xl font-black text-stone-900 tracking-tighter">₹{(parsePrice(item.price) * item.quantity).toLocaleString()}</span>
                     </div>
                   ))}
                </div>

                <div className="flex gap-4 pt-10 border-t border-stone-50">
                   <button onClick={() => setStep(1)} className="h-20 px-10 bg-stone-50 text-stone-900 rounded-[32px] font-black text-xs uppercase tracking-widest hover:bg-stone-100 transition-all flex items-center gap-4">
                      <span className="material-symbols-outlined">arrow_back</span> Back
                   </button>
                   <button onClick={() => setStep(3)} className="h-20 flex-1 bg-primary text-white rounded-[32px] font-black text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-primary/30 flex items-center justify-center gap-6">
                      Finalize & Pay
                      <span className="material-symbols-outlined">verified</span>
                   </button>
                </div>
              </motion.section>
            )}

            {step === 3 && (
              <motion.section 
                key="step-3"
                variants={stepVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-12"
              >
                <div className="bg-stone-900 text-white rounded-[56px] p-16 shadow-2xl relative overflow-hidden text-center">
                   <div className="absolute top-0 left-0 w-full h-full bg-primary/5 pointer-events-none" />
                   <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-10">
                      <span className="material-symbols-outlined text-primary text-5xl">shield</span>
                   </div>
                   <h2 className="text-4xl font-black tracking-tighter mb-6 underline underline-offset-[16px] decoration-primary">Vault Finalization</h2>
                   <p className="text-stone-400 text-lg font-medium leading-relaxed max-w-md mx-auto mb-12">Clicking the signal below will securely initialize your gourmet journey through our encrypted vault.</p>
                   
                   <div className="flex flex-col gap-4">
                      <button onClick={handlePay} className="h-24 bg-primary text-white rounded-[32px] font-black text-xl uppercase tracking-[0.2em] shadow-2xl shadow-primary/50 hover:scale-[1.02] active:scale-95 transition-all">
                        Initialize Vault
                      </button>
                      <button onClick={() => setStep(2)} className="text-stone-500 hover:text-white text-xs font-black uppercase tracking-widest p-4">Return to Audit</button>
                   </div>
                </div>
              </motion.section>
            )}
          </AnimatePresence>

          {/* Persistent Bill Summary Sidebar */}
          <aside className="sticky top-32">
             <div className="bg-white border border-stone-200 rounded-[56px] p-10 shadow-[0_40px_100px_rgba(0,0,0,0.06)]">
                <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-10 px-2">Journey Bill Summary</p>
                
                <div className="space-y-6 mb-12">
                   <div className="flex justify-between items-center px-2">
                      <span className="text-stone-500 font-bold text-sm">Gourmet Subtotal</span>
                      <span className="text-stone-900 font-black tracking-tight">₹{subtotal.toLocaleString()}</span>
                   </div>
                   <div className="flex justify-between items-center px-2">
                      <span className="text-stone-500 font-bold text-sm">Concierge Delivery</span>
                      <span className="text-stone-900 font-black tracking-tight">{deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}</span>
                   </div>
                   <div className="flex justify-between items-center px-2">
                      <span className="text-stone-500 font-bold text-sm">Platform Vault Fee</span>
                      <span className="text-stone-900 font-black tracking-tight">₹{platformFee}</span>
                   </div>
                </div>

                <div className="h-px bg-stone-50 mb-12" />

                <div className="px-2 mb-10">
                   <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-1">TOTAL PAYABLE</p>
                   <p className="text-6xl font-black text-stone-900 tracking-tighter">₹{totalPayable.toLocaleString()}</p>
                </div>

                <div className="flex items-center gap-4 bg-stone-50 p-6 rounded-[32px] opacity-70">
                   <span className="material-symbols-outlined text-primary">verified_user</span>
                   <p className="text-[8px] font-black uppercase tracking-[0.2em] leading-tight max-w-[120px]">Secured Gourmet Signal active</p>
                </div>
             </div>
          </aside>
        </div>
      </div>

      <AddressModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={(addr) => {
          setAddresses([...addresses, addr]);
          setSelectedAddress(addr.id);
          setIsModalOpen(false);
        }}
      />
    </main>
  );
};

export default CheckoutPage;
