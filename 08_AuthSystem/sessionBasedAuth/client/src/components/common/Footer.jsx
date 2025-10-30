import React from "react";

function Footer() {
  return (
    <footer className="bg-white/10 backdrop-blur-2xl py-8 text-center text-white/80">
      <div className="max-w-6xl mx-auto">
        <p className="text-lg font-semibold mb-2">ShopVista © 2025</p>
        <p className="text-sm">
          Made with ❤️ by <span className="text-pink-400">YourBrand</span>
        </p>
        <div className="flex justify-center space-x-6 mt-4 text-xl">
          <a href="#" className="hover:text-pink-400 transition">
            🌐
          </a>
          <a href="#" className="hover:text-pink-400 transition">
            📸
          </a>
          <a href="#" className="hover:text-pink-400 transition">
            🐦
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
