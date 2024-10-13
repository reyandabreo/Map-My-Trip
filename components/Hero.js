// components/Hero.js
"use client"
import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { FaUserCircle } from 'react-icons/fa';

const Header = ({ isLoggedIn, handleLogout, router }) => (
  <header className="absolute top-0 left-0 right-0 z-10 flex justify-between items-center p-6">
    <div className="w-40 h-12 p-2 rounded-lg flex justify-center items-center">
      <img src='/logo/logo.png' className="object-cover w-full h-full" alt="Logo" />
    </div>
    <nav className="hidden md:flex space-x-6">
      <a href="/navitems/Explore" className="text-white hover:text-orange-500">Explore</a>
      <a href="/navitems/Trips" className="text-white hover:text-orange-500">Trips</a>
      <a href="/navitems/UserReviews" className="text-white hover:text-orange-500">Reviews</a>
      <a href="#" className="text-white hover:text-orange-500">Gallery</a>
    </nav>
    {isLoggedIn ? (
      <div className="relative">
        <FaUserCircle size={32} className="text-white cursor-pointer" />
        <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded-lg shadow-lg">
          <button 
            className="block w-full px-4 py-2 text-left hover:bg-gray-100" 
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    ) : (
      <button
        type='button'
        className="bg-orange-500 text-white px-4 py-2 rounded-full"
        onClick={() => router.push('/user-auth/SignUp')}
      >
        Sign Up
      </button>
    )}
  </header>
);

const HeroSection = ({ router }) => (
  <div className="relative h-screen">
    <img src="/images/landing_page.jpg" alt="Hot air balloons over snowy landscape" className="w-full h-full object-cover" />
    <div className="absolute inset-0 bg-black bg-opacity-30"></div>
    <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white">
      <h1 className="text-5xl font-bold mb-4">Unlock Your Travel Dreams With MapMyTrip!</h1>
      <p className="text-xl mb-8">Discover the world's most adventurous nature, life is so short for a trip.</p>
      <button 
        type='button'
        className="bg-orange-500 text-white px-6 py-3 rounded-full flex items-center"
        onClick={() => router.push('/user-auth/SignIn')}
      >
        GET STARTED <ArrowRight className="ml-2" size={20} />
      </button>
    </div>
  </div>
);

const PopularPlaces = () => (
  <div className="absolute bottom-8 left-0 right-0">
    <h2 className="text-white text-2xl mb-4 text-center">Explore Popular Places</h2>
    <div className="flex justify-center space-x-4">
      {[{ id: 1, name: 'Kyoto', image: 'place_1.jpg' }, { id: 2, name: 'Paris', image: 'place_2.jpg' }, { id: 3, name: 'Tokyo', image: 'place_3.jpg' }, { id: 4, name: 'Bali', image: 'place_4.jpg' }].map((place) => (
        <div key={place.id} className="w-48 h-24 bg-white rounded-lg overflow-hidden group relative">
          <img src={`/images/${place.image}`} alt={`Popular place ${place.id}`} className="w-full h-full object-cover group-hover:opacity-50" />
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 p-2 text-justify text-black opacity-0 group-hover:opacity-100 transition-all">
            {place.name}
          </div>
        </div>
      ))}
    </div>
  </div>
);

const TravelHomepage = () => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Assume you have a token or session check
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    // Clear token or session
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    router.push('/');
  };

  return (
    <div className="relative">
      <Header isLoggedIn={isLoggedIn} handleLogout={handleLogout} router={router} />
      <HeroSection router={router} />
      <PopularPlaces />
    </div>
  );
};

export default TravelHomepage;
