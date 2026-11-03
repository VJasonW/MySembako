import React from "react";
import { Button } from "./Button";

export const EmptyState = ({
  icon = null,
  title = "Tidak ada data",
  description = "Belum ada item yang dapat ditampilkan saat ini.",
  actionLabel = null,
  onAction = null,
  className = "",
}) => {
  return (
    <div
      className={`bg-white rounded-3xl border border-stone-200/80 p-8 sm:p-12 text-center flex flex-col items-center justify-center max-w-lg mx-auto ${className}`}
    >
      <div className="w-16 h-16 rounded-2xl bg-pink-50 border border-pink-100 flex items-center justify-center text-pink-600 mb-4 shadow-2xs">
        {icon || (
          <svg
            className="w-8 h-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1.8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
            />
          </svg>
        )}
      </div>

      <h3 className="text-base sm:text-lg font-extrabold text-stone-900 mb-1.5 tracking-tight">
        {title}
      </h3>

      <p className="text-xs sm:text-sm text-stone-500 max-w-sm mb-6 leading-relaxed">
        {description}
      </p>

      {actionLabel && onAction && (
        <Button onClick={onAction} variant="primary" size="md">
          {actionLabel}
        </Button>
      )}
    </div>
  );
};
