// components/Hero.js

import React from 'react';
import { ArrowRight } from 'lucide-react';

const Header = () => (
  <header className="absolute top-0 left-0 right-0 z-10 flex justify-between items-center p-6">
    <div className="text-white font-bold text-2xl">MOU-Trips</div>
    <nav className="hidden md:flex space-x-6">
      <a href="#" className="text-white hover:text-orange-500">Destination</a>
      <a href="#" className="text-white hover:text-orange-500">About Us</a>
      <a href="#" className="text-white hover:text-orange-500">Testimonial</a>
      <a href="#" className="text-white hover:text-orange-500">Gallery</a>
    </nav>
    <button className="bg-orange-500 text-white px-4 py-2 rounded-full">Sign Up</button>
  </header>
);

const HeroSection = () => (
  <div className="relative h-screen">
    <img src="/images/landing_page.jpg" alt="Hot air balloons over snowy landscape" className="w-full h-full object-cover" />
    <div className="absolute inset-0 bg-black bg-opacity-30"></div>
    <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white">
      <h1 className="text-6xl font-bold mb-4">Unlock Your Travel Dreams With Us!</h1>
      <p className="text-xl mb-8">Discover the world's most adventurous nature, life is so short for a trip.</p>
      <button className="bg-orange-500 text-white px-6 py-3 rounded-full flex items-center">
        GET STARTED <ArrowRight className="ml-2" size={20} />
      </button>
    </div>
  </div>
);

const PopularPlaces = () => (
  <div className="absolute bottom-8 left-0 right-0">
    <h2 className="text-white text-2xl mb-4 text-center">Popular Places</h2>
    <div className="flex justify-center space-x-4">
      {[{ id: 1, name: 'Seoul', image: 'place_1.jpg' }, { id: 2, name: 'Tokyo', image: 'place_2.jpg' }, { id: 3, name: 'New York', image: 'place_3.jpg' }, { id: 4, name: 'Paris', image: 'place_4.jpg' }].map((place) => (
        <div key={place.id} className="w-48 h-24 bg-white rounded-lg overflow-hidden group">
          <img src={`/images/${place.image}`} alt={`Popular place ${place.id}`} className="w-full h-full object-cover group-hover:opacity-50" />
          <div
            className="absolute bottom-0 left-15 p-2 text-justify text-black opacity-0 group-hover:opacity-100 transition-all"
          >
            {place.name}
          </div>
        </div>
      ))}
    </div>
  </div>
);

const TravelHomepage = () => {
  return (
    <div className="relative">
      <Header />
      <HeroSection />
      <PopularPlaces />
    </div>
  );
};

export default TravelHomepage;
