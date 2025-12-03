import React from "react";

function HomePage() {
  const productsList = [
    {
      name: "Beras SI Pulen 5kg",
      price: "Rp 88.900",
      store: "Toko Baru",
      img: "/images/produk1.png",
    },
    {
      name: "Kobe Cabe Bubuk Boncabe lv 15",
      price: "Rp 13.000",
      store: "Toko Suniman",
      img: "/images/produk2.png",
    },
    {
      name: "Bango Kecap Manis",
      price: "Rp 22.200",
      store: "Toko T11",
      img: "/images/produk3.png",
    },
    {
      name: "Sania Minyak Goreng",
      price: "Rp 22.800",
      store: "Toko T11",
      img: "/images/produk4.png",
    },
    {
      name: "Bimoli Minyak Goreng",
      price: "Rp 19.900",
      store: "Toko T11",
      img: "/images/produk5.png",
    },
    {
      name: "Totole Kaldu Rasa",
      price: "Rp 13.400",
      store: "Toko Madu Timur",
      img: "/images/produk6.png",
    },
    {
      name: "Deterjen Daia 900G",
      price: "Rp 33.300",
      store: "Toko Baru",
      img: "/images/produk7.png",
    },
    {
      name: "Sabun Mandi Kahfi",
      price: "Rp 20.000",
      store: "Toko Suniman",
      img: "/images/produk8.png",
    },
    {
      name: "Sabun Mandi Biore",
      price: "Rp 31.200",
      store: "Toko T11",
      img: "/images/produk9.png",
    },
    {
      name: "Sikat Gigi Colgate",
      price: "Rp 13.800",
      store: "Toko T11",
      img: "/images/produk10.png",
    },
    {
      name: "Pasta Gigi Pepsodent",
      price: "Rp 12.900",
      store: "Toko T11",
      img: "/images/produk11.png",
    },
    {
      name: "Gillette Blue 1Pcs",
      price: "Rp 13.400",
      store: "Toko Madu Timur",
      img: "/images/produk12.png",
    },
    {
      name: "Buah Durian Musang king 5 Kardus",
      price: "Rp 13.400",
      store: "Toko Madu Timur",
      img: "/images/produk13.png",
    },
    {
      name: "Teh Botol Sosro 450ml",
      price: "Rp 5.500",
      store: "Toko Suniman",
      img: "/images/produk14.png",
    },
    {
      name: "Indomie Goreng Spesial",
      price: "Rp 3.500",
      store: "Toko Baru",
      img: "/images/produk15.png",
    }
  ];

  return (
    <div className="bg-white min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5 md:gap-6">
          {productsList.map((product, idx) => (
            <div
              key={idx}
              className="flex flex-col h-full bg-white border border-gray-200 rounded-2xl shadow-sm p-4 transition hover:shadow-md"
            >
              <div className="flex justify-center items-start mb-3 min-h-[110px]">
                <img
                  src={product.img}
                  alt={product.name}
                  className="h-[90px] object-contain"
                />
              </div>
              <div className="flex-grow">
                <div className="line-clamp-2 font-semibold text-gray-900 text-base leading-snug mb-1 truncate">
                  {product.name}
                </div>
                <div className="text-lg font-bold text-gray-900 mb-2">{product.price}</div>
              </div>
              <div className="text-sm text-gray-400 leading-tight truncate">{product.store}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
