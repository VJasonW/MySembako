import React from "react";

export const Button = ({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  fullWidth = false,
  icon = null,
  iconPosition = "left",
  className = "",
  type = "button",
  onClick,
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center font-bold rounded-xl transition-all duration-200 select-none active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none cursor-pointer focus-ring";

  const variants = {
    primary:
      "bg-pink-600 hover:bg-pink-700 text-white shadow-sm shadow-pink-600/20 hover:shadow-pink-600/30",
    secondary:
      "bg-stone-100 hover:bg-stone-200 text-stone-800 border border-stone-200/80",
    outline:
      "bg-white hover:bg-pink-50/50 text-stone-800 hover:text-pink-600 border border-stone-300 hover:border-pink-300",
    ghost:
      "bg-transparent hover:bg-stone-100 text-stone-600 hover:text-stone-900",
    danger:
      "bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200/80",
    dark:
      "bg-stone-900 hover:bg-stone-800 text-white shadow-sm",
  };

  const sizes = {
    sm: "text-xs px-3 py-1.5 gap-1.5",
    md: "text-sm px-4 py-2.5 gap-2",
    lg: "text-base px-6 py-3.5 gap-2.5",
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`
        ${baseStyles}
        ${variants[variant] || variants.primary}
        ${sizes[size] || sizes.md}
        ${fullWidth ? "w-full" : ""}
        ${className}
      `}
      {...props}
    >
      {loading ? (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin shrink-0" />
      ) : (
        icon && iconPosition === "left" && <span className="shrink-0">{icon}</span>
      )}

      <span>{children}</span>

      {!loading && icon && iconPosition === "right" && (
        <span className="shrink-0">{icon}</span>
      )}
    </button>
  );
};
