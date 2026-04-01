import React, { useState, useEffect } from "react";

const AddressModal = ({ isOpen, onClose, onSubmit, initialData = null }) => {
  const [formData, setFormData] = useState({
    label: "Home",
    house: "",
    landmark: "",
    address: "Detecting location...",
    city: "New Delhi",
    phone: ""
  });

  useEffect(() => {
    if (initialData && initialData.id !== formData.id) {
      setFormData(initialData);
    }
  }, [initialData, formData.id]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const fullAddress = `${formData.house}${formData.landmark ? ', ' + formData.landmark : ''}, ${formData.address}`;
    onSubmit({ ...formData, address: fullAddress, id: initialData?.id || Date.now() });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-stone-900/40 backdrop-blur-md animate-in fade-in duration-500" onClick={onClose} />
      <div className="relative bg-white w-full max-w-2xl rounded-[56px] shadow-[0_40px_100px_rgba(0,0,0,0.2)] animate-in zoom-in-95 slide-in-from-bottom-10 duration-500 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Map Preview Section */}
        <div className="relative h-[200px] md:h-[260px] shrink-0 bg-stone-100 overflow-hidden">
           <img 
             src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1200&q=80" 
             alt="Google Map Mockup" 
             className="w-full h-full object-cover opacity-60 grayscale-[0.2]"
           />
           <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                 <div className="absolute inset-0 scale-[3] bg-primary/20 rounded-full animate-ping" />
                 <div className="absolute inset-0 scale-[2] bg-primary/10 rounded-full animate-pulse" />
                 <span className="material-symbols-outlined text-5xl text-primary animate-bounce filled relative z-10 drop-shadow-2xl">location_on</span>
              </div>
           </div>
           
           <button 
             type="button" 
             className="absolute bottom-6 right-6 h-12 px-6 bg-white/90 backdrop-blur text-stone-900 font-bold rounded-full shadow-2xl flex items-center gap-3 hover:bg-white transition-all group active:scale-95"
           >
              <span className="material-symbols-outlined text-primary group-hover:scale-110 transition-transform">my_location</span>
              Detect Location
           </button>

           <button 
             type="button"
             onClick={onClose} 
             className="absolute top-6 right-6 w-12 h-12 bg-black/10 backdrop-blur-md text-white rounded-full flex items-center justify-center hover:bg-black/30 transition-all"
           >
             <span className="material-symbols-outlined">close</span>
           </button>
        </div>
        
        {/* Address Details Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-8 md:p-12 space-y-8 scrollbar-hide text-stone-900">
           <div className="mb-2">
              <h3 className="text-3xl font-black tracking-tighter leading-none mb-4">Finalize Address</h3>
              <p className="text-sm font-medium text-stone-500 flex items-center gap-2">
                 <span className="material-symbols-outlined text-primary text-base">pin_drop</span>
                 {formData.address}
              </p>
           </div>

           <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-stone-400 px-2">Flat / House No.</label>
                    <input 
                       required 
                       type="text" 
                       value={formData.house}
                       onChange={(e) => setFormData({...formData, house: e.target.value})}
                       placeholder="e.g. 402, Building A" 
                       className="w-full h-16 px-6 bg-stone-50 rounded-3xl border-2 border-transparent focus:border-primary focus:bg-white transition-all outline-none font-bold placeholder:text-stone-300" 
                    />
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-stone-400 px-2">Landmark (Optional)</label>
                    <input 
                       type="text" 
                       value={formData.landmark}
                       onChange={(e) => setFormData({...formData, landmark: e.target.value})}
                       placeholder="e.g. Near Rose Park" 
                       className="w-full h-16 px-6 bg-stone-50 rounded-3xl border-2 border-transparent focus:border-primary focus:bg-white transition-all outline-none font-bold placeholder:text-stone-300" 
                    />
                 </div>
              </div>

              <div className="space-y-2">
                 <label className="text-[10px] font-black uppercase tracking-widest text-stone-400 px-2">Contact phone</label>
                 <div className="relative">
                    <span className="absolute left-6 top-1/2 -translate-y-1/2 font-bold text-stone-400">+91</span>
                    <input 
                       required 
                       type="tel" 
                       value={formData.phone}
                       onChange={(e) => setFormData({...formData, phone: e.target.value})}
                       placeholder="98765 00000" 
                       className="w-full h-16 pl-16 pr-6 bg-stone-50 rounded-3xl border-2 border-transparent focus:border-primary focus:bg-white transition-all outline-none font-bold placeholder:text-stone-300" 
                    />
                 </div>
              </div>

              <div className="space-y-3">
                 <label className="text-[10px] font-black uppercase tracking-widest text-stone-400 px-2">Save Address as</label>
                 <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                    {['Home', 'Work', 'Friends', 'Gym'].map((tag) => (
                       <button
                         key={tag}
                         type="button"
                         onClick={() => setFormData({...formData, label: tag})}
                         className={`shrink-0 px-6 h-12 rounded-2xl flex items-center gap-3 font-bold transition-all ${
                           formData.label === tag 
                           ? 'bg-primary text-white shadow-lg shadow-primary/20 ring-4 ring-primary/5' 
                           : 'bg-stone-50 text-stone-500 hover:bg-stone-100'
                         }`}
                       >
                         <span className="material-symbols-outlined text-lg">
                            {tag === 'Home' ? 'home' : tag === 'Work' ? 'work' : 'favorite'}
                         </span>
                         {tag}
                       </button>
                    ))}
                 </div>
              </div>
           </div>

           <div className="pt-4 sticky bottom-0 bg-white">
              <button type="submit" className="w-full h-20 bg-primary text-white rounded-[28px] font-headline font-black text-lg shadow-2xl shadow-primary/20 hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-4">
                Confirm & Save Address
                <span className="material-symbols-outlined">done_all</span>
              </button>
           </div>
        </form>
      </div>
    </div>
  );
};

export default AddressModal;
