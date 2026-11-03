import React from "react";
import { formatRupiah } from "../../utils/format";

export const PriceTag = ({
  price,
  originalPrice = null,
  size = "md",
  className = "",
}) => {
  const sizes = {
    sm: "text-xs sm:text-sm font-extrabold",
    md: "text-sm sm:text-base font-extrabold",
    lg: "text-lg sm:text-xl font-extrabold",
  };

  return (
    <div className={`flex items-baseline gap-1.5 flex-wrap ${className}`}>
      <span className={`text-pink-600 tracking-tight ${sizes[size] || sizes.md}`}>
        {formatRupiah(price)}
      </span>

      {originalPrice && originalPrice > price && (
        <span className="text-[11px] sm:text-xs text-stone-400 line-through font-medium">
          {formatRupiah(originalPrice)}
        </span>
      )}
    </div>
  );
};
