
"use client"
import React from 'react';
import { MapPin, CreditCard, Calendar, Search } from 'lucide-react';
import SearchBar from '@/components/SearchBar';

const CategoryTabs = () => {
  const categories = ['All', 'Recommended', 'Beach', 'Park', 'Nature', 'Mountain'];
  return (
    <div className="flex space-x-4 mb-6">
      {categories.map((category, index) => (
        <button
          key={index}
          className={`px-4 py-2 rounded-full ${
            category === 'All' || category === 'Mountain'
              ? 'border border-red-300 text-red-500'
              : 'text-gray-500'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

const DestinationCard = ({ image, name, location, rating }) => (
  <div className="relative rounded-lg overflow-hidden">
    <img src={image} alt={name} className="w-full h-48 object-cover" />
    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
      <h3 className="text-white font-semibold">{name}</h3>
      <div className="flex justify-between items-center">
        <p className="text-white text-sm flex items-center">
          <MapPin className="mr-1" size={14} />
          {location}
        </p>
        <span className="bg-white text-gray-800 px-2 py-1 rounded-full text-sm">{rating}</span>
      </div>
    </div>
  </div>
);

const TravelSearch = () => {
  const destinations = [
    { image: "/images/seychelles.jpg", name: "Seychelles Island", location: "Indian Ocean", rating: "4.7" },
    { image: "/images/bora-bora.jpg", name: "Bora Bora Island", location: "Polynesia", rating: "4.3" },
    { image: "/images/maldives.jpg", name: "Maldives Island", location: "Indian Ocean", rating: "4.9" },
    { image: "/images/santorini.jpg", name: "Santorini Island", location: "Greece", rating: "4.5" },
    { image: "/images/bali.jpg", name: "Bali Island", location: "Indonesia", rating: "4.9" },
    { image: "/images/maui.jpg", name: "Maui Island", location: "Hawaii, USA", rating: "4.9" },
    { image: "/images/capri.jpg", name: "Capri Island", location: "Italy", rating: "4.7" },
    { image: "/images/fiji.jpg", name: "Fiji Island", location: "South Pacific", rating: "4.4" },
  ];

  return (
    <div className="max-w-6xl mx-auto p-8">
      <SearchBar /><br/>
      <CategoryTabs />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {destinations.map((dest, index) => (
          <DestinationCard key={index} {...dest} />
        ))}
      </div>
    </div>
  );
};

export default TravelSearch;

