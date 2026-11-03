import React, { useEffect, useCallback } from "react";
import { createPortal } from "react-dom";

export const Modal = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  maxWidth = "md",
  className = "",
}) => {
  // Handle ESC key
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen || typeof document === "undefined") return null;

  const maxWidths = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
  };

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? "modal-title" : undefined}
      className="fixed inset-0 z-[9999] bg-stone-950/40 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className={`w-full ${
          maxWidths[maxWidth] || maxWidths.md
        } bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl border border-stone-200/90 overflow-hidden flex flex-col max-h-[90vh] sm:max-h-[85vh] animate-drawer sm:animate-scaleIn ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        {(title || onClose) && (
          <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-stone-100 shrink-0">
            <div>
              {title && (
                <h3
                  id="modal-title"
                  className="text-base sm:text-lg font-extrabold text-stone-900 tracking-tight"
                >
                  {title}
                </h3>
              )}
              {description && (
                <p className="text-xs text-stone-500 mt-0.5">{description}</p>
              )}
            </div>

            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-500 hover:text-stone-800 flex items-center justify-center text-lg font-bold transition focus-ring"
              aria-label="Tutup"
            >
              &times;
            </button>
          </div>
        )}

        {/* Content */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1">{children}</div>
      </div>
    </div>,
    document.body
  );
};
