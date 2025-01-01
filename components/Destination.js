"use client";
import React, { useState } from "react";
import { MapPin } from "lucide-react";
import SearchBar from "@/components/SearchBar";
import Link from "next/link";

const CategoryTabs = ({ activeCategory, setActiveCategory }) => {
  const categories = ["All", "Recommended", "Beach", "Park", "Nature", "Mountain"];

  return (
    <div className="flex space-x-4 mb-6 overflow-x-auto whitespace-nowrap">
      {categories.map((category, index) => (
        <button
          key={index}
          onClick={() => setActiveCategory(category)} // Change active category on click
          className={`px-4 py-2 rounded-full ${
            activeCategory === category
              ? "border border-red-300 text-red-500"
              : "text-gray-500"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};


// Helper function to create a URL-friendly slug
const slugify = (name) => {
  return name.toLowerCase().replace(/\s+/g, '-');
};

const DestinationCard = ({ image, name, location, rating }) => (
  <Link href={`/destination/${slugify(name)}`} passHref>
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
  </Link>
);

const TravelSearch = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  // All destinations categorized
  const destinations = [
    { image: "/images/seychelles.jpg", name: "Seychelles Island", location: "Indian Ocean", rating: "4.7", category: "Beach" },
    { image: "/images/bora-bora.jpg", name: "Bora Bora Island", location: "Polynesia", rating: "4.3", category: "Beach" },
    { image: "/images/maldives.jpg", name: "Maldives Island", location: "Indian Ocean", rating: "4.9", category: "Beach" },
    { image: "/images/santorini.jpg", name: "Santorini Island", location: "Greece", rating: "4.5", category: "Mountain" },
    { image: "/images/bali.jpg", name: "Bali Island", location: "Indonesia", rating: "4.9", category: "Nature" },
    { image: "/images/maui.jpg", name: "Maui Island", location: "Hawaii, USA", rating: "4.9", category: "Beach" },
    { image: "/images/capri.jpg", name: "Capri Island", location: "Italy", rating: "4.7", category: "Mountain" },
    { image: "/images/fiji.jpg", name: "Fiji Island", location: "South Pacific", rating: "4.4", category: "Beach" },
    { image: "/images/yosemite.jpg", name: "Yosemite", location: "California, USA", rating: "4.8", category: "Park" },
    { image: "/images/banff.jpg", name: "Banff National Park", location: "Canada", rating: "4.9", category: "Nature" },
    { image: "/images/everest.jpg", name: "Mount Everest", location: "Nepal", rating: "4.7", category: "Mountain" },
    { image: "/images/grand-canyon.jpg", name: "Grand Canyon", location: "USA", rating: "4.9", category: "Nature" },
    { image: "/images/kruger.jpg", name: "Kruger National Park", location: "South Africa", rating: "4.6", category: "Park" },
    { image: "/images/niagara.jpg", name: "Niagara Falls", location: "Canada", rating: "4.8", category: "Nature" },
  ];

  // Filter destinations based on the active category
  const filteredDestinations =
    activeCategory === "All"
      ? destinations
      : destinations.filter((dest) => dest.category === activeCategory);

  return (
    <div className="max-w-6xl mx-auto p-8">
      <SearchBar />
      <br />
      <CategoryTabs activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredDestinations.map((dest, index) => (
          <DestinationCard key={index} {...dest} />
        ))}
      </div>
    </div>
  );
};

export default TravelSearch;
