
// components/PopularPlaces.js
import React from 'react';
import Image from 'next/image';

const PopularPlaces = () => {
  const places = [
    {
      id: 1,
      image: '/images/place_5.jpg',
      name: 'Seoul',
    },
    {
      id: 2,
      image: '/images/place_6.jpg',
      name: 'Amsterdam',
    },
    {
      id: 3,
      image: '/images/place_7.jpg',
      name: 'Rio de Jenero',
    },
    {
      id: 4,
      image: '/images/place_8.jpg',
      name: 'Cape Town',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Popular Places</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {places.map((place) => (
          <div key={place.id} className="relative h-48 overflow-hidden rounded-lg group">
            <Image
              src={place.image}
              layout="fill"
              objectFit="cover"
              alt={`Popular Place ${place.id}`}
              className="group-hover:opacity-50"
            />
            <div
              className="absolute bottom-0 left-0 p-2 text-lg text-black opacity-0 group-hover:opacity-100 transition-all rounded"
            >
              {place.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularPlaces;
