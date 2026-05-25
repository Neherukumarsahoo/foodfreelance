import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { motion } from "framer-motion";

const AdminPage = () => {
  const navigate = useNavigate();
  const { showToast } = useCart();

  // -- Credentials States --
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  // -- Auto Redirect if already authenticated --
  useEffect(() => {
    const auth = sessionStorage.getItem("admin_logged_in");
    if (auth === "true") {
      navigate("/arrifoods/control/admin/dashboard");
    }
  }, [navigate]);

  // -- Handle Authentication submit --
  const handleLogin = (e) => {
    e.preventDefault();
    if (email === "arrifoods@gmail.com" && password === "admin@123") {
      sessionStorage.setItem("admin_logged_in", "true");
      setLoginError("");
      if (showToast) showToast("Admin authenticated successfully", "success");
      navigate("/arrifoods/control/admin/dashboard");
    } else {
      setLoginError("Invalid email or password.");
    }
  };

  return (
    <main className="min-h-screen bg-stone-50 flex items-center justify-center p-4 font-mono text-stone-900 select-none">
      <motion.div 
        initial={{ opacity: 0, y: 15, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md bg-white border border-stone-200 p-8 sm:p-10 rounded-[32px] shadow-xl shadow-stone-200/50"
      >
        <header className="text-center mb-8 border-b border-stone-100 pb-6">
          <div className="w-12 h-12 bg-stone-900 text-white rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="material-symbols-outlined text-xl">security</span>
          </div>
          <h1 className="text-xl font-bold tracking-tight uppercase">Admin Console</h1>
          <p className="text-stone-400 text-[9px] uppercase mt-1">Authenticate control keys</p>
        </header>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <label className="text-[9px] font-bold uppercase text-stone-400 px-2">Email Address</label>
            <input 
              type="email" 
              required
              placeholder="arrifoods@gmail.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-12 bg-stone-50/50 border border-stone-200 rounded-2xl px-5 text-xs text-stone-900 focus:border-stone-900 outline-none transition-all font-mono"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[9px] font-bold uppercase text-stone-400 px-2">Password</label>
            <input 
              type="password" 
              required
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-12 bg-stone-50/50 border border-stone-200 rounded-2xl px-5 text-xs text-stone-900 focus:border-stone-900 outline-none transition-all font-mono"
            />
          </div>

          {loginError && (
            <p className="text-[9px] font-bold uppercase text-red-500 text-center animate-bounce mt-2">{loginError}</p>
          )}

          <button 
            type="submit" 
            className="w-full h-14 bg-stone-900 text-white rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-stone-850 hover:scale-[1.01] active:scale-95 transition-all mt-6 shadow-md shadow-stone-900/10"
          >
            Log In System
          </button>
        </form>

        <div className="mt-6 text-center border-t border-stone-100 pt-4">
          <Link to="/" className="text-stone-400 hover:text-stone-900 text-[10px] uppercase font-bold transition-colors">
            ← Return to Store
          </Link>
        </div>
      </motion.div>
    </main>
  );
};

export default AdminPage;
