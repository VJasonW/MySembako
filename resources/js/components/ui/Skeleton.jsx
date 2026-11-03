import React from "react";

export const Skeleton = ({ className = "", style = {} }) => {
  return (
    <div
      className={`skeleton-shimmer rounded-xl ${className}`}
      style={style}
      aria-hidden="true"
    />
  );
};

export const ProductCardSkeleton = () => {
  return (
    <div className="bg-white border border-stone-200/80 rounded-2xl p-3.5 sm:p-4 flex flex-col justify-between shadow-2xs">
      <Skeleton className="w-full aspect-square rounded-xl mb-3" />
      <div className="space-y-2">
        <Skeleton className="h-3 w-1/3 rounded-md" />
        <Skeleton className="h-4 w-5/6 rounded-md" />
        <Skeleton className="h-4 w-1/2 rounded-md" />
      </div>
      <div className="mt-4 pt-2 border-t border-stone-100 flex items-center justify-between">
        <Skeleton className="h-5 w-24 rounded-md" />
        <Skeleton className="w-8 h-8 rounded-xl" />
      </div>
    </div>
  );
};

export const ProductGridSkeleton = ({ count = 10 }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 sm:gap-5">
      {Array.from({ length: count }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  );
};
