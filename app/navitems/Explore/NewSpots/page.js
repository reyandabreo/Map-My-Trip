// app/navitems/Explore/NewSpots/page.js
"use client"; // Ensure this is a client component
import React from "react";
import { useRouter } from "next/navigation"; // Use next/navigation for App Router
import { MapPin } from "lucide-react";
import Link from "next/link";

// Helper function to create a URL-friendly slug
const slugify = (name) => {
  return name.toLowerCase().replace(/\s+/g, '-');
};

const DestinationCard = ({ image, name, location, rating }) => (
  <Link href={`/destination/${slugify(name)}`} passHref>
    <div className="relative rounded-lg overflow-hidden shadow-lg transition-shadow hover:shadow-xl">
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

const NewSpots = () => {
  const router = useRouter(); // Initialize useRouter

  const popularSpots = [
    {
      id: 1,
      name: "Bora Bora, French Polynesia",
      description: "A stunning island known for its crystal-clear waters, luxury resorts, and coral reefs. Perfect for honeymooners and beach lovers.",
      image: "/images/bora_bora.jpg",
      location: "Polynesia",
      rating: "4.8",
    },
    {
      id: 2,
      name: "Kyoto, Japan",
      description: "A cultural hub with breathtaking temples, gardens, and the beautiful Arashiyama Bamboo Forest. A must-visit for history enthusiasts.",
      image: "/images/kyoto.jpg",
      location: "Japan",
      rating: "4.7",
    },
    {
      id: 3,
      name: "Santorini, Greece",
      description: "Famous for its white-washed buildings, blue domes, and beautiful sunsets over the Aegean Sea.",
      image: "/images/santorini.jpg",
      location: "Greece",
      rating: "4.6",
    },
    {
      id: 4,
      name: "Maui, Hawaii",
      description: "Known for its beaches, scenic drives, and Haleakalā National Park with a dormant volcano.",
      image: "/images/maui.jpg",
      location: "Hawaii, USA",
      rating: "4.9",
    },
    {
      id: 5,
      name: "Paris, France",
      description: "The City of Light, known for its art, fashion, and iconic landmarks like the Eiffel Tower and Louvre Museum.",
      image: "/images/paris.jpg",
      location: "France",
      rating: "4.7",
    },
    {
      id: 6,
      name: "Sydney, Australia",
      description: "Home to the Sydney Opera House and beautiful beaches, it's a vibrant city with a rich cultural scene.",
      image: "/images/sydney.jpg",
      location: "Australia",
      rating: "4.6",
    },
    {
      id: 7,
      name: "Rome, Italy",
      description: "The Eternal City, famous for its nearly 3,000 years of globally influential art, architecture, and culture.",
      image: "/images/rome.jpg",
      location: "Italy",
      rating: "4.8",
    },
    {
      id: 8,
      name: "New York City, USA",
      description: "The Big Apple, known for its iconic skyline, Central Park, and a melting pot of cultures.",
      image: "/images/new_york.jpg",
      location: "USA",
      rating: "4.9",
    },
    {
      id: 9,
      name: "Barcelona, Spain",
      description: "Famous for its unique architecture by Antoni Gaudí, vibrant culture, and beautiful beaches.",
      image: "/images/barcelona.jpg",
      location: "Spain",
      rating: "4.7",
    },
    {
      id: 10,
      name: "Iceland",
      description: "Known for its stunning natural beauty, including geysers, hot springs, and the Northern Lights.",
      image: "/images/iceland.jpg",
      location: "Iceland",
      rating: "4.9",
    },
    {
      id: 11,
      name: "Cape Town, South Africa",
      description: "Famous for its stunning coastline, Table Mountain, and diverse cultural heritage.",
      image: "/images/cape_town.jpg",
      location: "South Africa",
      rating: "4.8",
    },
    {
      id: 12,
      name: "Prague, Czech Republic",
      description: "Known for its beautiful architecture, historic Old Town, and vibrant arts scene.",
      image: "/images/prague.jpg",
      location: "Czech Republic",
      rating: "4.7",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative">
        {/* Back Button on Image */}
        <div className="absolute top-4 left-4 z-10">
          <button 
            onClick={() => router.back()} 
            className="flex items-center text-white  bg-opacity-50 rounded-lg px-3 py-2 hover:text-orange-900 z-50"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12H3m0 0h12m-12 0l4-4m-4 4l4 4" />
            </svg>
            Back
          </button>
        </div>

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

      {/* Popular Spots Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-8 max-w-6xl mx-auto">
        {popularSpots.map((spot) => (
          <DestinationCard key={spot.id} image={spot.image} name={spot.name} location={spot.location} rating={spot.rating} />
        ))}
      </div>

      {/* Call to Action Section */}
      <div className="py-12 bg-gradient-to-r from-orange-500 to-yellow-500 text-white text-center mt-12">
        <h2 className="text-4xl font-semibold mb-6">
          Ready to explore?
        </h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto">
          Start planning your trip to your dream destination now. Find exclusive deals on hotels, tours, and flights.
        </p>
        <Link href="/bookings" className="bg-white text-gray-800 px-6 py-3 rounded-full text-lg font-semibold hover:bg-gray-200 transition">
          Book Now
        </Link>
      </div>
    </div>
  );
};

export default NewSpots;
