import React from "react";

const Skeleton = ({ className }) => (
  <div className={`skeleton rounded-md ${className}`} />
);

export const ProductSkeleton = () => (
  <div className="snap-start bg-white rounded-[22px] overflow-hidden shadow-sm border border-stone-100 flex flex-col min-w-[280px]">
    <div className="relative aspect-[4/3] overflow-hidden skeleton" />
    <div className="px-4 py-3 flex justify-between items-center bg-white">
      <div className="space-y-2 flex-1 mr-4">
        <Skeleton className="h-3 w-3/4 rounded-full" />
        <Skeleton className="h-2 w-1/2 rounded-full opacity-60" />
      </div>
      <Skeleton className="h-10 w-10 rounded-full shrink-0" />
    </div>
  </div>
);

export default Skeleton;
