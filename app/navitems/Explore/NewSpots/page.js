// pages/new-spots.js
// "use client"
// import React,{useState, useEffect} from 'react';

const NewSpots = ({ data }) => {

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-75"></div>
        <img
          src="/images/landing_page.jpg"
          alt="Explore New Spots"
          className="w-full h-96 object-cover"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <h1 className="text-5xl font-bold text-white mb-4">
            Explore New Spots
          </h1>
          <p className="text-lg text-white max-w-2xl">
            Discover the best destinations around the world, from serene beaches to breathtaking mountains.
            Start planning your next adventure today!
          </p>
        </div>
      </div>

      {/* Information Section */}
      <div className="py-12 px-8 max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-semibold mb-4 text-gray-800">
          Popular Destinations
        </h2>
        <p className="text-gray-600 text-lg max-w-3xl mx-auto mb-8">
          Explore the most popular and highly rated spots that travelers recommend.
          Find your dream destination, book your stay, and make unforgettable memories!
        </p>
      </div>

      <div className="px-8">
        {/* Reuse the existing popular destination component */}
        {data && data.map((spot) => (
          <div key={spot.id}>
            <h3>{spot.name}</h3>
            <p>{spot.description}</p>
          </div>
        ))}
      </div>

      {/* Call to Action Section */}
      <div className="py-12 bg-gradient-to-r from-blue-500 to-teal-500 text-white text-center">
        <h2 className="text-4xl font-semibold mb-6">
          Ready to explore?
        </h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto">
          Start planning your trip to your dream destination now. Find exclusive deals on hotels, tours, and flights.
        </p>
        <a
          href="/book-trip"
          className="inline-block px-8 py-4 bg-white text-blue-500 rounded-lg font-semibold hover:bg-gray-100 transition"
        >
          Book Your Trip
        </a>
      </div>
    </div>
  );
};

export default NewSpots;
