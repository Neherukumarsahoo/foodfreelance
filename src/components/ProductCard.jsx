import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import AnimatedPlusButton from "./AnimatedPlusButton";
import { gsap } from "gsap";

const ProductCard = ({ item, layout = "grid" }) => {
  const navigate = useNavigate();
  const { addToCart, toggleHeart, heartedItems } = useCart();
  const cardRef = useRef(null);
  const innerRef = useRef(null);

  const handleCardClick = () => {
    const slug = (item.title || item.name).toLowerCase().replace(/ /g, "-");
    navigate(`/product/${slug}`);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(item);
  };

  const handleToggleHeart = (e) => {
    e.stopPropagation();
    toggleHeart(item);
  };

  const onMouseMove = (e) => {
    if (!cardRef.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = (clientX - left) / width;
    const y = (clientY - top) / height;
    const rotateX = (y - 0.5) * 20;
    const rotateY = (x - 0.5) * -20;
    
    gsap.to(innerRef.current, {
      rotateX,
      rotateY,
      duration: 0.5,
      ease: "power2.out",
      overwrite: "auto"
    });
  };

  const onMouseLeave = () => {
    gsap.to(innerRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.7,
      ease: "elastic.out(1, 0.5)",
      overwrite: "auto"
    });
  };

  const isHearted = heartedItems.some(h => (h.title || h.name) === (item.title || item.name));

  return (
    <div
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onClick={handleCardClick}
      className={`snap-start perspective-deep ${layout === 'grid' ? 'p-4 -m-4' : ''}`}
    >
      <div 
        ref={innerRef}
        className="bg-surface-container-lowest rounded-[22px] overflow-hidden group shadow-sm hover:shadow-2xl transition-shadow border border-outline/10 cursor-pointer active:scale-[0.98] preserve-3d h-full"
      >
        <div className="relative aspect-[4/3] overflow-hidden preserve-3d">
          <img
            alt={item.title || item.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            src={item.img}
          />
          <div className="absolute top-4 right-4 z-20 tilt-inner">
             <button 
               onClick={handleToggleHeart}
               className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white hover:scale-110 active:scale-95 transition-all group shadow-xl"
             >
                <span className={`material-symbols-outlined text-xl transition-colors ${isHearted ? 'filled text-primary-fixed' : 'group-hover:text-primary-fixed'}`}>favorite</span>
             </button>
          </div>
          {(item.badge || item.discount) && (
            <div
              className={`bg-secondary-container absolute top-4 left-4 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-tighter shadow-lg tilt-inner`}
            >
              {item.badge || item.discount}
            </div>
          )}
          <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end text-white z-10 tilt-inner">
            <div>
              <h3 className="font-headline font-bold text-lg drop-shadow-md leading-none">{item.title || item.name}</h3>
              <div className="flex items-center gap-1 mt-1">
                <span className="material-symbols-outlined filled text-xs text-yellow-400">star</span>
                <span className="text-[10px] font-bold">{item.rating}</span>
              </div>
            </div>
            <span className="font-black text-xl drop-shadow-md">{item.price}</span>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
        <div className="px-4 py-3 flex justify-between items-center bg-white">
          <span className="text-xs text-on-surface-variant font-medium">{item.delivery || item.time}</span>
          <AnimatedPlusButton 
            className="h-10 w-10 shrink-0"
            baseColor="#ff6b00"
            pillColor="#ff6b00"
            textColor="#ffffff"
            hoveredTextColor="#ffffff"
            onClick={handleAddToCart}
          >
            <span className="material-symbols-outlined text-xl">add</span>
          </AnimatedPlusButton>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
