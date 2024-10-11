"use client";
import { useParams } from 'next/navigation';
import React from 'react';

const destinationData = {
  'seychelles-island': {
    description: "Seychelles Island is an exotic paradise located in the Indian Ocean known for its beautiful beaches and coral reefs.",
    activities: ["Snorkeling", "Diving", "Beach Walks"],
    image: "/images/seychelles.jpg",
    location: "Indian Ocean",
    rating: "4.7",
  },
  'bora-bora-island': {
    description: "Bora Bora is a luxury island destination famous for its turquoise waters and stunning overwater bungalows.",
    activities: ["Water Sports", "Relaxation", "Boat Tours"],
    image: "/images/bora-bora.jpg",
    location: "Polynesia",
    rating: "4.3",
  },
  'maldives-island': {
    description: "The Maldives is known for its crystal-clear waters, coral reefs, and luxurious overwater villas.",
    activities: ["Diving", "Snorkeling", "Beach Relaxation"],
    image: "/images/maldives.jpg",
    location: "Indian Ocean",
    rating: "4.9",
  },
  'santorini-island': {
    description: "Santorini is a Greek island famous for its white-washed buildings, stunning sunsets, and volcanic landscapes.",
    activities: ["Hiking", "Wine Tours", "Boat Rides"],
    image: "/images/santorini.jpg",
    location: "Greece",
    rating: "4.5",
  },
  'bali-island': {
    description: "Bali is an Indonesian paradise known for its forested volcanic mountains, iconic rice paddies, beaches, and coral reefs.",
    activities: ["Surfing", "Temple Visits", "Beach Walks"],
    image: "/images/bali.jpg",
    location: "Indonesia",
    rating: "4.9",
  },
  'maui-island': {
    description: "Maui is a Hawaiian island known for its diverse landscapes, scenic beaches, and the famous Road to Hana.",
    activities: ["Hiking", "Snorkeling", "Beach Time"],
    image: "/images/maui.jpg",
    location: "Hawaii, USA",
    rating: "4.9",
  },
  'capri-island': {
    description: "Capri is an island in Italy known for its rugged landscape, upscale hotels, and high-end shops.",
    activities: ["Boat Tours", "Shopping", "Exploring the Blue Grotto"],
    image: "/images/capri.jpg",
    location: "Italy",
    rating: "4.7",
  },
  'fiji-island': {
    description: "Fiji is an archipelago in the South Pacific known for its clear lagoons, coral reefs, and palm-lined beaches.",
    activities: ["Snorkeling", "Diving", "Beach Relaxation"],
    image: "/images/fiji.jpg",
    location: "South Pacific",
    rating: "4.4",
  },
  'yosemite': {
    description: "Yosemite National Park is known for its stunning granite cliffs, waterfalls, and giant sequoia trees.",
    activities: ["Hiking", "Rock Climbing", "Photography"],
    image: "/images/yosemite.jpg",
    location: "California, USA",
    rating: "4.8",
  },
  'banff-national-park': {
    description: "Banff National Park in Canada is renowned for its majestic mountains, crystal-clear lakes, and abundant wildlife.",
    activities: ["Hiking", "Wildlife Viewing", "Lake Tours"],
    image: "/images/banff.jpg",
    location: "Canada",
    rating: "4.9",
  },
  'mount-everest': {
    description: "Mount Everest is the world’s highest mountain, attracting adventurers and climbers from all over the globe.",
    activities: ["Trekking", "Mountain Climbing", "Scenic Viewing"],
    image: "/images/everest.jpg",
    location: "Nepal",
    rating: "4.7",
  },
  'grand-canyon': {
    description: "The Grand Canyon is a massive gorge in the USA known for its immense size and its colorful, layered rock formations.",
    activities: ["Hiking", "Helicopter Tours", "River Rafting"],
    image: "/images/grand-canyon.jpg",
    location: "USA",
    rating: "4.9",
  },
  'kruger-national-park': {
    description: "Kruger National Park is one of Africa’s largest game reserves, offering incredible safari experiences and wildlife viewing.",
    activities: ["Safari", "Wildlife Viewing", "Photography"],
    image: "/images/kruger.jpg",
    location: "South Africa",
    rating: "4.6",
  },
  'niagara-falls': {
    description: "Niagara Falls is a group of massive waterfalls located on the border between Canada and the USA, known for its sheer size and power.",
    activities: ["Boat Tours", "Sightseeing", "Hiking"],
    image: "/images/niagara.jpg",
    location: "Canada",
    rating: "4.8",
  },
};

const DestinationDetails = () => {
  const params = useParams();  // useParams will give you the dynamic segment in the app router
  const name = params.name;    // Fetching the dynamic "name" from the URL
  const destination = destinationData[name];  // Finding the destination data

  if (!destination) {
    return <p className="text-center">Destination not found!</p>; // Handle case where destination doesn't exist
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-4 capitalize">{name.replace('-', ' ')}</h1>
      <img src={destination.image} alt={name} className="w-full h-64 object-cover rounded-lg mb-6" />
      <p className="text-lg mb-4">{destination.description}</p>
      <h3 className="text-2xl font-semibold mb-2">Popular Activities:</h3>
      <ul className="list-disc list-inside mb-6">
        {destination.activities.map((activity, index) => (
          <li key={index} className="text-lg">{activity}</li>
        ))}
      </ul>
      <div className="flex justify-between items-center">
        <p className="text-gray-700">
          Location: <span className="font-semibold">{destination.location}</span>
        </p>
        <span className="bg-orange-500 text-white px-2 py-1 rounded-full text-sm">{destination.rating}</span>
      </div>
    </div>
  );
};

export default DestinationDetails;
