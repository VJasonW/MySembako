import React, { useId } from "react";

export const Input = ({
  label,
  error,
  helperText,
  icon = null,
  className = "",
  id: customId,
  required,
  ...props
}) => {
  const generatedId = useId();
  const inputId = customId || generatedId;

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-xs font-bold text-stone-700 mb-1.5 uppercase tracking-wide"
        >
          {label} {required && <span className="text-rose-500">*</span>}
        </label>
      )}

      <div className="relative flex items-center">
        {icon && (
          <span className="absolute left-3.5 text-stone-400 pointer-events-none flex items-center justify-center">
            {icon}
          </span>
        )}

        <input
          id={inputId}
          required={required}
          className={`
            w-full py-2.5 rounded-xl text-sm text-stone-900 bg-stone-50 border transition-all duration-200 focus-ring
            ${icon ? "pl-10" : "px-3.5"}
            pr-3.5
            ${
              error
                ? "border-rose-300 focus:border-rose-500 focus:bg-white ring-2 ring-rose-500/10"
                : "border-stone-200 focus:border-pink-500 focus:bg-white focus:ring-4 focus:ring-pink-500/10"
            }
            ${className}
          `}
          {...props}
        />
      </div>

      {error ? (
        <p className="text-xs text-rose-600 mt-1 font-medium">{error}</p>
      ) : helperText ? (
        <p className="text-xs text-stone-500 mt-1">{helperText}</p>
      ) : null}
    </div>
  );
};
