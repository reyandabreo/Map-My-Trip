import React from 'react';

// Function to fetch destination details (could come from an API or database)
const getDestinationData = (name) => {
  const destinations = [
    { 
      name: 'seoul', 
      description: 'Seoul, the capital of South Korea, is a fascinating blend of ancient traditions and cutting-edge digital technology. Home to centuries-old palaces, Buddhist temples, and traditional markets alongside high-tech skyscrapers and K-pop culture. Experience the vibrant street food scene, explore the historic Bukchon Hanok Village, and shop in the trendy Gangnam district.', 
      image: '/images/place_5.jpg' 
    },
    { 
      name: 'amsterdam', 
      description: 'Amsterdam, the capital of the Netherlands, is known for its artistic heritage, elaborate canal system, and narrow houses with gabled facades. The city\'s museums house works by Rembrandt and Van Gogh, while the Anne Frank House tells a powerful story of World War II. Enjoy cycling along the canals, visit the famous flower market, and experience the vibrant nightlife.', 
      image: '/images/place_6.jpg' 
    },
    { 
      name: 'rio-de-jenero', 
      description: 'Rio de Janeiro, Brazil\'s vibrant coastal city, is famous for its stunning beaches, the iconic Christ the Redeemer statue, and the annual Carnival celebration. The city offers breathtaking views from Sugarloaf Mountain, samba dancing in Lapa, and the world-famous Copacabana and Ipanema beaches. Experience the rich Brazilian culture, music, and cuisine.', 
      image: '/images/place_7.jpg' 
    },
    { 
      name: 'cape-town', 
      description: 'Cape Town, South Africa\'s oldest city, is nestled between the iconic Table Mountain and the Atlantic Ocean. Known for its stunning natural beauty, the city offers world-class beaches, the historic Robben Island, and the scenic Cape of Good Hope. Enjoy wine tasting in nearby vineyards, explore the colorful Bo-Kaap neighborhood, and take in the breathtaking views from Table Mountain.', 
      image: '/images/place_8.jpg' 
    },
    { 
      name: 'kyoto', 
      description: 'Kyoto, once the capital of Japan, is a city on the island of Honshu. It\'s famous for its numerous classical Buddhist temples, gardens, imperial palaces, Shinto shrines, and traditional wooden houses. The city is known for its formal traditions such as kaiseki dining, consisting of multiple courses of precise dishes, and geisha, female entertainers often found in the Gion district.', 
      image: '/images/place_1.jpg' 
    },
    { 
      name: 'paris', 
      description: 'Paris, France\'s capital, is a major European city and a global center for art, fashion, gastronomy, and culture. Its 19th-century cityscape is crisscrossed by wide boulevards and the River Seine. Beyond such landmarks as the Eiffel Tower and the 12th-century, Gothic Notre-Dame cathedral, the city is known for its cafe culture and designer boutiques along the Rue du Faubourg Saint-Honoré.', 
      image: '/images/place_2.jpg' 
    },
    { 
      name: 'tokyo', 
      description: 'Tokyo, Japan\'s busy capital, mixes the ultramodern and the traditional, from neon-lit skyscrapers to historic temples. The opulent Meiji Shinto Shrine is known for its towering gate and surrounding woods. The Imperial Palace sits amid large public gardens. The city\'s many museums offer exhibits ranging from classical art to a reconstructed kabuki theater.', 
      image: '/images/place_3.jpg' 
    },
    { 
      name: 'bali', 
      description: 'Bali, Indonesia\'s most famous island, is known for its forested volcanic mountains, iconic rice paddies, beaches, and coral reefs. The island is home to religious sites such as cliffside Uluwatu Temple. To the south, the beachside city of Kuta has lively bars, while Seminyak, Sanur, and Nusa Dua are popular resort towns. The island is also known for its yoga and meditation retreats.', 
      image: '/images/place_4.jpg' 
    },
    { 
      name: 'lotus-temple', 
      description: 'The Lotus Temple, located in Delhi, India, is one of the most visited buildings in the world. This architectural marvel, completed in 1986, is shaped like a lotus flower with 27 free-standing marble-clad "petals" arranged in clusters of three to form nine sides. As a Bahá\'í House of Worship, it welcomes people of all faiths to pray and meditate in its serene atmosphere. The temple\'s design symbolizes peace, purity, and unity, while its nine doors open to a central hall that can accommodate up to 2,500 people. The surrounding gardens and pools enhance the temple\'s beauty, making it a perfect place for reflection and spiritual connection.', 
      image: '/images/Lotus-temple.png' 
    },
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
  <div className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-20 py-6">
    <h1 className="text-2xl sm:text-3xl font-bold mb-4">{place.name}</h1>
    
    <img 
      src={place.image} 
      alt={place.name} 
      className="w-full h-48 sm:h-64 md:h-80 object-cover rounded-lg mb-4"
    />
    
    <p className="text-base sm:text-lg">{place.description}</p>
  </div>
);

};

export default PopularPlacePage;
