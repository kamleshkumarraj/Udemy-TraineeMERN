import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router";
import { getAuth } from "../../store/slice/auth.slice";
import { useGetProfileQuery } from "../../api/userProfile.api";

function Header() {
  const authDetails = useSelector(getAuth);
  const {data : user} = useGetProfileQuery();
  return (
    <header className="backdrop-blur-2xl bg-white/10 sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center py-4 px-6">
        <h1 className="text-3xl font-bold text-white">🛍️ ShopVista</h1>
        <nav className="space-x-8 items-center hidden md:flex">
          <Link to="#" className="hover:text-pink-300 transition">
            Home
          </Link>
          <Link href="#" className="hover:text-pink-300 transition">
            Products
          </Link>
          <Link href="#" className="hover:text-pink-300 transition">
            About
          </Link>
          <Link href="#" className="hover:text-pink-300 transition">
            Contact
          </Link>
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
