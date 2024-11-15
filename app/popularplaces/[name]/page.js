
import React from 'react';

// Function to fetch destination details (could come from an API or database)
const getDestinationData = (name) => {
  const destinations = [
    { name: 'seoul', description: 'Seoul is the capital of South Korea...', image: '/images/place_5.jpg' },
    { name: 'amsterdam', description: 'Amsterdam is the capital of the Netherlands...', image: '/images/place_6.jpg' },
    { name: 'rio-de-jenero', description: 'Rio de Janeiro is a city in Brazil...', image: '/images/place_7.jpg' },
    { name: 'cape-town', description: 'Cape Town is a port city in South Africa...', image: '/images/place_8.jpg' },
    { name: 'kyoto', description: 'Old capital of in Japan...', image: '/images/place_1.jpg' },
    { name: 'paris', description: 'Capital of France...', image: '/images/place_2.jpg' },
    { name: 'tokyo', description: 'Current capital of in Japan...', image: '/images/place_3.jpg' },
    { name: 'bali', description: 'Cape Town is a port city in South Africa...', image: '/images/place_4.jpg' },
  ];

  return destinations.find((dest) => dest.name === name);
};

// Dynamic page component
const PopularPlacePage = ({ params }) => {
  const { name } = params;  // Retrieve 'name' from the dynamic route parameter
  const place = getDestinationData(name);  // Fetch details of the place

  if (!place) {
    return <div>Place not found!</div>;
  }

  return (
    <div className="container mx-auto px-44 py-8">
      <h1 className="text-3xl font-bold mb-4">{place.name}</h1>
      <img src={place.image} alt={place.name} className="w-full h-64 object-cover rounded-lg mb-4" />
      <p>{place.description}</p>
    </div>
  );
};

export default PopularPlacePage;
