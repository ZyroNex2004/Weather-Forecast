import React from 'react';

const Navbar = () => {
  return (
    // <nav className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-4 shadow-md border-white bottom-4">
        <nav className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-4 shadow-md border-b-2 border-white ">

      <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap text-white">
        {/* Logo Section */}
        <div className="flex items-center space-x-2">
          <span className="text-3xl">🌤️</span>
          <h1 className="text-xl md:text-2xl font-bold tracking-wide">WeatherApp</h1>
        </div>

        {/* Navigation Links */}
        <div className="text-sm md:text-base font-medium space-x-4 mt-2 md:mt-0">
          <a href="/" className="hover:underline hover:text-yellow-300 transition duration-300">Home</a>
          <a href="/about" className="hover:underline hover:text-yellow-300 transition duration-300">About</a>
          <a href="/contact" className="hover:underline hover:text-yellow-300 transition duration-300">Contact</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
