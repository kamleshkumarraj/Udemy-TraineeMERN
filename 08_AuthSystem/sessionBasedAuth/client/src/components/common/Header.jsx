import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { getAuth } from "../../store/slice/auth.slice";
import { useGetProfileQuery } from "../../api/userProfile.api";
import {
  AiFillHeart,
  AiFillShopping,
} from "react-icons/ai";
import { useGetAllCartQuery } from "../../api/cart.api";

function Header() {
  const authDetails = useSelector(getAuth);
  const {data : user} = useGetProfileQuery();
  const navigate = useNavigate();
  const {data : cartItem} = useGetAllCartQuery();
  return (
    <header className="backdrop-blur-2xl bg-black/60 sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center py-4 px-6">
        <h1 className="text-3xl font-bold text-white">🛍️ ShopVista</h1>
        <nav className="space-x-8 text-white items-center hidden md:flex">
          <Link to="/" className="hover:text-pink-300 text-shadow-white transition">
            Home
          </Link>
          <Link href="#" className="hover:text-pink-300 text-white transition">
            Products
          </Link>
          <Link href="#" className="hover:text-pink-300 transition">
            About
          </Link>
          <Link href="#" className="hover:text-pink-300 transition">
            Contact
          </Link>
          <div className="flex items-center gap-[1.4rem] mt-[1.4rem] md:mt-0">
          <div onClick={() => {navigate('/cart')}} className="relative flex gap-[2px] cursor-pointer">
            <p className="hover:text-pink-300 text-[16px] font-normal">Cart</p>
            <AiFillShopping className="text-[24px] text-orange-500" />
            {cartItem && cartItem?.length > 0 && (
              <span className="absolute -top-[10px] -right-[10px] bg-green-500 text-white text-[12px] rounded-full px-[6px]">
                {cartItem?.length}
              </span>
            )}
          </div>
        </div>
          {
            authDetails?.isAuthenticated ? (
              <Link to="/profile" className="hover:text-pink-300 items-center flex gap-[10px] transition">
                <div>
                  <img className="w-[35px] h-[35px] rounded-full" src={user?.avatar?.url} alt="profile-image" />
                </div>
                <p>{user?.fullName}</p>
              </Link>
            ) : (
              <Link to="/login" className="hover:text-pink-300 transition">
                Login
              </Link>
            )
          }
        </nav>
        <button className="md:hidden text-2xl">☰</button>
      </div>
    </header>
  );
}

export default Header;
