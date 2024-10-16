"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { AiOutlineArrowRight as ArrowRight } from 'react-icons/ai'; // Import the ArrowRight icon

// Header component with stylish animated hamburger menu
const Header = ({ isLoggedIn, handleLogout, router }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="absolute top-0 left-0 right-0 z-10 flex justify-between items-center p-4 md:p-6 bg-transparent">
      <div className="w-32 h-10 md:w-40 md:h-12 p-2 rounded-lg flex justify-center items-center">
        <img src="/logo/logo.png" className="object-cover w-full h-full" alt="Logo" />
      </div>

      {/* Full navigation for large screens */}
      <nav className="hidden md:flex space-x-4 md:space-x-6">
        <Link href="/navitems/Explore" className="text-white hover:text-orange-500">Explore</Link>
        <Link href="/navitems/Trips" className="text-white hover:text-orange-500">Trips</Link>
        <Link href="/navitems/UserReviews" className="text-white hover:text-orange-500">Reviews</Link>
      </nav>

      {/* Animated Hamburger Menu for small screens */}
      <div className="md:hidden">
        <button onClick={toggleMenu} className="relative w-10 h-10 focus:outline-none">
          <div
            className={`block w-full h-1 bg-white rounded transition-transform duration-300 ease-in-out ${
              isMenuOpen ? 'transform rotate-45 translate-y-3.5' : ''
            }`}
          />
          <div
            className={`block w-full h-1 bg-white rounded my-1.5 transition-opacity duration-300 ease-in-out ${
              isMenuOpen ? 'opacity-0' : ''
            }`}
          />
          <div
            className={`block w-full h-1 bg-white rounded transition-transform duration-300 ease-in-out ${
              isMenuOpen ? 'transform -rotate-45 -translate-y-3.5' : ''
            }`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <nav
        className={`${
          isMenuOpen ? 'block' : 'hidden'
        } absolute top-16 left-0 right-0 bg-white bg-opacity-40 backdrop-blur-lg text-white p-6 flex flex-col space-y-4 md:hidden transition-all duration-300 ease-in-out transform ${
          isMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-5 opacity-0'
        }`}
      >
        <Link href="/navitems/Explore" className="hover:text-orange-500">Explore</Link>
        <Link href="/navitems/Trips" className="hover:text-orange-500">Trips</Link>
        <Link href="/navitems/UserReviews" className="hover:text-orange-500">Reviews</Link>
      </nav>

      {/* Sign-up and avatar section */}
      {isLoggedIn ? (
        <div className="relative">
          <img
            src="/images/anime-avatar.jpg"
            alt="User Avatar"
            className="w-8 h-8 md:w-10 md:h-10 rounded-full cursor-pointer"
            onClick={toggleDropdown}
          />
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-32 md:w-40 bg-white text-black rounded-lg shadow-lg">
              <button
                className="rounded-lg w-full px-3 py-2 text-left hover:bg-gray-100"
                onClick={handleLogout}
              >
                Logout
              </button>
              <button
                className="rounded-lg w-full px-3 py-2 text-left hover:bg-gray-100"
                onClick={() => router.push('/settings')}
              >
                Settings
              </button>
            </div>
          )}
        </div>
      ) : (
        <button
          type="button"
          className="bg-orange-500 text-white px-3 py-2 rounded-full hidden md:block"
          onClick={() => router.push('/user-auth/SignUp')}
        >
          Sign Up
        </button>
      )}
    </header>
  );
};

// Hero Section component
const HeroSection = ({ router }) => (
  <div className="relative h-screen w-full">
    <img
      src="/images/landing_page.jpg"
      alt="Hot air balloons over snowy landscape"
      className="absolute inset-0 w-full h-full object-cover"
      style={{ objectPosition: 'center' }} // Keeping the image center-focused
    />
    <div className="absolute inset-0 bg-black bg-opacity-30"></div>
    <div className="relative flex flex-col justify-center items-center h-full text-center text-white p-4">
      <h1 className="text-3xl md:text-5xl font-bold mb-4">Unlock Your Travel Dreams With MapMyTrip!</h1>
      <p className="text-lg md:text-xl mb-6 md:mb-8">Discover the world's most adventurous nature, life is too short for a trip.</p>
      <button
        type="button"
        className="bg-orange-500 text-white px-4 py-2 md:px-6 md:py-3 rounded-full flex items-center"
        onClick={() => router.push('/user-auth/SignIn')}
      >
        GET STARTED <ArrowRight className="ml-2" size={20} />
      </button>
    </div>
  </div>
);

// Main TravelHomepage component
const TravelHomepage = () => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    router.push('/');
  };

  return (
    <div className="relative">
      <Header isLoggedIn={isLoggedIn} handleLogout={handleLogout} router={router} />
      <HeroSection router={router} />
    </div>
  );
};

export default TravelHomepage;
