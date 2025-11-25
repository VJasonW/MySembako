import React from "react";
import SearchBar from '../components/commons/molecules/SearchBar';


console.log('HomePage component loaded');

const products = [
  {
    name: "Roma Sili Pulan Siga",
    price: "Rp 88.900",
    store: "Toko SumberM",
    img: "/images/produk1.png",
  },
  {
    name: "Kobo Boncabe c... ",
    price: "Rp 13.000",
    store: "Toko SumberM",
    img: "/images/produk2.png",
  },
  {
    name: "Bango Kecap mani...",
    price: "Rp 22.200",
    store: "Toko T11",
    img: "/images/produk3.png",
  },
  {
    name: "Sanio Minyak Gor...",
    price: "Rp 22.800",
    store: "Toko T11",
    img: "/images/produk4.png",
  },
  {
    name: "Bimoli Minyak Que...",
    price: "Rp 19.900",
    store: "Toko T11",
    img: "/images/produk5.png",
  },
  {
    name: "Torabika Kaku Rasa...",
    price: "Rp 13.400",
    store: "Toko SumberM",
    img: "/images/produk6.png",
  },
  {
    name: "Deterjen Daia 1900G",
    price: "Rp 33.300",
    store: "Toko Maju M",
    img: "/images/produk7.png",
  },
  {
    name: "Sabun Mandi Kahfi",
    price: "Rp 20.000",
    store: "Toko Maju M",
    img: "/images/produk8.png",
  },
  {
    name: "Sabun Mandi Biore",
    price: "Rp 31.200",
    store: "Toko Maju M",
    img: "/images/produk9.png",
  },
  {
    name: "Sikat Gigi Colgate",
    price: "Rp 13.800",
    store: "Toko T12",
    img: "/images/produk10.png",
  },
  {
    name: "Pasta Gigi Pepsode...",
    price: "Rp 12.900",
    store: "Toko T12",
    img: "/images/produk11.png",
  },
  {
    name: "Gillette Blue Plus",
    price: "Rp 13.400",
    store: "Toko MAKOTA OFFICIAL",
    img: "/images/produk12.png",
  },
];

function HomePage() {
  console.log('HomePage rendering...');
  return (
    <div className="bg-white min-h-screen font-sans border-6 border-gray-800 rounded-lg box-border overflow-hidden">
      {/* Header */}
      <div className="flex items-center px-8 py-6 bg-white border-b border-gray-200 gap-6">
        <img
          src="/icon/Logo_Mysembako.svg"
          alt="MySembako Logo"
          className="h-8 mr-2.5"
        />
        <span className="text-[#FC6900] text-2xl font-bold mr-10">
          MySembako
        </span>
        <div className="flex-1">
          <SearchBar placeholder="Cari" />
        </div>
        <div className="flex gap-3">
          <button className="bg-gray-100 border-none rounded-full w-9 h-9 flex items-center justify-center cursor-pointer">
            <img
              src="/icon/bell.svg"
              alt="Notifications"
              className="w-5.5 h-5.5"
            />
          </button>
          <button className="bg-gray-100 border-none rounded-full w-9 h-9 flex items-center justify-center cursor-pointer">
            <img
              src="/icon/user.svg"
              alt="User"
              className="w-5.5 h-5.5"
            />
          </button>
        </div>
      </div>
      {/* Product Grid */}
      <div className="p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {products.map((product, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img src={product.img} alt={product.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
              <p className="text-xl font-bold text-[#FC6900] mt-2">{product.price}</p>
              <p className="text-sm text-gray-500 mt-1">{product.store}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;


