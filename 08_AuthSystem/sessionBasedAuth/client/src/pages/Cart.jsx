import { MdArrowForwardIos } from "react-icons/md";
import { Link } from "react-router-dom";

import { BsCartX } from "react-icons/bs";
import { FiMinus, FiPlus } from "react-icons/fi";
import { useGetAllCartQuery } from "../api/cart.api";
import CartLoader from "../components/cart/CartLoader";
import FetchingLoading from "../components/cart/FetchingLoading";

const Cart = () => {
  

  
  const {data : cartItems, isLoading : apiStatus} = useGetAllCartQuery();
  

  if (cartItems?.length == 0)
    return (
      <CartLoader
        icon={<BsCartX size={250} color="#E8E8E8" />}
        heading={"Your cart is currently empty."}
        para={`Before proceed to checkout you must add some products to your shopping cart.\n
      You will find a lot of interesting products on our "Shop" page.`}
        button={"Return to Shop".toUpperCase()}
      />
    );

  return (
    <div className="bg-white">
      <div className="p-4 my-auto mb-4 bg-gray-200">
        <h1 className="mb-2 text-[3rem] font-bold text-center">Cart</h1>
        <nav className="flex items-center justify-center gap-2 text-[1.4rem] text-gray-600">
          <Link to="#" className="hover:underline">
            Ecommerce
          </Link>
          <MdArrowForwardIos size={10} />
          <span className="font-semibold text-black">Cart</span>
        </nav>
      </div>

      <div className="flex flex-col items-start justify-between px-5 lg:flex-row md:px-10">
        {/* Cart Items Section */}
        <div className="flex flex-col w-full lg:w-3/5">
          <h2 className="mb-4 text-[1.8rem] font-semibold">Your cart</h2>
          <div className="flex justify-between w-full">
            <h1 className="w-[200px]">Products</h1>
          </div>

          {apiStatus ? (
            <FetchingLoading />
          ) : (
            cartItems &&
            cartItems.length > 0 &&
            cartItems.map(
              ({
                _id,
                thumbnail,
                price,
                title,
                availabilityStatus,
              }) => (
                <div
                  key={_id}
                  className="flex items-center justify-between py-4 border-b"
                >
                  <div id="img" className="w-[150px]">
                    <img className="" src={thumbnail} alt="cart-image" />
                  </div>
                  <div className="flex-grow px-4">
                    <p className="font-semibold">{title}</p>
                    <p className="text-[14px] text-gray-600">
                      Price : ${price?.toFixed(2)}
                    </p>
                    <p
                      className={`${
                        availabilityStatus == "available"
                          ? "text-green-600"
                          : "text-red-600"
                      } text-[16px] font-[500]`}
                      id="stock-status"
                    >
                      {availabilityStatus == "available"
                        ? "In stock"
                        : "Out of Stock"}
                    </p>
                  </div>

                  
                 
                </div>
              )
            )
          )}
        </div>

        
      </div>
    </div>
  );
};

export default Cart;
