import React from "react";

export const QuantityStepper = ({
  value = 1,
  onChange = () => {},
  min = 1,
  max = 999,
  disabled = false,
  size = "md",
}) => {
  const handleDec = (e) => {
    e.stopPropagation();
    if (value > min && !disabled) {
      onChange(value - 1);
    }
  };

  const handleInc = (e) => {
    e.stopPropagation();
    if (value < max && !disabled) {
      onChange(value + 1);
    }
  };

  const handleInputChange = (e) => {
    let val = parseInt(e.target.value, 10);
    if (isNaN(val)) val = min;
    if (val < min) val = min;
    if (val > max) val = max;
    onChange(val);
  };

  const btnSizes = {
    sm: "w-7 h-7 text-sm",
    md: "w-9 h-9 text-base",
  };

  return (
    <div
      className="inline-flex items-center bg-stone-50 border border-stone-200/90 rounded-xl p-0.5"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        type="button"
        disabled={disabled || value <= min}
        onClick={handleDec}
        className={`${btnSizes[size] || btnSizes.md} rounded-lg flex items-center justify-center font-bold text-stone-700 hover:text-stone-900 hover:bg-stone-200/60 active:scale-95 disabled:opacity-30 disabled:pointer-events-none transition`}
        aria-label="Kurangi kuantitas"
      >
        &minus;
      </button>

      <input
        type="number"
        min={min}
        max={max}
        value={value}
        disabled={disabled}
        onChange={handleInputChange}
        className="w-10 text-center font-bold text-xs sm:text-sm text-stone-900 bg-transparent border-none outline-none p-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        aria-label="Kuantitas"
      />

      <button
        type="button"
        disabled={disabled || value >= max}
        onClick={handleInc}
        className={`${btnSizes[size] || btnSizes.md} rounded-lg flex items-center justify-center font-bold text-stone-700 hover:text-stone-900 hover:bg-stone-200/60 active:scale-95 disabled:opacity-30 disabled:pointer-events-none transition`}
        aria-label="Tambah kuantitas"
      >
        &#43;
      </button>
    </div>
  );
};
