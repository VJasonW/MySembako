import React from "react";

export const Badge = ({
  children,
  variant = "neutral",
  size = "sm",
  dot = false,
  className = "",
}) => {
  const baseStyles = "inline-flex items-center font-bold tracking-tight rounded-full";

  const variants = {
    brand: "bg-pink-100/90 text-pink-800 border border-pink-200/60",
    success: "bg-emerald-50 text-emerald-800 border border-emerald-200/60",
    danger: "bg-rose-50 text-rose-800 border border-rose-200/60",
    warning: "bg-amber-50 text-amber-800 border border-amber-200/60",
    info: "bg-sky-50 text-sky-800 border border-sky-200/60",
    neutral: "bg-stone-100 text-stone-700 border border-stone-200/60",
  };

  const dotColors = {
    brand: "bg-pink-500",
    success: "bg-emerald-500",
    danger: "bg-rose-500",
    warning: "bg-amber-500",
    info: "bg-sky-500",
    neutral: "bg-stone-400",
  };

  const sizes = {
    sm: "text-[11px] px-2.5 py-0.5 gap-1.5",
    md: "text-xs px-3 py-1 gap-2",
  };

  return (
    <span
      className={`
        ${baseStyles}
        ${variants[variant] || variants.neutral}
        ${sizes[size] || sizes.sm}
        ${className}
      `}
    >
      {dot && (
        <span
          className={`w-1.5 h-1.5 rounded-full ${
            dotColors[variant] || dotColors.neutral
          }`}
        />
      )}
      {children}
    </span>
  );
};
