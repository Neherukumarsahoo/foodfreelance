import React, { useEffect, useRef } from "react";
import { useCart } from "../context/CartContext";
import { gsap } from "gsap";

const Toast = () => {
  const { toast } = useCart();
  const toastRef = useRef(null);

  useEffect(() => {
    if (toast.show) {
      gsap.fromTo(toastRef.current, 
        { y: 50, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.7)" }
      );
    } else {
      gsap.to(toastRef.current, { y: 20, opacity: 0, scale: 0.95, duration: 0.3, ease: "power2.in" });
    }
  }, [toast.show]);

  if (!toast.show) return null;

  const bgStyles = {
    primary: "bg-primary text-white shadow-primary/30",
    success: "bg-emerald-500 text-white shadow-emerald-500/30",
    error: "bg-stone-900 text-white shadow-stone-900/30",
  };

  const iconMap = {
    primary: "notifications_active",
    success: "verified",
    error: "error_outline",
  };

  return (
    <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[9999] pointer-events-none">
      <div 
        ref={toastRef}
        className={`flex items-center gap-4 px-6 h-14 rounded-full shadow-2xl backdrop-blur-md border border-white/20 min-w-[280px] ${bgStyles[toast.type] || bgStyles.primary}`}
      >
        <span className="material-symbols-outlined text-xl">{iconMap[toast.type] || iconMap.primary}</span>
        <span className="text-xs font-black uppercase tracking-widest">{toast.message}</span>
      </div>
    </div>
  );
};

export default Toast;
