import { MdArrowForwardIos } from "react-icons/md";
import { Link } from "react-router-dom";

import { BsCartX } from "react-icons/bs";
import { FiMinus, FiPlus } from "react-icons/fi";
import CartLoader from "../components/cart/CartLoader";
import FetchingLoading from "../components/cart/FetchingLoading";
import { useGetAllCartQuery } from "../api/cart.api";

const Cart = () => {
  const cartTotal = {
    subtotal : 23,
    fix : 34,
    total : 45

  }
  
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
            <h1>Price</h1>
            <h1>Quantity</h1>
            <h1>Remove</h1>
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
                quantity,
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
                  <p className="text-[1.8rem] font-bold lg:pr-[100px]">
                    ${(price * quantity)?.toFixed(2)}
                  </p>

                  <div
                    id="quantity"
                    className="flex gap-[1rem] justify-center pr-[1rem] items-center"
                  >
                    <div
                      id="decreaseBtn"
                      className="font-[600] text-[28px] p-[5px] grid place-content-center py-[-2rem] border-[1px] rounded-[.5rem] hover:cursor-pointer"
                      onClick={() => {
                      }}
                    >
                      {" "}
                      <FiMinus size={"20px"} />{" "}
                    </div>
                    <p className="text-[18px] font-[600]">{quantity}</p>
                    <div
                      id="increaseBtn"
                      className="font-[600] text-[28px] p-[5px] grid place-content-center py-[-2px] border-[1px] rounded-[.5rem] hover:cursor-pointer"
                      onClick={() => {
                      }}
                    >
                      <FiPlus size={"20px"} />
                    </div>
                  </div>
                  <button
                    onClick={() => {
                    }}
                    className=" w-[30px] h-[30px] mx-[20px] rounded-[50%] bg-red-500 text-white hover:underline"
                  >
                    X
                  </button>
                </div>
              )
            )
          )}
        </div>

        {/* Order Summary Section */}
        <div className="w-full p-6 mt-8 border lg:w-1/4 lg:mt-0">
          <h2 className="mb-4 text-[1.8rem] font-semibold">Order Summary</h2>
          <div className="flex justify-between mb-2">
            <p className="text-gray-600">Subtotal</p>
            <p className="text-gray-800">${cartTotal?.subtotal?.toFixed(2)}</p>
          </div>
          <div className="flex justify-between mb-2">
            <p className="text-gray-600">Shipping</p>
            <p className="text-gray-800">Free</p>
          </div>
          <div className="flex justify-between mb-4">
            <p className="text-gray-600">Tax</p>
            <p className="text-gray-800">${cartTotal?.tax?.toFixed(2)}</p>
          </div>
          <div className="flex justify-between mb-6 text-[1.8rem] font-bold">
            <p>Total</p>
            <p>${cartTotal?.total?.toFixed(2)}</p>
          </div>

          <Link
            
          >
            <button className="w-full py-3 bg-black text-white font-semibold mb-4 rounded-[8px]">
              Checkout
            </button>
          </Link>

          <Link
            to="/business-browse"
            className="flex justify-center text-center text-blue-500 hover:underline"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
