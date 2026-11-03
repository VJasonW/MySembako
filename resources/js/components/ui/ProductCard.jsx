import React, { useState } from "react";
import { PriceTag } from "./PriceTag";
import { Badge } from "./Badge";
import { useCart } from "../../context/CartContext";

export const ProductCard = ({
  product,
  onClick = () => {},
  className = "",
}) => {
  const { addToCart } = useCart();
  const [adding, setAdding] = useState(false);

  const stock = Number(product.stock) || 0;
  const isOutOfStock = stock <= 0;
  const isLowStock = stock > 0 && stock <= 5;

  const handleQuickAdd = async (e) => {
    e.stopPropagation();
    if (isOutOfStock || adding) return;
    setAdding(true);
    await addToCart(product, 1);
    setAdding(false);
  };

  const storeName = product.store || product.toko || "Warung Mitra";
  const imageSrc =
    product.img ||
    product.image ||
    product.foto ||
    "/icon/Logo_Mysembako.svg";

  return (
    <div
      onClick={() => onClick(product)}
      tabIndex={0}
      role="button"
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick(product);
        }
      }}
      className={`
        group relative bg-white border border-stone-200/90 hover:border-pink-300 rounded-2xl p-3 sm:p-4
        flex flex-col justify-between shadow-2xs hover:shadow-md transition-all duration-200 cursor-pointer
        active:scale-[0.99] focus-ring ${className}
      `}
    >
      <div>
        {/* Product Image Area */}
        <div className="relative w-full aspect-square rounded-xl bg-stone-50 border border-stone-100/80 flex items-center justify-center p-3 mb-3 overflow-hidden">
          <img
            src={imageSrc}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
            onError={(e) => {
              e.currentTarget.src = "/icon/Logo_Mysembako.svg";
            }}
          />

          {/* Scarcity / Out of stock indicator */}
          {isOutOfStock ? (
            <Badge
              variant="danger"
              size="sm"
              className="absolute top-2 right-2 shadow-xs"
            >
              Habis
            </Badge>
          ) : isLowStock ? (
            <Badge
              variant="warning"
              size="sm"
              dot
              className="absolute top-2 right-2 shadow-xs"
            >
              Sisa {stock}
            </Badge>
          ) : null}
        </div>

        {/* Store Name */}
        <div className="flex items-center gap-1.5 text-[11px] font-medium text-stone-500 mb-1">
          <svg
            className="w-3 h-3 text-stone-400 shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
            />
          </svg>
          <span className="truncate">{storeName}</span>
        </div>

        {/* Product Title */}
        <h4 className="font-bold text-stone-900 text-xs sm:text-sm line-clamp-2 leading-snug group-hover:text-pink-600 transition-colors">
          {product.name}
        </h4>
      </div>

      {/* Footer: Price & Quick CTA */}
      <div className="mt-3.5 pt-2 border-t border-stone-100 flex items-center justify-between gap-2">
        <PriceTag price={product.price || product.harga} size="sm" />

        <button
          type="button"
          disabled={isOutOfStock || adding}
          onClick={handleQuickAdd}
          aria-label={`Tambah ${product.name} ke keranjang`}
          className={`
            w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-200 shrink-0 font-bold focus-ring active:scale-90
            ${
              isOutOfStock
                ? "bg-stone-100 text-stone-300 cursor-not-allowed"
                : "bg-pink-50 text-pink-600 hover:bg-pink-600 hover:text-white group-hover:bg-pink-600 group-hover:text-white"
            }
          `}
        >
          {adding ? (
            <span className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
          ) : (
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
};
