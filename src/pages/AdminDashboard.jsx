import React, { useState, useMemo, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { PRODUCTS, saveProducts } from "../data/products";
import { motion, AnimatePresence } from "framer-motion";
import { 
  TrendingUp, ShoppingBag, Plus, Trash2, Edit, Check, Search, 
  Users, Ticket, PlusCircle, LogOut, MapPin, DollarSign, Package, CheckCircle2, ChevronRight, X
} from "lucide-react";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { orders, updateOrderStatus, showToast } = useCart();

  // -- Security Protection check on Mount --
  useEffect(() => {
    const auth = sessionStorage.getItem("admin_logged_in");
    if (auth !== "true") {
      if (showToast) showToast("Access Denied. Please authenticate.", "error");
      navigate("/arrifoods/control/admin");
    }
  }, [navigate, showToast]);

  // -- Tab state --
  const [activeTab, setActiveTab] = useState("dashboard");

  // -- Catalog Manager State --
  const [catalog, setCatalog] = useState([...PRODUCTS]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddDrawerOpen, setIsAddDrawerOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    title: "",
    img: "",
    price: "",
    badge: "",
    badgeColor: "bg-stone-100 text-stone-900 border border-stone-200",
    rating: "4.8",
    delivery: "15-20 Mins Delivery",
    category: "Specials",
    trending: false,
    veg: false,
    description: ""
  });

  // -- Coupon State --
  const [coupons, setCoupons] = useState(() => {
    const saved = localStorage.getItem("curator_coupons");
    return saved ? JSON.parse(saved) : [];
  });

  const [newCoupon, setNewCoupon] = useState({
    code: "",
    discount: "",
    type: "flat",
    minOrder: "",
    active: true
  });

  // Save coupons
  useEffect(() => {
    localStorage.setItem("curator_coupons", JSON.stringify(coupons));
  }, [coupons]);

  // -- Order Drawer State --
  const [selectedOrder, setSelectedOrder] = useState(null);

  // -- Handle Logout --
  const handleLogout = () => {
    sessionStorage.removeItem("admin_logged_in");
    if (showToast) showToast("Admin logged out", "error");
    navigate("/arrifoods/control/admin");
  };

  // -- Catalog Functions --
  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!newProduct.title || !newProduct.price || !newProduct.img) {
      if (showToast) showToast("Please fill in required fields", "error");
      return;
    }

    const priceFormatted = newProduct.price.startsWith("₹") ? newProduct.price : `₹${newProduct.price}`;
    const generatedId = newProduct.title.toLowerCase().replace(/ /g, "-");

    const createdProduct = {
      ...newProduct,
      id: generatedId,
      price: priceFormatted,
      rating: newProduct.rating || "4.8",
      delivery: newProduct.delivery || "15-20 Mins Delivery"
    };

    const updatedCatalog = [createdProduct, ...catalog];
    setCatalog(updatedCatalog);
    saveProducts(updatedCatalog); // Save dynamically to localStorage

    // Reset Form
    setNewProduct({
      title: "",
      img: "",
      price: "",
      badge: "",
      badgeColor: "bg-stone-100 text-stone-900 border border-stone-200",
      rating: "4.8",
      delivery: "15-20 Mins Delivery",
      category: "Specials",
      trending: false,
      veg: false,
      description: ""
    });
    setIsAddDrawerOpen(false);
    if (showToast) showToast(`"${createdProduct.title}" added to menu catalog`, "success");
  };

  const handleDeleteProduct = (productId) => {
    const updatedCatalog = catalog.filter(p => p.id !== productId);
    setCatalog(updatedCatalog);
    saveProducts(updatedCatalog);
    if (showToast) showToast("Product removed from catalog", "error");
  };

  const handleToggleTrending = (productId) => {
    const updatedCatalog = catalog.map(p => {
      if (p.id === productId) {
        return { ...p, trending: !p.trending };
      }
      return p;
    });
    setCatalog(updatedCatalog);
    saveProducts(updatedCatalog);
  };

  // -- Coupon Functions --
  const handleAddCoupon = (e) => {
    e.preventDefault();
    if (!newCoupon.code || !newCoupon.discount) {
      if (showToast) showToast("Please fill in code and discount", "error");
      return;
    }
    const discountVal = parseFloat(newCoupon.discount);
    const minOrderVal = parseFloat(newCoupon.minOrder) || 0;
    const codeUpper = newCoupon.code.toUpperCase();

    const createdCoupon = {
      code: codeUpper,
      discount: discountVal,
      type: newCoupon.type,
      minOrder: minOrderVal,
      active: true
    };

    setCoupons([createdCoupon, ...coupons]);
    setNewCoupon({ code: "", discount: "", type: "flat", minOrder: "", active: true });
    if (showToast) showToast(`Promo code "${codeUpper}" created successfully!`, "success");
  };

  const handleDeleteCoupon = (code) => {
    setCoupons(coupons.filter(c => c.code !== code));
    if (showToast) showToast("Coupon deleted", "error");
  };

  // -- Statistics Calculation --
  const stats = useMemo(() => {
    const totalOrders = orders.length;
    const completedOrders = orders.filter(o => o.status === "Delivered");
    
    // Revenue Parse
    const revenue = orders.reduce((acc, curr) => {
      if (curr.status === "Cancelled") return acc;
      const num = parseFloat(curr.total.replace(/[^\d.-]/g, "")) || 0;
      return acc + num;
    }, 0);

    const averageOrderVal = totalOrders > 0 ? Math.round(revenue / totalOrders) : 0;
    
    return {
      revenue,
      totalOrders,
      averageOrderVal,
      completedOrdersCount: completedOrders.length,
      activeCoupons: coupons.filter(c => c.active).length,
      catalogSize: catalog.length
    };
  }, [orders, coupons, catalog]);

  // -- Filtered Catalog for display --
  const filteredCatalog = useMemo(() => {
    if (!searchQuery) return catalog;
    const q = searchQuery.toLowerCase();
    return catalog.filter(p => 
      (p.title || "").toLowerCase().includes(q) || 
      (p.category || "").toLowerCase().includes(q)
    );
  }, [catalog, searchQuery]);

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 pt-6 pb-16 font-mono flex flex-col lg:flex-row gap-6 relative select-none">
      
      {/* Sidebar Navigation - Adaptive Scrolling Layout for Mobile */}
      <aside className="w-full lg:w-72 shrink-0 px-4 lg:pl-8 lg:pr-2 lg:sticky lg:top-8 lg:h-[calc(100vh-60px)] overflow-y-auto">
        <div className="bg-white border border-stone-200 p-6 rounded-[28px] shadow-sm mb-4 hidden lg:flex flex-col items-start relative overflow-hidden">
          <div className="w-11 h-11 bg-stone-900 rounded-xl flex items-center justify-center text-white shrink-0 mb-4">
            <span className="material-symbols-outlined text-xl">security</span>
          </div>
          <div>
            <h2 className="text-sm font-bold tracking-tight uppercase">ArriFoods</h2>
            <p className="text-stone-400 text-[8px] uppercase tracking-wider">Vault Control</p>
          </div>
        </div>

        <nav className="bg-white border border-stone-200 p-2 sm:p-3 rounded-[28px] shadow-sm overflow-x-auto scrollbar-hide">
          <ul className="flex flex-row lg:flex-col gap-1 lg:gap-1.5 overflow-x-auto lg:overflow-x-visible scrollbar-hide shrink-0">
            {[
              { id: "dashboard", label: "Dashboard", icon: "space_dashboard" },
              { id: "catalog", label: "Catalog", icon: "restaurant_menu" },
              { id: "orders", label: "Orders", icon: "local_shipping", count: orders.filter(o => o.status === "Preparing" || o.status === "Out for Delivery").length },
              { id: "coupons", label: "Promo Codes", icon: "sell" }
            ].map(tab => (
              <li key={tab.id} className="shrink-0 lg:w-full">
                <button 
                  onClick={() => setActiveTab(tab.id)}
                  className={`h-11 rounded-2xl flex items-center justify-between px-5 transition-all group font-mono text-[10px] uppercase font-bold shrink-0 ${
                    activeTab === tab.id ? 'bg-stone-900 text-white shadow-md' : 'text-stone-400 hover:bg-stone-50 hover:text-stone-900'
                  }`}
                >
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="material-symbols-outlined text-lg">{tab.icon}</span>
                    <span className="shrink-0">{tab.label}</span>
                  </div>
                  {tab.count > 0 && (
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-black ml-3 ${
                      activeTab === tab.id ? 'bg-white text-stone-900' : 'bg-stone-900 text-white'
                    }`}>{tab.count}</span>
                  )}
                </button>
              </li>
            ))}
            <li className="shrink-0 lg:w-full lg:mt-4 lg:pt-3 lg:border-t lg:border-stone-100">
              <button 
                onClick={handleLogout}
                className="h-11 rounded-2xl flex items-center gap-3 px-5 text-stone-300 hover:text-red-500 hover:bg-red-50 transition-all font-mono text-[10px] uppercase font-bold shrink-0"
              >
                <span className="material-symbols-outlined text-lg">logout</span>
                <span>Log Out</span>
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Panel Content Area */}
      <main className="flex-1 px-4 lg:pr-8 lg:pl-2">
        
        {/* TAB 1: DASHBOARD HUB */}
        {activeTab === "dashboard" && (
          <motion.div 
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <header className="border-b border-stone-200 pb-4 flex justify-between items-end">
              <div>
                <p className="text-stone-400 text-[8px] uppercase tracking-wider mb-1">Metrics Signals</p>
                <h1 className="text-2xl font-bold tracking-tight uppercase">Dashboard</h1>
              </div>
            </header>

            {/* KPI Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: "Vault Revenue", val: `₹${stats.revenue.toLocaleString()}`, sub: "Excludes cancelled", icon: "payments" },
                { label: "Total Orders", val: stats.totalOrders, sub: `${stats.completedOrdersCount} delivered`, icon: "local_shipping" },
                { label: "Tray Average", val: `₹${stats.averageOrderVal.toLocaleString()}`, sub: "Average cart size", icon: "point_of_sale" },
                { label: "Catalog Size", val: stats.catalogSize, sub: `${catalog.filter(p => p.trending).length} items trending`, icon: "restaurant" }
              ].map((kpi, idx) => (
                <div key={idx} className="bg-white border border-stone-200 p-5 rounded-[24px] shadow-sm flex items-center gap-4 hover:scale-[1.02] transition-all">
                  <div className="w-10 h-10 bg-stone-50 rounded-xl flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-xl text-stone-500">{kpi.icon}</span>
                  </div>
                  <div>
                    <p className="text-stone-400 text-[8px] uppercase tracking-wider mb-0.5">{kpi.label}</p>
                    <p className="text-xl font-bold text-stone-900">{kpi.val}</p>
                    <p className="text-stone-400 text-[8px] leading-none mt-0.5">{kpi.sub}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* B&W Curved Charts Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Revenue Trend SVG Curved Line Chart */}
              <div className="lg:col-span-2 bg-white border border-stone-200 rounded-[28px] p-6 shadow-sm flex flex-col justify-between min-h-[320px]">
                <div className="mb-4">
                  <p className="text-stone-400 text-[8px] uppercase tracking-wider mb-0.5">Weekly Revenue Analytics</p>
                  <h3 className="text-sm font-bold text-stone-900 uppercase">Revenue Signals</h3>
                </div>

                {/* SVG Curve Chart Container */}
                <div className="flex-1 w-full relative min-h-[140px] max-h-[160px]">
                  <svg className="w-full h-full" viewBox="0 0 500 150" preserveAspectRatio="none">
                    {/* Grid lines */}
                    <line x1="0" y1="20" x2="500" y2="20" stroke="#e7e5e4" strokeWidth="0.5" />
                    <line x1="0" y1="75" x2="500" y2="75" stroke="#e7e5e4" strokeWidth="0.5" />
                    <line x1="0" y1="130" x2="500" y2="130" stroke="#e7e5e4" strokeWidth="0.5" />
                    {/* Stroke line */}
                    <path 
                      d="M0 130 C 50 110, 100 120, 150 90 C 200 60, 250 70, 300 40 C 350 10, 400 30, 450 15 C 475 5, 500 20, 500 20" 
                      fill="none" 
                      stroke="#1c1917" 
                      strokeWidth="2" 
                      strokeLinecap="round"
                    />
                    {/* Nodes points */}
                    <circle cx="150" cy="90" r="4.5" fill="#1c1917" stroke="#ffffff" strokeWidth="1.5" />
                    <circle cx="300" cy="40" r="4.5" fill="#1c1917" stroke="#ffffff" strokeWidth="1.5" />
                    <circle cx="450" cy="15" r="4.5" fill="#1c1917" stroke="#ffffff" strokeWidth="1.5" />
                  </svg>
                </div>

                <div className="flex justify-between items-center text-[8px] text-stone-400 uppercase mt-4">
                  <span>Mon</span>
                  <span>Tue</span>
                  <span>Wed</span>
                  <span>Thu</span>
                  <span>Fri</span>
                  <span>Sat</span>
                  <span>Sun</span>
                </div>
              </div>

              {/* Category Inventory Pie chart */}
              <div className="bg-white border border-stone-200 rounded-[28px] p-6 shadow-sm flex flex-col justify-between min-h-[320px]">
                <div>
                  <p className="text-stone-400 text-[8px] uppercase tracking-wider mb-0.5">Allocation</p>
                  <h3 className="text-sm font-bold text-stone-900 uppercase">Catalog Spreads</h3>
                </div>

                {/* SVG Circle Doughnut */}
                <div className="relative flex items-center justify-center my-4">
                  <svg width="110" height="110" viewBox="0 0 42 42" className="transform -rotate-90">
                    <circle cx="21" cy="21" r="15.915" fill="none" stroke="#e7e5e4" strokeWidth="3" />
                    {/* Specials - 40% */}
                    <circle cx="21" cy="21" r="15.915" fill="none" stroke="#1c1917" strokeWidth="3" strokeDasharray="40 60" strokeDashoffset="0" />
                    {/* Other - 60% */}
                    <circle cx="21" cy="21" r="15.915" fill="none" stroke="#78716c" strokeWidth="3" strokeDasharray="60 40" strokeDashoffset="-40" />
                  </svg>
                  <div className="absolute flex flex-col items-center">
                    <span className="text-lg font-bold text-stone-900">{catalog.length}</span>
                    <span className="text-[7px] text-stone-400 uppercase font-bold">Items</span>
                  </div>
                </div>

                <div className="space-y-1 text-[8px] text-stone-500 font-bold uppercase">
                  <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 bg-[#1c1917] rounded-sm" />Specials / Trending</div>
                  <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 bg-[#78716c] rounded-sm" />Standard Options</div>
                </div>
              </div>

            </div>
          </motion.div>
        )}

        {/* TAB 2: CATALOG MANAGER */}
        {activeTab === "catalog" && (
          <motion.div 
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <header className="border-b border-stone-200 pb-4">
              <p className="text-stone-400 text-[8px] uppercase tracking-wider mb-1">Assets database</p>
              <h1 className="text-2xl font-bold tracking-tight uppercase">Menu Catalog</h1>
            </header>

            {/* Filters Bar */}
            <div className="bg-white border border-stone-200 p-4 rounded-[24px] flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
              <div className="w-full md:w-80 relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" size={14} />
                <input 
                  type="text" 
                  placeholder="Filter catalog masterpieces..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-10 bg-stone-50 rounded-2xl pl-10 pr-4 text-xs border border-stone-200 outline-none focus:border-stone-500 focus:bg-white font-mono"
                />
              </div>
              <p className="text-stone-400 text-[8px] uppercase tracking-wider">{filteredCatalog.length} Listings Active</p>
            </div>

            {/* Catalog Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence mode="popLayout">
                {filteredCatalog.map(p => (
                  <motion.div 
                    layout
                    key={p.id}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.92 }}
                    className="bg-white border border-stone-200 rounded-[28px] overflow-hidden shadow-sm flex flex-col justify-between"
                  >
                    <div className="relative aspect-[1.6/1] overflow-hidden bg-stone-100">
                      <img src={p.img} alt={p.title} className="w-full h-full object-cover" />
                      <div className="absolute top-3 left-3 flex gap-1">
                        {p.badge && <span className="bg-stone-900 text-white text-[8px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">{p.badge}</span>}
                        {p.veg && <span className="bg-white text-stone-900 border border-stone-200 text-[8px] font-bold uppercase px-2 py-0.5 rounded-full">VEG</span>}
                      </div>
                      <button 
                        onClick={() => handleDeleteProduct(p.id)}
                        className="absolute top-3 right-3 w-9 h-9 bg-white border border-stone-200 hover:bg-stone-900 hover:text-white rounded-full flex items-center justify-center text-stone-600 transition-colors"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>

                    <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-baseline mb-1">
                          <h4 className="text-xs font-bold text-stone-900 uppercase tracking-tight line-clamp-1">{p.title}</h4>
                          <span className="text-xs font-bold text-stone-900 shrink-0">{p.price}</span>
                        </div>
                        <p className="text-stone-400 text-[8px] uppercase tracking-widest mb-2">{p.category}</p>
                      </div>

                      <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-[8px] text-stone-500 font-bold">
                        <span>Rating: {p.rating}</span>
                        
                        <label className="flex items-center gap-2 cursor-pointer">
                          <span className="text-stone-400 text-[7px] uppercase font-bold">Trending</span>
                          <button 
                            onClick={() => handleToggleTrending(p.id)}
                            className={`w-9 h-5.5 rounded-full border transition-all relative ${p.trending ? 'bg-stone-900 border-stone-900' : 'bg-stone-50 border-stone-200'}`}
                          >
                            <div className={`absolute top-0.5 w-3.5 h-3.5 rounded-full bg-stone-900 transition-all ${p.trending ? 'right-0.5 bg-white' : 'left-0.5'}`} />
                          </button>
                        </label>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>


          </motion.div>
        )}

        {/* TAB 3: ORDERS DISPATCH PIPELINE */}
        {activeTab === "orders" && (
          <motion.div 
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <header className="border-b border-stone-200 pb-4">
              <h1 className="text-2xl font-bold tracking-tight uppercase">Orders Dispatch Queue</h1>
            </header>

            <div className="space-y-3">
              {orders.length === 0 ? (
                <div className="text-center py-16 bg-white border border-stone-200 rounded-[28px] shadow-sm">
                  <h4 className="text-sm font-bold text-stone-900 uppercase mb-1">Queue Empty</h4>
                  <p className="text-stone-400 text-[9px] uppercase">Awaiting dynamic dispatcher signals.</p>
                </div>
              ) : (
                orders.map(order => (
                  <div 
                    key={order.id} 
                    onClick={() => setSelectedOrder(order)}
                    className="bg-white border border-stone-200 p-5 rounded-[24px] shadow-sm hover:border-stone-900 cursor-pointer transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h4 className="font-bold text-sm text-stone-900 uppercase">{order.id}</h4>
                        <span className="text-[8px] font-bold uppercase border border-stone-200 px-2 py-0.5 rounded-full text-stone-700 bg-stone-50">{order.status}</span>
                      </div>
                      <p className="text-stone-400 text-[8px] uppercase mb-1">Placed: {order.date}</p>
                      <p className="text-stone-600 text-xs line-clamp-1">{order.items}</p>
                    </div>

                    <div className="flex items-center justify-between md:justify-end gap-6 border-t md:border-t-0 pt-3 md:pt-0 border-stone-100">
                      <div className="text-left md:text-right">
                        <p className="text-sm font-bold text-stone-900">{order.total}</p>
                        <p className="text-stone-400 text-[7px] uppercase font-bold">Total Payable</p>
                      </div>
                      
                      <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                        {order.status === "Preparing" && (
                          <button 
                            onClick={() => {
                              updateOrderStatus(order.id, "Out for Delivery");
                              if (showToast) showToast(`Dispatched ${order.id}!`, "success");
                            }}
                            className="h-9 px-4 bg-stone-900 text-white rounded-xl text-[8px] font-bold uppercase tracking-wider hover:bg-stone-850"
                          >
                            Dispatch
                          </button>
                        )}
                        {order.status === "Out for Delivery" && (
                          <button 
                            onClick={() => {
                              updateOrderStatus(order.id, "Delivered");
                              if (showToast) showToast(`Delivered ${order.id}!`, "success");
                            }}
                            className="h-9 px-4 bg-stone-100 border border-stone-300 text-stone-900 rounded-xl text-[8px] font-bold uppercase tracking-wider hover:bg-stone-200"
                          >
                            Delivered
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* B&W Flat Order Detail Modal */}
            <AnimatePresence>
              {selectedOrder && (
                <div className="fixed inset-0 bg-stone-900/40 z-50 flex items-center justify-end">
                  <motion.div 
                    initial={{ x: "100%" }}
                    animate={{ x: 0 }}
                    exit={{ x: "100%" }}
                    transition={{ type: "tween", duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full max-w-md h-full bg-white border-l border-stone-200 p-6 sm:p-8 shadow-xl flex flex-col justify-between font-mono"
                  >
                    <div>
                      <header className="flex justify-between items-start mb-6 border-b border-stone-200 pb-4">
                        <div>
                          <p className="text-stone-400 text-[8px] uppercase tracking-wider">Receipt Envelope</p>
                          <h3 className="text-lg font-bold text-stone-900 uppercase">{selectedOrder.id}</h3>
                        </div>
                        <button 
                          onClick={() => setSelectedOrder(null)}
                          className="w-9 h-9 bg-stone-50 border border-stone-200 rounded-full flex items-center justify-center text-stone-400 hover:text-stone-900"
                        >
                          <X size={16} />
                        </button>
                      </header>

                      {/* Items list */}
                      <section className="space-y-4 mb-6">
                        <h4 className="text-[9px] font-bold uppercase text-stone-400 border-b border-stone-100 pb-1">Tray Contents</h4>
                        <div className="space-y-2">
                          {selectedOrder.orderDetails ? (
                            selectedOrder.orderDetails.map(item => (
                              <div key={item.title} className="flex justify-between items-center text-xs">
                                <span className="text-stone-600">{item.quantity}x {item.title || item.name}</span>
                                <span className="font-bold text-stone-900">{item.price}</span>
                              </div>
                            ))
                          ) : (
                            <div className="text-xs text-stone-600">{selectedOrder.items}</div>
                          )}
                          <div className="flex justify-between items-center text-xs font-bold border-t border-stone-100 pt-3">
                            <span>TOTAL PAID</span>
                            <span className="text-stone-950">{selectedOrder.total}</span>
                          </div>
                        </div>
                      </section>

                      {/* Delivery Address */}
                      <section className="space-y-2 mb-6">
                        <h4 className="text-[9px] font-bold uppercase text-stone-400 border-b border-stone-100 pb-1">Coordinates</h4>
                        {selectedOrder.address ? (
                          <div className="space-y-1">
                            <p className="text-xs font-bold text-stone-900">{selectedOrder.address.label} Location</p>
                            <p className="text-xs text-stone-500 leading-relaxed">{selectedOrder.address.address}</p>
                            {selectedOrder.address.phone && <p className="text-xs font-bold text-stone-900">Phone: {selectedOrder.address.phone}</p>}
                          </div>
                        ) : (
                          <p className="text-xs text-stone-500">Manual counter pick-up</p>
                        )}
                      </section>
                    </div>

                    {/* Dispatch Stepper */}
                    <div className="space-y-3 pt-4 border-t border-stone-200">
                      <p className="text-[8px] font-bold uppercase text-stone-400 text-center">Pipeline Dispatch Actions</p>
                      
                      <div className="grid grid-cols-2 gap-2">
                        <button 
                          onClick={() => {
                            updateOrderStatus(selectedOrder.id, "Preparing");
                            setSelectedOrder(prev => ({ ...prev, status: "Preparing", icon: "skillet" }));
                          }}
                          className={`h-11 rounded-2xl text-[8px] font-bold uppercase border transition-all ${
                            selectedOrder.status === 'Preparing' ? 'bg-stone-900 border-stone-900 text-white' : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                          }`}
                        >
                          Preparing
                        </button>
                        
                        <button 
                          onClick={() => {
                            updateOrderStatus(selectedOrder.id, "Out for Delivery");
                            setSelectedOrder(prev => ({ ...prev, status: "Out for Delivery", icon: "local_shipping" }));
                          }}
                          className={`h-11 rounded-2xl text-[8px] font-bold uppercase border transition-all ${
                            selectedOrder.status === 'Out for Delivery' ? 'bg-stone-900 border-stone-900 text-white' : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                          }`}
                        >
                          Delivery
                        </button>

                        <button 
                          onClick={() => {
                            updateOrderStatus(selectedOrder.id, "Delivered");
                            setSelectedOrder(prev => ({ ...prev, status: "Delivered", icon: "check_circle" }));
                          }}
                          className={`h-11 rounded-2xl text-[8px] font-bold uppercase border transition-all ${
                            selectedOrder.status === 'Delivered' ? 'bg-stone-900 border-stone-900 text-white' : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                          }`}
                        >
                          Completed
                        </button>

                        <button 
                          onClick={() => {
                            updateOrderStatus(selectedOrder.id, "Cancelled");
                            setSelectedOrder(prev => ({ ...prev, status: "Cancelled", icon: "cancel" }));
                          }}
                          className={`h-11 rounded-2xl text-[8px] font-bold uppercase border transition-all ${
                            selectedOrder.status === 'Cancelled' ? 'bg-stone-900 border-stone-900 text-white' : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                          }`}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {/* TAB 4: PROMO VAULT */}
        {activeTab === "coupons" && (
          <motion.div 
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <header className="border-b border-stone-200 pb-4">
              <h1 className="text-2xl font-bold tracking-tight uppercase">Promo vault</h1>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr,320px] gap-6 items-start">
              
              {/* Coupons List */}
              <div className="space-y-3">
                <h3 className="text-[9px] font-bold uppercase text-stone-400 px-1">Active Coupons</h3>
                
                {coupons.map((c, i) => (
                  <div key={i} className="bg-white border border-stone-200 p-4 rounded-[24px] shadow-sm flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-stone-900 uppercase font-mono">{c.code}</h4>
                      <p className="text-stone-500 text-[9px] font-semibold uppercase mt-0.5">
                        Discount: {c.type === 'flat' ? `₹${c.discount}` : `${c.discount}%`} • Min order: ₹{c.minOrder}
                      </p>
                    </div>

                    <button 
                      onClick={() => handleDeleteCoupon(c.code)}
                      className="w-9 h-9 bg-stone-50 hover:bg-stone-900 hover:text-white text-stone-400 border border-stone-200 rounded-full flex items-center justify-center transition-all"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                ))}
              </div>

              {/* Create Promo Coupon */}
              <aside className="bg-white border border-stone-200 p-6 rounded-[28px] shadow-sm">
                <h3 className="text-xs font-bold text-stone-900 uppercase tracking-tight mb-4 border-b border-stone-200 pb-2">Construct Promo</h3>
                
                <form onSubmit={handleAddCoupon} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold uppercase text-stone-400 px-2">Promo Code *</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. WELCOME100" 
                      value={newCoupon.code}
                      onChange={(e) => setNewCoupon({...newCoupon, code: e.target.value})}
                      className="w-full h-11 bg-white border border-stone-200 rounded-2xl px-4 text-xs outline-none focus:border-stone-900 uppercase tracking-widest font-mono"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <label className="text-[9px] font-bold uppercase text-stone-400 px-2">Discount *</label>
                      <input 
                        type="number" 
                        required
                        placeholder="100" 
                        value={newCoupon.discount}
                        onChange={(e) => setNewCoupon({...newCoupon, discount: e.target.value})}
                        className="w-full h-11 bg-white border border-stone-200 rounded-2xl px-4 text-xs outline-none focus:border-stone-900 font-mono"
                      />
                    </div>
                    
                    <div className="space-y-1">
                      <label className="text-[9px] font-bold uppercase text-stone-400 px-2">Type</label>
                      <select 
                        value={newCoupon.type}
                        onChange={(e) => setNewCoupon({...newCoupon, type: e.target.value})}
                        className="w-full h-11 bg-white border border-stone-200 rounded-2xl px-1 text-xs outline-none cursor-pointer font-mono"
                      >
                        <option value="flat">Flat ₹</option>
                        <option value="percent">Percentage %</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] font-bold uppercase text-stone-400 px-2">Min Order Required</label>
                    <input 
                      type="number" 
                      placeholder="e.g. 500" 
                      value={newCoupon.minOrder}
                      onChange={(e) => setNewCoupon({...newCoupon, minOrder: e.target.value})}
                      className="w-full h-11 bg-white border border-stone-200 rounded-2xl px-4 text-xs outline-none focus:border-stone-900 font-mono"
                    />
                  </div>

                  <button 
                    type="submit" 
                    className="w-full h-12 bg-stone-900 text-white rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-stone-850 active:scale-95 transition-all mt-3"
                  >
                    Forge Protocol
                  </button>
                </form>
              </aside>

            </div>
          </motion.div>
        )}

      </main>
    </div>
  );
};

export default AdminDashboard;
