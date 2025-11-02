import { motion } from "framer-motion";
import { FaEye, FaHeart, FaShoppingCart } from "react-icons/fa";
import LatestProductsBody from "../components/home/LatestProductsBody";
import { useGetProductsQuery } from "../api/products.api";
import FeaturedCardShimmer from "../components/card/FeatureCardShimmer";
import { useMemo } from "react";
import { useGetAllCartQuery } from "../api/cart.api";
import { useDispatch } from "react-redux";
import { setProductToCartMap } from "../store/slice/misc.slice";

export default function HomePage() {
  const {
    data,
    error: productsError,
    isLoading,
  } = useGetProductsQuery();

  const {data : cartItems} = useGetAllCartQuery();
  const dispatch = useDispatch();

  useMemo(() => {
    console.log("cart", cartItems)
    const map = new Map();
    cartItems?.forEach((item) => {
      map.set(item?.productId, item?._id);
    });
    dispatch(setProductToCartMap(map));

  },[cartItems])


  if(productsError) return <h1>We get error during fetching product data</h1> 
  return (
    <div className="min-h-screen  text-white">
      {/* ===== HERO SECTION ===== */}
      <section className="relative h-[100vh] flex items-center justify-center overflow-hidden">
        <img
          src="https://wallpapers.com/images/featured/laptop-murjp1nk4lp1idlt.jpg"
          alt="Hero Background"
          className="absolute inset-0 w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-black/40 blur-xl"></div>
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
      {isLoading ? (
        <div
          id="latest-products-body"
          className="py-[45px] px-[20px] lg:px-[40px] w-[100%]"
        >
          <div className="flex flex-wrap">
            <div className="w-full">
              <div className="text-center flex justify-center items-center flex-col 2xl:text-[3.6rem] xl:text-[3.2rem] md:text-[3rem] sm:text-[2.7rem] text-[2.4rem] text-slate-600 font-bold relative 2xl:pb-[45px] xl:pb-[40px] md:px-[35px] pb-[30px]">
                <h2>Latest Products</h2>
                <div className="2xl:w-[200px] xl:w-[170px] md:w-[150px] s:w-[130px] w-[100px] h-[4px] bg-[#7fad39] mt-4"></div>
              </div>
            </div>
            <div className="grid w-full gap-6 2xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1">
              {Array(9).map(() => (
                <FeaturedCardShimmer />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div
          id="latest-products-body"
          className="py-[45px] px-[20px] lg:px-[40px] w-[100%]"
        >
          <LatestProductsBody title={"Latest Products"} products={data?.products} />
        </div>
      )}
    </div>
  );
}
