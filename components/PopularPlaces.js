import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const PopularPlaces = () => {
  const places = [
    {
      id: 1,
      image: '/images/place_5.jpg',
      name: 'Seoul',
      description: 'A fascinating blend of ancient traditions and cutting-edge digital technology. Experience vibrant street food, historic villages, and K-pop culture.'
    },
    {
      id: 2,
      image: '/images/place_6.jpg',
      name: 'Amsterdam',
      description: 'Known for its artistic heritage, elaborate canal system, and narrow houses. Enjoy cycling, museums, and vibrant nightlife.'
    },
    {
      id: 3,
      image: '/images/place_7.jpg',
      name: 'Rio de Janeiro',
      description: 'Famous for stunning beaches, Christ the Redeemer, and Carnival. Experience samba, Sugarloaf Mountain, and Brazilian culture.'
    },
    {
      id: 4,
      image: '/images/place_8.jpg',
      name: 'Cape Town',
      description: 'Nestled between Table Mountain and the Atlantic Ocean. Enjoy beaches, wine tasting, and breathtaking natural beauty.'
    },
    {
      id: 5,
      image: '/images/Lotus-temple.png',
      name: 'Lotus Temple',
      description: 'A stunning architectural marvel in Delhi, shaped like a lotus flower. Experience peace and meditation in this Bahá\'í House of Worship.'
    },
    {
      id: 6,
      image: '/images/place_1.jpg',
      name: 'Kyoto',
      description: 'Ancient capital of Japan, known for its temples, gardens, and traditional culture. Experience tea ceremonies and geisha traditions.'
    },
    {
      id: 7,
      image: '/images/place_2.jpg',
      name: 'Paris',
      description: 'The City of Light, famous for art, fashion, and iconic landmarks. Enjoy cafe culture and world-class museums.'
    },
    {
      id: 8,
      image: '/images/place_3.jpg',
      name: 'Tokyo',
      description: 'A vibrant metropolis blending ultramodern and traditional elements. Experience unique culture, cuisine, and entertainment.'
    }
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
                className="group-hover:opacity-50 transition-all duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300"></div>
              <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-xl font-semibold text-white mb-2">{place.name}</h3>
                <p className="text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {place.description}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PopularPlaces;
