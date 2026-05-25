import { Link, useNavigate, useParams } from "react-router-dom";
import { gsap } from "gsap";
import { useCart } from "../context/CartContext";
import AddressModal from "../components/AddressModal";
import { useState, useEffect, useRef, useCallback } from "react";

const ProfilePage = () => {
  const navigate = useNavigate();
  const { tab } = useParams();
  const { heartedItems, toggleHeart, orders } = useCart();
  const activeTab = tab || "overview";

  const contentRef = useRef(null);
  const [addressModal, setAddressModal] = useState({ isOpen: false, data: null });

  // -- Comprehensive User Identity State --
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("curator_user_v4");
    return saved ? JSON.parse(saved) : {
      name: "Alex Curator",
      email: "alex.c@curatorhub.com",
      callingPhone: "98765 43210",
      whatsappPhone: "98765 43210",
      dob: "1994-03-12",
      status: "Elite Member",
      memberSince: "Mar 2024",
      points: 1250,
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=800&q=80"
    };
  });

  // -- Addresses --
  const [addresses, setAddresses] = useState(() => {
    const saved = localStorage.getItem("curator_addresses");
    return saved ? JSON.parse(saved) : [
      { id: 1, label: "Home", address: "12 Gourmet Plaza, Vasant Kunj, Delhi", icon: "home", isPrimary: true, phone: "9876543210" },
      { id: 2, label: "Studio", address: "Gourmet Labs, South City, Gurgaon", icon: "work", isPrimary: false, phone: "9876543211" }
    ];
  });

  // -- Preferences --
  const [prefs, setPrefs] = useState(() => {
    const saved = localStorage.getItem("curator_prefs");
    return saved ? JSON.parse(saved) : { spice: true, eco: false, alerts: true };
  });

  // -- Orders loaded dynamically from CartContext --

  const payments = [
    { id: 1, type: "Visa", number: "•••• 4242", expiry: "04/26", isPrimary: true },
    { id: 2, type: "Mastercard", number: "•••• 8888", expiry: "12/25", isPrimary: false }
  ];


  // -- Persistence --
  useEffect(() => { localStorage.setItem("curator_user_v4", JSON.stringify(user)); }, [user]);
  useEffect(() => { localStorage.setItem("curator_addresses", JSON.stringify(addresses)); }, [addresses]);
  useEffect(() => { localStorage.setItem("curator_prefs", JSON.stringify(prefs)); }, [prefs]);

  // -- Animations --
  const animateTabChange = useCallback(() => {
    const listItems = contentRef.current?.querySelectorAll(".animate-item");
    if (listItems) {
      gsap.fromTo(listItems, 
        { opacity: 0, y: 30, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.08, ease: "back.out(1.2)" }
      );
    }
  }, []);

  useEffect(() => { animateTabChange(); }, [activeTab, animateTabChange]);

  const handleAddressSubmit = (addr) => {
    if (addressModal.data) {
      setAddresses(prev => prev.map(a => a.id === addr.id ? addr : a));
    } else {
      setAddresses(prev => [...prev, addr]);
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div className="space-y-8">
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { label: "Elite Tier Pts", val: user.points, max: 2000, icon: "diamond" },
                  { label: "Total Curations", val: 24, max: 100, icon: "potted_plant" },
                  { label: "Member Status", val: 98, max: 100, icon: "star" }
                ].map((stat) => (
                  <div key={stat.label} className="animate-item bg-white border border-stone-200 p-8 rounded-[32px] shadow-xl group hover:border-emerald-500 transition-all">
                     <span className="material-symbols-outlined text-primary mb-4 block group-hover:scale-110 transition-transform">{stat.icon}</span>
                     <p className="text-stone-400 text-[10px] font-black uppercase tracking-widest mb-1">{stat.label}</p>
                     <p className="text-3xl font-black text-stone-900 mb-4">{stat.val} <span className="text-xs text-stone-300">/ {stat.max}</span></p>
                     <div className="h-1 bg-stone-50 rounded-full overflow-hidden"><div className="h-full bg-emerald-500 transition-all duration-1000" style={{ width: `${(stat.val / stat.max) * 100}%` }} /></div>
                  </div>
                ))}
             </div>
             <Link to="/profile/orders" className="animate-item bg-stone-900 text-white rounded-[40px] p-10 relative overflow-hidden group cursor-pointer shadow-2xl block">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[100px] -mr-32 -mt-32" />
                <h3 className="text-primary text-[10px] font-black uppercase tracking-widest mb-6 px-1">ACTIVE JOURNEY STATUS</h3>
                <div className="flex items-center justify-between relative z-10">
                   <div>
                      <p className="text-3xl font-black tracking-tighter mb-1">Rustic Pepperoni in Transit</p>
                      <p className="text-stone-400 text-sm font-medium">ETA: 12 Minutes • Signals active</p>
                   </div>
                   <span className="material-symbols-outlined text-4xl text-white group-hover:translate-x-4 transition-transform">arrow_forward_ios</span>
                </div>
             </Link>
          </div>
        );
      case "orders":
        return (
          <div className="space-y-6">
             {orders.map(order => (
               <div key={order.id} className="animate-item bg-white border border-stone-200 p-8 rounded-[40px] shadow-xl group hover:border-primary transition-all flex flex-col md:flex-row md:items-center justify-between gap-8">
                  <div className="flex items-center gap-6">
                     <div className={`w-16 h-16 rounded-[24px] flex items-center justify-center ${order.status === 'Preparing' ? 'bg-amber-100 text-amber-600' : 'bg-emerald-100 text-emerald-600'}`}>
                        <span className="material-symbols-outlined text-3xl">{order.icon}</span>
                     </div>
                     <div>
                        <div className="flex items-center gap-3 mb-1">
                           <h4 className="text-xl font-black text-stone-900 tracking-tight">{order.id}</h4>
                           <span className={`text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded ${order.status === 'Preparing' ? 'bg-amber-500/10 text-amber-500' : 'bg-emerald-500/10 text-emerald-500'}`}>{order.status}</span>
                        </div>
                        <p className="text-stone-500 text-xs font-medium">{order.items}</p>
                     </div>
                  </div>
                  <div className="flex items-center justify-between md:justify-end gap-12 border-t md:border-t-0 pt-6 md:pt-0 border-stone-50">
                     <div className="text-left md:text-right">
                        <p className="text-lg font-black text-stone-900 mb-0.5">{order.total}</p>
                        <p className="text-stone-400 text-[10px] font-bold uppercase tracking-widest">{order.date}</p>
                     </div>
                     <button className="h-12 px-6 bg-stone-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all">Reorder Signal</button>
                  </div>
               </div>
             ))}
          </div>
        );
      case "profile":
        return (
          <div className="max-w-4xl animate-item bg-white border border-stone-200 rounded-[56px] p-8 md:p-16 shadow-[0_40px_100px_rgba(0,0,0,0.06)]">
             <header className="mb-14 flex flex-col md:flex-row items-center gap-10">
                <div className="relative group">
                   <div className="w-32 h-32 rounded-[48px] overflow-hidden border-4 border-stone-50 shadow-2xl">
                      <img src={user.avatar} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" alt="Profile" />
                   </div>
                   <button className="absolute -bottom-2 -right-2 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition-all">
                      <span className="material-symbols-outlined text-lg">photo_camera</span>
                   </button>
                </div>
                <div>
                   <h3 className="text-3xl font-black tracking-tighter text-stone-900 mb-2">Account Identity</h3>
                   <p className="text-stone-400 text-sm font-medium">Update your signals and elite persona details below.</p>
                </div>
             </header>

             <form className="space-y-10" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-widest text-stone-400 px-3">Curation Persona Name</label>
                      <input type="text" value={user.name} onChange={(e) => setUser({...user, name: e.target.value})} className="w-full h-16 bg-stone-50 rounded-3xl border border-stone-100 px-8 font-bold text-stone-900 focus:border-primary focus:bg-white outline-none transition-all shadow-inner" />
                   </div>
                   <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-widest text-stone-400 px-3">Elite Email Signal</label>
                      <input type="email" value={user.email} onChange={(e) => setUser({...user, email: e.target.value})} className="w-full h-16 bg-stone-50 rounded-3xl border border-stone-100 px-8 font-bold text-stone-900 focus:border-primary focus:bg-white outline-none transition-all shadow-inner" />
                   </div>
                   <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-widest text-stone-400 px-3">Calling Signal Number</label>
                      <input type="tel" value={user.callingPhone} onChange={(e) => setUser({...user, callingPhone: e.target.value})} className="w-full h-16 bg-stone-50 rounded-3xl border border-stone-100 px-8 font-bold text-stone-900 focus:border-primary focus:bg-white outline-none transition-all shadow-inner" />
                   </div>
                   <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-widest text-stone-400 px-3">WhatsApp Encryption Number</label>
                      <input type="tel" value={user.whatsappPhone} onChange={(e) => setUser({...user, whatsappPhone: e.target.value})} className="w-full h-16 bg-stone-50 rounded-3xl border border-stone-100 px-8 font-bold text-stone-900 focus:border-primary focus:bg-white outline-none transition-all shadow-inner" />
                   </div>
                   <div className="space-y-3 md:col-span-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-stone-400 px-3">Gourmet Birthdate</label>
                      <input type="date" value={user.dob} onChange={(e) => setUser({...user, dob: e.target.value})} className="w-full h-16 bg-stone-50 rounded-3xl border border-stone-100 px-8 font-bold text-stone-900 focus:border-primary focus:bg-white outline-none transition-all shadow-inner" />
                   </div>
                </div>

                <div className="pt-8">
                   <button onClick={() => {
                      gsap.fromTo(".save-feedback", { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5 });
                      setTimeout(() => gsap.to(".save-feedback", { opacity: 0, duration: 0.5 }), 2000);
                   }} className="w-full md:w-auto px-12 h-18 bg-primary text-white rounded-3xl font-black text-xs uppercase tracking-[0.2em] shadow-2xl shadow-primary/30 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-4">
                      Preserve Identity Signals
                      <span className="material-symbols-outlined text-xl">verified</span>
                   </button>
                   <p className="save-feedback opacity-0 text-[10px] font-black uppercase tracking-widest text-emerald-500 mt-4 text-center md:text-left">Persona Successfully Preserved in the Vault.</p>
                </div>
             </form>
          </div>
        );
      case "addresses":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             {addresses.map(addr => (
               <div key={addr.id} className="animate-item bg-white border border-stone-200 p-10 rounded-[40px] group hover:border-primary transition-all relative overflow-hidden shadow-xl">
                  {addr.isPrimary && (
                    <div className="absolute top-8 right-8 px-3 h-5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[8px] font-black uppercase tracking-widest rounded-full flex items-center">PRIMARY</div>
                  )}
                  <div className="w-14 h-14 bg-stone-50 rounded-2xl flex items-center justify-center text-primary mb-8 group-hover:scale-110 transition-transform">
                     <span className="material-symbols-outlined text-3xl">{addr.icon}</span>
                  </div>
                  <h4 className="text-xl font-black text-stone-900 mb-2">{addr.label}</h4>
                  <p className="text-stone-500 text-sm leading-relaxed mb-10 max-w-[200px]">{addr.address}</p>
                  <div className="flex gap-3">
                     <button onClick={() => setAddressModal({ isOpen: true, data: addr })} className="flex-1 h-12 bg-stone-50 hover:bg-stone-100 rounded-2xl text-[10px] font-bold uppercase tracking-widest transition-all">Edit Portal</button>
                     <button onClick={() => setAddresses(prev => prev.filter(a => a.id !== addr.id))} className="w-12 h-12 bg-stone-50 hover:bg-error/5 hover:text-error rounded-2xl flex items-center justify-center transition-all">
                        <span className="material-symbols-outlined text-lg">close</span>
                     </button>
                  </div>
               </div>
             ))}
             <button onClick={() => setAddressModal({ isOpen: true, data: null })} className="animate-item border-2 border-dashed border-stone-200 rounded-[40px] p-10 flex flex-col items-center justify-center gap-4 text-stone-400 hover:text-primary hover:border-primary transition-all group min-h-[300px]">
                <div className="w-20 h-20 bg-stone-50 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                   <span className="material-symbols-outlined text-4xl">add_business</span>
                </div>
                <p className="text-sm font-black uppercase tracking-[0.2em]">Add Vault Location</p>
             </button>
          </div>
        );
      case "payments":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             {payments.map(card => (
               <div key={card.id} className="animate-item bg-white border border-stone-200 p-10 rounded-[40px] group hover:border-black transition-all shadow-xl relative overflow-hidden">
                  <div className="flex justify-between items-start mb-12">
                     <div className="w-16 h-10 bg-stone-900 rounded-lg flex items-center justify-center text-white font-black text-xs italic">{card.type}</div>
                     {card.isPrimary && <span className="bg-emerald-500/10 text-emerald-500 text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded">Active Vault</span>}
                  </div>
                  <p className="text-2xl font-black text-stone-900 mb-2 tracking-widest">{card.number}</p>
                  <p className="text-stone-400 text-[10px] font-bold uppercase tracking-widest">Expires {card.expiry}</p>
               </div>
             ))}
          </div>
        );
      case "referrals":
        return (
          <div className="animate-item bg-stone-900 text-white rounded-[56px] p-16 relative overflow-hidden shadow-2xl">
             <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-[120px] -mr-48 -mt-48" />
             <div className="relative z-10 max-w-lg">
                <p className="text-primary text-[10px] font-black uppercase tracking-[0.5em] mb-4">GIVE ₹500, GET ₹500</p>
                <h2 className="text-5xl font-black tracking-tighter mb-6 leading-tight">Gift a Gourmet Experience</h2>
                <p className="text-stone-400 text-lg font-medium leading-relaxed mb-10">Invite your elite circle to the curator platform. They get ₹500 off their first journey, and you earn ₹500 in points.</p>
                <button className="h-16 px-10 bg-white text-stone-900 rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all">Copy Elite Code</button>
             </div>
          </div>
        );
      case "membership":
        return (
          <div className="animate-item bg-white border border-stone-200 rounded-[56px] p-12 shadow-2xl relative overflow-hidden group">
             <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-emerald-500/5 opacity-50" />
             <div className="relative z-10 flex flex-col md:flex-row items-center gap-16">
                <div className="w-full md:w-[400px] aspect-[1.6/1] bg-stone-900 rounded-[40px] p-10 text-white shadow-2xl relative overflow-hidden group-hover:rotate-2 transition-transform duration-700">
                   <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -mr-32 -mt-32" />
                   <div className="h-full flex flex-col justify-between italic">
                      <div><span className="text-2xl font-black tracking-tighter uppercase">Curator Plus</span></div>
                      <div>
                         <p className="text-2xl font-black tracking-widest mb-1">{user.name.toUpperCase()}</p>
                         <p className="text-stone-500 text-[10px] font-bold tracking-[0.3em] uppercase">Valid thru 03/2025</p>
                      </div>
                   </div>
                </div>
                <div className="flex-1 space-y-8">
                   <h3 className="text-3xl font-black tracking-tighter text-stone-900">Elite Tier Benefits</h3>
                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {[
                        { icon: "delivery_dining", label: "Zero Delivery Fees" },
                        { icon: "schedule", label: "Priority Lane Access" },
                        { icon: "stars", label: "Exclusive Drop Signals" },
                        { icon: "headset_mic", label: "Support Concierge" }
                      ].map(b => (
                        <div key={b.label} className="flex items-center gap-4 group">
                           <div className="w-10 h-10 rounded-xl bg-stone-50 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all"><span className="material-symbols-outlined text-xl">{b.icon}</span></div>
                           <span className="text-sm font-bold text-stone-600">{b.label}</span>
                        </div>
                      ))}
                   </div>
                </div>
             </div>
          </div>
        );
      case "hearted":
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
             {heartedItems.length > 0 ? (
               heartedItems.map(item => (
                 <div key={item.id || item.title} className="animate-item group relative overflow-hidden rounded-[40px] shadow-xl aspect-square cursor-pointer">
                    <img src={item.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt={item.title} />
                    <button onClick={(e) => { e.stopPropagation(); toggleHeart(item); }} className="absolute top-6 right-6 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white shadow-xl hover:scale-110 active:scale-95 transition-all"><span className="material-symbols-outlined filled">favorite</span></button>
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent flex items-end p-8"><p className="text-white font-black text-xl leading-tight">{item.title}</p></div>
                 </div>
               ))
             ) : (
               <div className="col-span-full py-20 text-center animate-item">
                  <div className="w-20 h-20 bg-stone-50 rounded-full flex items-center justify-center mx-auto mb-6 text-stone-200">
                     <span className="material-symbols-outlined text-4xl">favorite</span>
                  </div>
                  <h3 className="text-xl font-bold text-stone-900 mb-2">No Hearted Curations yet.</h3>
                  <p className="text-stone-500 text-sm max-w-xs mx-auto">Start hearting your favorite flavors to see them here.</p>
               </div>
             )}
          </div>
        );
      case "preferences":
        return (
          <div className="max-w-3xl animate-item">
             <div className="bg-white border border-stone-200 rounded-[40px] p-8 space-y-10 shadow-xl">
                {[
                  { id: "spice", label: "Elite Spice Tolerance", desc: "Our chefs will curate your levels at max intensity when active.", icon: "local_fire_department" },
                  { id: "eco", label: "Eco-Packaging Priority", desc: "Automatically select compostable and artisanal paper packaging.", icon: "eco" },
                  { id: "alerts", label: "Digital Curator Alerts", desc: "Receive immediate signals for secret menu drops.", icon: "notifications_active" }
                ].map(pref => (
                  <div key={pref.id} className="flex items-center justify-between group">
                     <div className="flex items-center gap-8">
                        <div className={`w-14 h-14 rounded-3xl ${prefs[pref.id] ? 'bg-primary/10 text-primary' : 'bg-stone-50 text-stone-300'} flex items-center justify-center transition-all group-hover:scale-110`}><span className="material-symbols-outlined text-2xl">{pref.icon}</span></div>
                        <div className="max-w-md">
                           <p className="text-stone-900 font-black text-lg tracking-tight mb-1">{pref.label}</p>
                           <p className="text-stone-500 text-xs font-medium leading-relaxed">{pref.desc}</p>
                        </div>
                     </div>
                     <button onClick={() => setPrefs(p => ({...p, [pref.id]: !p[pref.id]}))} className={`w-14 h-8 rounded-full border transition-all relative ${prefs[pref.id] ? 'bg-emerald-500 border-emerald-400' : 'bg-stone-100 border-stone-200'}`}><div className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow-md transition-all ${prefs[pref.id] ? 'right-1' : 'left-1'}`} /></button>
                  </div>
                ))}
             </div>
          </div>
        );
      default: return null;
    }
  };

  return (
    <main className="min-h-screen bg-white text-stone-900 pt-28 pb-32 px-6 font-inter relative selection:bg-primary selection:text-white">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 relative z-10">
        <aside className="w-full lg:w-80 shrink-0 lg:sticky lg:top-32 lg:h-[calc(100vh-160px)] overflow-y-auto scrollbar-hide animate-in slide-in-from-left-8 duration-1000">
           <div className="bg-white border border-stone-200 rounded-[48px] p-8 mb-8 text-center lg:text-left shadow-xl group relative overflow-hidden transition-all hover:shadow-primary/5">
              <div className="w-28 h-28 rounded-[40px] overflow-hidden mx-auto lg:mx-0 mb-8 border-2 border-stone-100 group-hover:border-primary transition-all duration-700 shadow-2xl">
                 <img src={user.avatar} alt="Elite Curator" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" />
              </div>
              <h2 className="text-3xl font-black tracking-tighter mb-1 truncate">{user.name}</h2>
              <p className="text-stone-500 text-xs font-black uppercase tracking-widest mb-6 truncate">{user.email}</p>
              <div className="inline-flex items-center px-4 h-7 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[10px] font-black uppercase tracking-[0.2em]">{user.status}</div>
           </div>

           <nav className="bg-white border border-stone-200 rounded-[48px] p-4 shadow-xl">
              <ul className="space-y-3">
                 {[
                   { id: "overview", label: "Dashboard Hub", icon: "grid_view" },
                   { id: "profile", label: "Manage Profile", icon: "person_celebrate" },
                   { id: "orders", label: "My Orders", icon: "local_shipping" },
                   { id: "addresses", label: "Address Vault", icon: "location_on" },
                   { id: "payments", label: "Vault Payments", icon: "account_balance_wallet" },
                   { id: "hearted", label: "Hearted Curation", icon: "favorite" },
                   { id: "membership", label: "Curator Elite", icon: "verified" },
                   { id: "referrals", label: "Invite Program", icon: "celebration" },
                   { id: "preferences", label: "Gourmet Prefs", icon: "tune" }
                 ].map(item => (
                   <li key={item.id}>
                      <Link 
                        to={`/profile/${item.id}`} 
                        className={`w-full h-14 rounded-[24px] flex items-center gap-5 px-6 transition-all group ${activeTab === item.id ? 'bg-primary text-white shadow-2xl shadow-primary/30' : 'text-stone-500 hover:bg-stone-50 hover:text-stone-900'}`}
                      >
                         <span className={`material-symbols-outlined text-2xl transition-all ${activeTab === item.id ? 'text-white' : 'group-hover:text-primary'}`}>{item.icon}</span>
                         <span className="text-[11px] font-black uppercase tracking-[0.15em]">{item.label}</span>
                      </Link>
                   </li>
                 ))}
              </ul>
              <div className="h-px bg-stone-100 my-6 mx-6" />
              <Link 
                to="/arrifoods/control/admin" 
                className="w-full h-14 rounded-[24px] flex items-center gap-5 px-6 text-stone-500 hover:text-primary hover:bg-stone-50 transition-all group mb-2"
              >
                 <span className="material-symbols-outlined text-2xl group-hover:text-primary">security</span>
                 <span className="text-[11px] font-black uppercase tracking-widest">Admin Portal</span>
              </Link>
              <button onClick={() => navigate("/")} className="w-full h-14 rounded-[24px] flex items-center gap-5 px-6 text-stone-300 hover:text-error hover:bg-error/5 transition-all group">
                 <span className="material-symbols-outlined text-2xl">logout</span>
                 <span className="text-[11px] font-black uppercase tracking-widest">Sign Out</span>
              </button>
           </nav>
        </aside>

        <section ref={contentRef} className="flex-1 lg:pt-4">
           <header className="mb-14 flex flex-col md:flex-row md:items-end md:justify-between gap-8 animate-in fade-in slide-in-from-top-4 duration-1000">
              <div>
                 <p className="text-primary text-[10px] font-black uppercase tracking-[0.4em] mb-3">CURATOR HUB V4</p>
                 <h1 className="text-5xl md:text-7xl font-black tracking-tighter capitalize text-stone-900">{activeTab.replace("-", " ")}</h1>
              </div>
           </header>
           <div className="min-h-[600px]">{renderTabContent()}</div>
        </section>
      </div>

      <AddressModal 
        isOpen={addressModal.isOpen}
        initialData={addressModal.data}
        onClose={() => setAddressModal({ isOpen: false, data: null })}
        onSubmit={handleAddressSubmit}
        key={addressModal.data?.id || 'new-address'}
      />
    </main>
  );
};

export default ProfilePage;
