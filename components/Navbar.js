// components/Navbar.js
import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-white py-4 px-8 flex justify-between items-center">
      <div className="text-2xl font-bold">MOU-Trips</div>
      <ul className="flex space-x-6">
        
        <li>
          <a href="#" className="hover:text-orange-500">
            Destination
          </a>
        </li>

        <li>
          <a href="#" className="hover:text-orange-500">
            About Us
          </a>
        </li>

        <li>
          <a href="#" className="hover:text-orange-500">
            Testimonial
          </a>
        </li>

        <li>
          <a href="#" className="hover:text-orange-500">
            Gallery
          </a>
        </li>

      </ul>

      <button className="bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-600">
        Sign Up
      </button>
    </nav>
  );
};

export default Navbar;