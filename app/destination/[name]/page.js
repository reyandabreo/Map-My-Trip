"use client";
import { useParams } from 'next/navigation';
import React from 'react';
import { useState } from 'react';
import { FaCalendarDay, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const destinationData = {
  'seychelles-island': {
    description: "Seychelles Island is an exotic paradise located in the Indian Ocean known for its beautiful beaches and coral reefs.",
    activities: ["Snorkeling", "Diving", "Beach Walks"],
    image: "/images/seychelles.jpg",
    location: "Indian Ocean",
    rating: "4.7",
    itinerary: {
      day1: {
        morning: "08:00 AM - Arrival and beach relaxation at Anse Lazio.",
        afternoon: "12:00 PM - Explore local markets and cultural spots.",
        evening: "05:00 PM - Sunset at Beau Vallon Beach.",
        night: "08:00 PM - Dinner at a seaside restaurant."
      },
      day2: {
        morning: "07:30 AM - Snorkeling and exploring the marine park.",
        afternoon: "01:00 PM - Visit botanical gardens and nature trails.",
        evening: "04:30 PM - Boat ride to nearby islands.",
        night: "07:30 PM - Beach bonfire and local music."
      },
      day3: {
        morning: "09:00 AM - Island hopping and cultural tour.",
        afternoon: "12:30 PM - Relaxation at a private beach resort.",
        evening: "05:00 PM - Shopping for souvenirs.",
        night: "08:00 PM - Departure or extended stay."
      }
    }
  },
  'bora-bora-island': {
    description: "Bora Bora is a luxury island destination famous for its turquoise waters and stunning overwater bungalows.",
    activities: ["Water Sports", "Relaxation", "Boat Tours"],
    image: "/images/bora-bora.jpg",
    location: "Polynesia",
    rating: "4.3",
    itinerary: {
      day1: {
        morning: "09:00 AM - Check-in to an overwater bungalow and island tour.",
        afternoon: "12:30 PM - Relax on Matira Beach.",
        evening: "05:30 PM - Sunset boat tour.",
        night: "08:00 PM - Polynesian cultural show."
      },
      day2: {
        morning: "08:00 AM - Snorkeling in coral gardens.",
        afternoon: "01:00 PM - Jet skiing and water sports.",
        evening: "04:30 PM - Visit to a pearl farm.",
        night: "07:30 PM - Dinner by the lagoon."
      },
      day3: {
        morning: "09:30 AM - Exploring local villages and markets.",
        afternoon: "12:00 PM - Canoeing around the island.",
        evening: "04:00 PM - Spa and relaxation.",
        night: "08:00 PM - Farewell beach party."
      }
    }
  },
  'maldives-island': {
    description: "The Maldives is known for its crystal-clear waters, coral reefs, and luxurious overwater villas.",
    activities: ["Diving", "Snorkeling", "Beach Relaxation"],
    image: "/images/maldives.jpg",
    location: "Indian Ocean",
    rating: "4.9",
    itinerary: {
      day1: {
        morning: "08:00 AM - Check-in to a water villa and breakfast with an ocean view.",
        afternoon: "01:00 PM - Scuba diving at Banana Reef.",
        evening: "05:00 PM - Sunset cruise with dolphin watching.",
        night: "07:30 PM - Romantic dinner on the beach."
      },
      day2: {
        morning: "07:30 AM - Snorkeling adventure at Hanifaru Bay.",
        afternoon: "12:30 PM - Explore local Maldivian culture and shops.",
        evening: "04:30 PM - Kayaking and paddleboarding.",
        night: "08:00 PM - Night fishing experience."
      },
      day3: {
        morning: "09:00 AM - Relax at the beach and enjoy a spa treatment.",
        afternoon: "12:30 PM - Lunch at an underwater restaurant.",
        evening: "04:30 PM - Visit to a private island.",
        night: "08:30 PM - Stargazing by the ocean."
      }
    }
  },
  'santorini-island': {
    description: "Santorini is a Greek island famous for its white-washed buildings, stunning sunsets, and volcanic landscapes.",
    activities: ["Hiking", "Wine Tours", "Boat Rides"],
    image: "/images/santorini.jpg",
    location: "Greece",
    rating: "4.5",
    itinerary: {
      day1: {
        morning: "09:00 AM - Explore Fira and Oia, enjoy the caldera views.",
        afternoon: "12:30 PM - Visit Red Beach and swim in the Aegean Sea.",
        evening: "05:30 PM - Sunset at Oia Castle.",
        night: "08:00 PM - Greek cuisine dining experience."
      },
      day2: {
        morning: "08:30 AM - Tour Akrotiri ruins.",
        afternoon: "01:00 PM - Visit a local winery for wine tasting.",
        evening: "04:30 PM - Boat ride around the volcano.",
        night: "07:30 PM - Live music and cultural dance."
      },
      day3: {
        morning: "09:00 AM - Hike from Fira to Oia.",
        afternoon: "12:30 PM - Shopping for souvenirs in local markets.",
        evening: "04:30 PM - Beachside relaxation.",
        night: "08:00 PM - Departure or extended stay."
      }
    }
  },

'bali-island': {
    description: "Bali is an Indonesian paradise known for its forested volcanic mountains, iconic rice paddies, beaches, and coral reefs.",
    activities: ["Surfing", "Temple Visits", "Beach Walks"],
    image: "/images/bali.jpg",
    location: "Indonesia",
    rating: "4.9",
    itinerary: {
      day1: {
        morning: "08:00 AM - Visit Uluwatu Temple.",
        afternoon: "12:30 PM - Explore Ubud's rice terraces.",
        evening: "05:00 PM - Sunset at Tanah Lot.",
        night: "08:00 PM - Traditional Balinese dance show."
      },
      day2: {
        morning: "07:30 AM - Surfing at Kuta Beach.",
        afternoon: "12:00 PM - Visit Tirta Empul Water Temple.",
        evening: "04:30 PM - Relaxation at Seminyak Beach.",
        night: "07:30 PM - Seafood dinner at Jimbaran Bay."
      },
      day3: {
        morning: "09:00 AM - Snorkeling in Nusa Penida.",
        afternoon: "12:30 PM - Spa and wellness retreat.",
        evening: "05:00 PM - Explore Bali’s night markets.",
        night: "08:00 PM - Departure or extended stay."
      }
    }
  },
  'maui-island': {
    description: "Maui is a Hawaiian island known for its diverse landscapes, scenic beaches, and the famous Road to Hana.",
    activities: ["Hiking", "Snorkeling", "Beach Time"],
    image: "/images/maui.jpg",
    location: "Hawaii, USA",
    rating: "4.9",
    itinerary: {
      day1: {
        morning: "08:00 AM - Drive along the Road to Hana.",
        afternoon: "12:30 PM - Explore waterfalls and bamboo forests.",
        evening: "05:30 PM - Sunset at Haleakalā National Park.",
        night: "08:00 PM - Hawaiian luau dinner."
      },
      day2: {
        morning: "07:30 AM - Snorkeling at Molokini Crater.",
        afternoon: "12:30 PM - Visit Iao Valley State Park.",
        evening: "04:30 PM - Beach relaxation at Kaanapali.",
        night: "07:30 PM - Stargazing at Haleakalā."
      },
      day3: {
        morning: "09:00 AM - Whale watching tour.",
        afternoon: "12:30 PM - Explore Lahaina town.",
        evening: "05:00 PM - Sunset dinner cruise.",
        night: "08:00 PM - Departure or extended stay."
      }
    }
  },

'capri-island': {
    description: "Capri is an island in Italy known for its rugged landscape, upscale hotels, and high-end shops.",
    activities: ["Boat Tours", "Shopping", "Exploring the Blue Grotto"],
    image: "/images/capri.jpg",
    location: "Italy",
    rating: "4.7",
    itinerary: {
      day1: {
        morning: "09:00 AM - Boat tour around the island.",
        afternoon: "12:30 PM - Visit the Blue Grotto.",
        evening: "05:00 PM - Explore Piazzetta and local shops.",
        night: "08:00 PM - Italian fine dining."
      },
      day2: {
        morning: "08:30 AM - Hiking up Mount Solaro.",
        afternoon: "12:30 PM - Relax at Marina Piccola Beach.",
        evening: "04:30 PM - Sunset at Gardens of Augustus.",
        night: "07:30 PM - Enjoy a live music performance."
      },
      day3: {
        morning: "09:00 AM - Visit Villa Jovis and historical sites.",
        afternoon: "12:30 PM - Take a scenic chairlift ride.",
        evening: "04:30 PM - Enjoy a farewell boat ride.",
        night: "08:00 PM - Departure or extended stay."
      }
    }
  },
  'fiji-island': {
    description: "Fiji is an archipelago in the South Pacific known for its clear lagoons, coral reefs, and palm-lined beaches.",
    activities: ["Snorkeling", "Diving", "Beach Relaxation"],
    image: "/images/fiji.jpg",
    location: "South Pacific",
    rating: "4.4",
    itinerary: {
      day1: {
        morning: "08:00 AM - Arrival and beachfront relaxation.",
        afternoon: "12:30 PM - Snorkeling at Coral Coast.",
        evening: "05:00 PM - Sunset at Natadola Beach.",
        night: "08:00 PM - Traditional Fijian Meke dance."
      },
      day2: {
        morning: "07:30 AM - Scuba diving adventure.",
        afternoon: "12:30 PM - Visit a local village.",
        evening: "04:30 PM - Kayaking around the islands.",
        night: "07:30 PM - Beach BBQ dinner."
      },
      day3: {
        morning: "09:00 AM - Island hopping tour.",
        afternoon: "12:30 PM - Spa and wellness retreat.",
        evening: "05:00 PM - Cultural performance.",
        night: "08:00 PM - Departure or extended stay."
      }
    }
  },

'yosemite': {
    description: "Yosemite National Park is known for its stunning granite cliffs, waterfalls, and giant sequoia trees.",
    activities: ["Hiking", "Rock Climbing", "Photography"],
    image: "/images/yosemite.jpg",
    location: "California, USA",
    rating: "4.8",
    itinerary: {
      day1: {
        morning: "08:00 AM - Hike to Yosemite Falls.",
        afternoon: "12:30 PM - Picnic at Glacier Point.",
        evening: "04:30 PM - Sunset at Tunnel View.",
        night: "08:00 PM - Stargazing at Yosemite Valley."
      },
      day2: {
        morning: "07:30 AM - Rock climbing at El Capitan.",
        afternoon: "12:30 PM - Explore Mariposa Grove of Giant Sequoias.",
        evening: "05:00 PM - Wildlife spotting in the meadows.",
        night: "08:00 PM - Campfire and storytelling."
      },
      day3: {
        morning: "09:00 AM - Scenic drive through Tioga Pass.",
        afternoon: "12:30 PM - Visit Mirror Lake for photography.",
        evening: "04:30 PM - Relax by Merced River.",
        night: "08:00 PM - Departure or extended stay."
      }
    }
  },
  'banff-national-park': {
    description: "Banff National Park in Canada is renowned for its majestic mountains, crystal-clear lakes, and abundant wildlife.",
    activities: ["Hiking", "Wildlife Viewing", "Lake Tours"],
    image: "/images/banff.jpg",
    location: "Canada",
    rating: "4.9",
    itinerary: {
      day1: {
        morning: "08:00 AM - Hike to Johnston Canyon.",
        afternoon: "12:30 PM - Visit Lake Louise.",
        evening: "04:30 PM - Canoeing at Moraine Lake.",
        night: "08:00 PM - Relax at a hot spring."
      },
      day2: {
        morning: "07:30 AM - Drive along Icefields Parkway.",
        afternoon: "12:30 PM - Explore Athabasca Glacier.",
        evening: "05:00 PM - Wildlife spotting in the park.",
        night: "08:00 PM - Camp under the stars."
      },
      day3: {
        morning: "09:00 AM - Sunrise hike at Tunnel Mountain.",
        afternoon: "12:30 PM - Explore Banff town and souvenir shopping.",
        evening: "04:30 PM - Relax by Bow River.",
        night: "08:00 PM - Departure or extended stay."
      }
    }
  },
  'grand-canyon': {
    description: "The Grand Canyon is a massive gorge in the USA known for its immense size and its colorful, layered rock formations.",
    activities: ["Hiking", "Helicopter Tours", "River Rafting"],
    image: "/images/grand-canyon.jpg",
    location: "USA",
    rating: "4.9",
    itinerary: {
      day1: {
        morning: "08:00 AM - Hike the Bright Angel Trail.",
        afternoon: "12:30 PM - Lunch at the South Rim.",
        evening: "05:00 PM - Sunset at Hopi Point.",
        night: "08:00 PM - Stargazing at Desert View."
      },
      day2: {
        morning: "07:30 AM - Helicopter tour over the canyon.",
        afternoon: "12:30 PM - River rafting in the Colorado River.",
        evening: "04:30 PM - Visit Grand Canyon Village.",
        night: "08:00 PM - Campfire and storytelling."
      },
      day3: {
        morning: "09:00 AM - Hike the South Kaibab Trail.",
        afternoon: "12:30 PM - Explore the Visitor Center and museums.",
        evening: "05:00 PM - Scenic drive along Desert View Drive.",
        night: "08:00 PM - Departure or extended stay."
      }
    }
  },

  'kruger-national-park': {
    description: "Kruger National Park is one of Africa’s largest game reserves, offering incredible safari experiences and wildlife viewing.",
    activities: ["Safari", "Wildlife Viewing", "Photography"],
    image: "/images/kruger.jpg",
    location: "South Africa",
    rating: "4.6",
    itinerary: {
      day1: {
        morning: "06:00 AM - Sunrise safari drive.",
        afternoon: "12:30 PM - Lunch at a game lodge.",
        evening: "04:30 PM - Evening game drive.",
        night: "08:00 PM - Campfire and traditional African dinner."
      },
      day2: {
        morning: "07:30 AM - Guided walking safari.",
        afternoon: "12:30 PM - Visit Kruger Museum and cultural center.",
        evening: "05:00 PM - Sunset river cruise.",
        night: "08:00 PM - Night safari experience."
      },
      day3: {
        morning: "09:00 AM - Birdwatching and nature walk.",
        afternoon: "12:30 PM - Relax at the lodge with spa options.",
        evening: "04:30 PM - Final safari drive.",
        night: "08:00 PM - Departure or extended stay."
      }
    }
  },
  'niagara-falls': {
    description: "Niagara Falls is a group of massive waterfalls located on the border between Canada and the USA, known for its sheer size and power.",
    activities: ["Boat Tours", "Sightseeing", "Hiking"],
    image: "/images/niagara.jpg",
    location: "Canada",
    rating: "4.8",
    itinerary: {
      day1: {
        morning: "09:00 AM - Visit the Niagara Falls observation deck.",
        afternoon: "12:30 PM - Enjoy a boat ride on the Maid of the Mist.",
        evening: "05:00 PM - Walk along the illuminated falls.",
        night: "08:00 PM - Dinner with a falls view."
      },
      day2: {
        morning: "08:30 AM - Explore the Journey Behind the Falls.",
        afternoon: "12:30 PM - Visit Niagara-on-the-Lake wineries.",
        evening: "04:30 PM - Relax by the falls with scenic views.",
        night: "08:00 PM - Attend a fireworks show over the falls."
      },
      day3: {
        morning: "09:00 AM - Hike through Niagara Glen Nature Reserve.",
        afternoon: "12:30 PM - Explore Clifton Hill attractions.",
        evening: "05:00 PM - Scenic helicopter ride over the falls.",
        night: "08:00 PM - Departure or extended stay."
      }
    }
  },
};

const ItineraryTracker = ({ itinerary }) => {
  const [status, setStatus] = useState(
    Object.keys(itinerary).reduce((acc, day) => {
      acc[day] = {
        morning: null,
        afternoon: null,
        evening: null,
        night: null
      };
      return acc;
    }, {})
  );

  const handleStatusChange = (day, time) => {
    setStatus((prevStatus) => ({
      ...prevStatus,
      [day]: {
        ...prevStatus[day],
        [time]: prevStatus[day][time] === 'done' ? 'canceled' : 'done'
      }
    }));
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-gray-100 rounded-lg shadow-lg">
      <div className="relative border-l-4 border-blue-500 pl-6 space-y-6">
        {Object.keys(itinerary).map((day, dayIndex) => (
          <div key={day} className="relative">
            <div className="absolute -left-8 w-6 h-6 bg-blue-500 rounded-full border-4 border-white flex items-center justify-center">
              <FaCalendarDay className="text-white text-sm" />
            </div>
            <h2 className="text-xl font-extrabold text-blue-700 flex items-center gap-2">
              <FaCalendarDay className="text-blue-500" /> {day.replace('-', ' ')}
            </h2>
            <div className="ml-6 border-l-2 border-gray-400 pl-4 mt-2 space-y-4">
              {Object.keys(itinerary[day]).map((time, index) => (
                <div key={`${day}-${time}`} className="bg-white p-4 rounded-lg shadow-md border border-gray-300 relative flex flex-col items-start">
                  <div className="absolute -left-6 w-4 h-4 bg-gray-400 rounded-full"></div>
                  <span className="block text-gray-800 font-semibold text-lg">{itinerary[day][time]}</span>
                  <div className="flex space-x-2 mt-2">
                    <button
                      className={`px-3 py-1 rounded-md flex items-center gap-2 ${status[day][time] === 'done' ? 'bg-green-500 text-white' : 'bg-gray-300'}`}
                      onClick={() => handleStatusChange(day, time)}
                    >
                      <FaCheckCircle /> Done
                    </button>
                    <button
                      className={`px-3 py-1 rounded-md flex items-center gap-2 ${status[day][time] === 'canceled' ? 'bg-red-500 text-white' : 'bg-gray-300'}`}
                      onClick={() => handleStatusChange(day, time)}
                    >
                      <FaTimesCircle /> Cancel
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
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
      <ItineraryTracker itinerary={destination.itinerary} />
    </div>    
  );
};

export default DestinationDetails;
