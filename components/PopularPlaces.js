import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

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

  // Helper function to slugify names for URLs
  const slugify = (name) => {
    return name.toLowerCase().replace(/\s+/g, '-');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Popular Places</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {places.map((place) => (
          <Link key={place.id} href={`/popularplaces/${slugify(place.name)}`} passHref>
            <div className="relative h-48 overflow-hidden rounded-lg group cursor-pointer">
              <Image
                src={place.image}
                alt={`Popular Place ${place.id}`}
                fill
                style={{ objectFit: 'cover' }}
                className="group-hover:opacity-50"
              />
              <div className="absolute bottom-0 left-0 p-2 text-lg text-white opacity-0 group-hover:opacity-100 transition-all">
                {place.name}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PopularPlaces;
