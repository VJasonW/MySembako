import React from "react";

export const Checkbox = ({
  checked = false,
  onChange = () => {},
  label = null,
  disabled = false,
  id,
  className = "",
}) => {
  return (
    <label
      htmlFor={id}
      className={`inline-flex items-center gap-2.5 cursor-pointer select-none ${
        disabled ? "opacity-50 pointer-events-none" : ""
      } ${className}`}
    >
      <div className="relative flex items-center justify-center">
        <input
          type="checkbox"
          id={id}
          checked={checked}
          disabled={disabled}
          onChange={(e) => onChange(e.target.checked, e)}
          className="sr-only peer"
        />
        <div
          className={`
            w-5 h-5 rounded-lg border-2 transition-all duration-200 flex items-center justify-center
            peer-focus-visible:ring-2 peer-focus-visible:ring-pink-500 peer-focus-visible:ring-offset-2
            ${
              checked
                ? "bg-pink-600 border-pink-600 shadow-2xs"
                : "bg-white border-stone-300 hover:border-stone-400"
            }
          `}
        >
          {checked && (
            <svg
              className="w-3 h-3 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="3.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          )}
        </div>
      </div>

      {label && (
        <span className="text-xs sm:text-sm font-semibold text-stone-800">
          {label}
        </span>
      )}
    </label>
  );
};
