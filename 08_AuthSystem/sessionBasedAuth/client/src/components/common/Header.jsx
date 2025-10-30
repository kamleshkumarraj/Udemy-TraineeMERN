import React from "react";
import { Link } from "react-router";

function Header() {
  return (
    <header className="backdrop-blur-2xl bg-white/10 sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center py-4 px-6">
        <h1 className="text-3xl font-bold text-white">🛍️ ShopVista</h1>
        <nav className="space-x-8 hidden md:flex">
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
          <Link to="/login" className="hover:text-pink-300 transition">
            Login
          </Link>
        </nav>
        <button className="md:hidden text-2xl">☰</button>
      </div>
    </header>
  );
}

export default Header;
