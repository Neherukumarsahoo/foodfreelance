import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ProductSkeleton } from "./Skeleton";
import ProductCard from "./ProductCard";

const ProductCarousel = ({ title, items }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="py-10 md:py-14">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="flex items-center justify-between gap-4 mb-6">
          <h2 className="font-headline text-3xl md:text-4xl font-extrabold text-on-surface">{title}</h2>
          <div 
            onClick={() => navigate("/categories")}
            className="hidden md:flex items-center gap-2 text-sm font-semibold text-primary cursor-pointer hover:underline"
          >
            View all
            <span className="material-symbols-outlined">chevron_right</span>
          </div>
        </div>
        <div className="grid grid-flow-col auto-cols-[78%] xs:auto-cols-[65%] sm:auto-cols-[48%] md:auto-cols-[32%] lg:auto-cols-[24%] xl:auto-cols-[23%] gap-5 overflow-x-auto pb-6 scrollbar-hide snap-x snap-mandatory px-4 -mx-4">
          {loading ? (
             Array(4).fill(0).map((_, i) => <ProductSkeleton key={i} />)
          ) : (
            items.map((item) => (
              <ProductCard 
                key={item.title || item.name}
                item={item}
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductCarousel;
