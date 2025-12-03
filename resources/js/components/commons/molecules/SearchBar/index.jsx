import React from "react";

const SearchBar = ({ placeholder = 'Cari' }) => {
  return (
    <div className="flex items-center py-4 pl-6 bg-transparent">
      {/* Logo & Brand */}
      <div className="flex items-center mr-8">
        <img
          src="/icon/Logo_Mysembako.svg"
          alt="Logo MySembako"
          className="h-8 w-auto mr-[6px]"
        />
      </div>

      {/* Search Input Group */}
      <div className="flex items-center flex-1 max-w-xl bg-white border-[1.5px] border-[#ef6b49] rounded-2xl px-3 h-[34px] mr-4 box-border">
        {/* Search Icon */}
        <img
          src="/icon/search.svg"
          alt="Cari"
          className="w-[18px] h-[18px] mr-[6px] opacity-[0.85]"
        />
        <input
          type="text"
          placeholder={placeholder}
          className="border-none outline-none bg-transparent font-poppins text-sm text-[#ef6b49] flex-1 p-0"
        />
      </div>

      {/* Right Icons */}
      <div className="flex items-center gap-[10px]">
        {/* Setting Icon */}
        <button
          className="bg-[#ffe3da] border-none rounded-full w-8 h-8 flex items-center justify-center cursor-pointer mr-1 transition-colors duration-200 hover:bg-[#fcd5c7]"
        >
          <img
            src="/icon/Seting.svg"
            alt="Setting"
            className="w-5 h-5"
          />
        </button>

        {/* User Icon */}
        <button
          className="bg-[#ffe3da] border-none rounded-full w-8 h-8 flex items-center justify-center cursor-pointer transition-colors duration-200 hover:bg-[#fcd5c7]"
        >
          <img
            src="/icon/User.svg"
            alt="User"
            className="w-5 h-5"
          />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
