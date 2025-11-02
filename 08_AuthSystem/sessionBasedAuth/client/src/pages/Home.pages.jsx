import { motion } from "framer-motion";
import { FaEye, FaHeart, FaShoppingCart } from "react-icons/fa";
import LatestProductsBody from "../components/home/LatestProductsBody";

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
      <div  id="latest-products-body"  className="py-[45px] px-[20px] lg:px-[40px] w-[100%]">
        <LatestProductsBody title={"Latest Products"} products={products} />
      </div>

      
    </div>
  );
}
