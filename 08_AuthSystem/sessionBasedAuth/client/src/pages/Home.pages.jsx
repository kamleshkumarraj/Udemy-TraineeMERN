import React from "react";
import { motion } from "framer-motion";
import { FaHeart, FaShoppingCart, FaEye } from "react-icons/fa";

export default function HomePage() {
  const products = [
    {
      id: 1,
      title: "Smart Watch Series 9",
      brand: "Apple",
      category: "Electronics",
      price: "$399",
      img: "https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?auto=format&fit=crop&w=900&q=80",
    },
    {
      id: 2,
      title: "Noise Cancelling Headphones",
      brand: "Sony",
      category: "Audio",
      price: "$299",
      img: "https://images.unsplash.com/photo-1512499617640-c2f999098c01?auto=format&fit=crop&w=900&q=80",
    },
    {
      id: 3,
      title: "Air Jordan Sneakers",
      brand: "Nike",
      category: "Fashion",
      price: "$199",
      img: "https://images.unsplash.com/photo-1606813902794-0b623b63d0d7?auto=format&fit=crop&w=900&q=80",
    },
    {
      id: 4,
      title: "DSLR Camera Pro",
      brand: "Canon",
      category: "Photography",
      price: "$899",
      img: "https://images.unsplash.com/photo-1519183071298-a2962eadcdb2?auto=format&fit=crop&w=900&q=80",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white">
      {/* ===== HERO SECTION ===== */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1585386959984-a4155224a1b9?auto=format&fit=crop&w=2000&q=80"
          alt="Hero Background"
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative text-center z-10 px-4"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-4">
            Discover Your Next Favorite Product
          </h2>
          <p className="text-lg md:text-xl text-white/80 mb-6">
            Premium quality products from top brands with unbeatable prices
          </p>
          <button className="bg-gradient-to-r from-pink-500 to-purple-500 py-3 px-8 rounded-2xl text-white font-semibold hover:shadow-lg hover:shadow-pink-500/40 transition-all">
            Explore Now
          </button>
        </motion.div>
      </section>

      {/* ===== PRODUCTS SECTION ===== */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <h3 className="text-4xl font-semibold text-center mb-10">
          Featured Products
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              className="bg-white/10 backdrop-blur-2xl rounded-3xl shadow-lg overflow-hidden hover:scale-105 transition-transform duration-300"
            >
              <div className="relative">
                <img
                  src={product.img}
                  alt={product.title}
                  className="w-full h-56 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              </div>
              <div className="p-5 text-center">
                <h4 className="text-xl font-semibold mb-1">{product.title}</h4>
                <p className="text-sm text-pink-300">{product.brand}</p>
                <p className="text-sm text-white/70">{product.category}</p>
                <p className="text-lg font-bold mt-3">{product.price}</p>

                <div className="flex justify-center space-x-4 mt-5">
                  <button className="bg-white/20 backdrop-blur-md rounded-full p-3 hover:bg-pink-500 transition">
                    <FaShoppingCart />
                  </button>
                  <button className="bg-white/20 backdrop-blur-md rounded-full p-3 hover:bg-purple-500 transition">
                    <FaEye />
                  </button>
                  <button className="bg-white/20 backdrop-blur-md rounded-full p-3 hover:bg-red-500 transition">
                    <FaHeart />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      
    </div>
  );
}
