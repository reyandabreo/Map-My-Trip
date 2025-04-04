"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FaPlane, FaHotel, FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa';
import { ArrowLeft } from 'lucide-react';

const CreateWithAi = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    destination: '',
    startDate: '',
    endDate: '',
    preferences: '',
    budget: 'medium',
    travelStyle: 'balanced'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Calculate number of days based on start and end dates
    const startDate = new Date(formData.startDate);
    const endDate = new Date(formData.endDate);
    const diffTime = Math.abs(endDate - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    
    // Generate a more dynamic itinerary based on user preferences
    const generatedItinerary = generateItinerary(formData, diffDays);
    
    // Create a new object that includes budget and travel style
    const fullItineraryData = {
      destination: formData.destination,
      startDate: formData.startDate,
      endDate: formData.endDate,
      budget: formData.budget,
      travelStyle: formData.travelStyle,
      itinerary: generatedItinerary
    };
    
    // Retrieve existing saved trips from local storage
    const existingTrips = JSON.parse(localStorage.getItem('savedItineraries') || '[]');
    
    // Check if trip already exists to avoid duplicates
    const isDuplicate = existingTrips.some(
      trip => trip.destination === fullItineraryData.destination && 
              JSON.stringify(trip.itinerary) === JSON.stringify(fullItineraryData.itinerary)
    );

    if (!isDuplicate) {
      // Add new trip
      const updatedTrips = [...existingTrips, {
        ...fullItineraryData,
        id: Date.now(),
        savedAt: new Date().toISOString()
      }];
      localStorage.setItem('savedItineraries', JSON.stringify(updatedTrips));
    }
    
    // Encode the itinerary and navigate to the itinerary page
    const encodedItinerary = encodeURIComponent(JSON.stringify(generatedItinerary));
    router.push(`/itinerary?itinerary=${encodedItinerary}&budget=${formData.budget}&travelStyle=${formData.travelStyle}`);
  };

  // Generate location names based on destination and budget
  const generateLocationNames = (destination, budget) => {
    // Budget-specific prefixes and suffixes
    const budgetPrefixes = {
      low: ['Budget', 'Economy', 'Simple', 'Basic', 'Affordable'],
      medium: ['Comfort', 'Standard', 'Central', 'Grand', 'Royal'],
      high: ['Luxury', 'Premium', 'Exclusive', 'Elite', 'Presidential']
    };
    
    const budgetSuffixes = {
      low: ['Inn', 'Lodge', 'Hostel', 'Guesthouse', 'Motel'],
      medium: ['Hotel', 'Resort', 'Suites', 'Plaza', 'Tower'],
      high: ['Palace', 'Villa', 'Manor', 'Estate', 'Chateau']
    };
    
    // Price ranges based on budget
    const priceRanges = {
      low: {
        hotel: '$50-100/night',
        restaurant: '$10-20/person',
        cafe: '$5-10/person',
        attraction: '$5-15/person',
        shopping: '$10-30/item',
        flight: '$200-400/round trip'
      },
      medium: {
        hotel: '$100-200/night',
        restaurant: '$20-40/person',
        cafe: '$10-20/person',
        attraction: '$15-30/person',
        shopping: '$30-100/item',
        flight: '$400-800/round trip'
      },
      high: {
        hotel: '$200-500/night',
        restaurant: '$40-100/person',
        cafe: '$20-40/person',
        attraction: '$30-100/person',
        shopping: '$100-300/item',
        flight: '$800-2000/round trip'
      }
    };
    
    // Get random prefix and suffix based on budget
    const prefix = budgetPrefixes[budget][Math.floor(Math.random() * budgetPrefixes[budget].length)];
    const suffix = budgetSuffixes[budget][Math.floor(Math.random() * budgetSuffixes[budget].length)];
    
    // Generate location names with prices
    return {
      airport: {
        name: `${destination} International Airport`,
        price: priceRanges[budget].flight
      },
      hotel: {
        name: `${prefix} ${destination} ${suffix}`,
        price: priceRanges[budget].hotel
      },
      restaurants: [
        {
          name: `${destination} Bistro`,
          price: priceRanges[budget].restaurant
        },
        {
          name: `${destination} Kitchen`,
          price: priceRanges[budget].restaurant
        },
        {
          name: `${prefix} ${destination} Restaurant`,
          price: priceRanges[budget].restaurant
        },
        {
          name: `${destination} Food Court`,
          price: priceRanges[budget].restaurant
        },
        {
          name: `${destination} Cafe & Restaurant`,
          price: priceRanges[budget].restaurant
        }
      ],
      cafes: [
        {
          name: `${destination} Coffee House`,
          price: priceRanges[budget].cafe
        },
        {
          name: `${destination} Cafe`,
          price: priceRanges[budget].cafe
        },
        {
          name: `${prefix} ${destination} Cafe`,
          price: priceRanges[budget].cafe
        },
        {
          name: `${destination} Tea Room`,
          price: priceRanges[budget].cafe
        },
        {
          name: `${destination} Bakery & Cafe`,
          price: priceRanges[budget].cafe
        }
      ],
      attractions: [
        {
          name: `${destination} City Center`,
          price: priceRanges[budget].attraction
        },
        {
          name: `${destination} Historic District`,
          price: priceRanges[budget].attraction
        },
        {
          name: `${destination} Botanical Gardens`,
          price: priceRanges[budget].attraction
        },
        {
          name: `${destination} Waterfront`,
          price: priceRanges[budget].attraction
        },
        {
          name: `${destination} Observation Deck`,
          price: priceRanges[budget].attraction
        },
        {
          name: `${destination} Cultural Center`,
          price: priceRanges[budget].attraction
        },
        {
          name: `${destination} Old Town`,
          price: priceRanges[budget].attraction
        },
        {
          name: `${destination} Market Square`,
          price: priceRanges[budget].attraction
        },
        {
          name: `${destination} Cathedral`,
          price: priceRanges[budget].attraction
        },
        {
          name: `${destination} Castle`,
          price: priceRanges[budget].attraction
        }
      ],
      parks: [
        {
          name: `${destination} Central Park`,
          price: 'Free'
        },
        {
          name: `${destination} Memorial Park`,
          price: 'Free'
        },
        {
          name: `${destination} Riverside Park`,
          price: 'Free'
        },
        {
          name: `${destination} City Park`,
          price: 'Free'
        },
        {
          name: `${destination} Botanical Gardens`,
          price: priceRanges[budget].attraction
        }
      ],
      museums: [
        {
          name: `${destination} Museum of Art`,
          price: priceRanges[budget].attraction
        },
        {
          name: `${destination} History Museum`,
          price: priceRanges[budget].attraction
        },
        {
          name: `${destination} Science Museum`,
          price: priceRanges[budget].attraction
        },
        {
          name: `${destination} Natural History Museum`,
          price: priceRanges[budget].attraction
        },
        {
          name: `${destination} Modern Art Gallery`,
          price: priceRanges[budget].attraction
        }
      ],
      shopping: [
        {
          name: `${destination} Shopping Mall`,
          price: priceRanges[budget].shopping
        },
        {
          name: `${destination} Market`,
          price: priceRanges[budget].shopping
        },
        {
          name: `${destination} Shopping District`,
          price: priceRanges[budget].shopping
        },
        {
          name: `${destination} Plaza`,
          price: priceRanges[budget].shopping
        },
        {
          name: `${destination} Bazaar`,
          price: priceRanges[budget].shopping
        }
      ]
    };
  };

  // Generate a more dynamic itinerary based on user preferences
  const generateItinerary = (data, numDays) => {
    const destination = data.destination;
    const travelStyle = data.travelStyle;
    const preferences = data.preferences.toLowerCase();
    const budget = data.budget;
    
    // Define activity types based on travel style
    const activityTypes = {
      relaxed: ['food', 'hotel', 'beach', 'attraction'],
      balanced: ['food', 'hotel', 'attraction', 'city', 'hiking'],
      active: ['hiking', 'city', 'attraction', 'food', 'hotel']
    };
    
    // Generate location names based on destination and budget
    const locationNames = generateLocationNames(destination, budget);
    
    // Define common attractions based on preferences
    const commonAttractions = {
      beach: ['Beach', 'Waterfront', 'Coastal Walk', 'Lighthouse', 'Marina'],
      hiking: ['Mountain Trail', 'National Park', 'Forest Path', 'Scenic Viewpoint', 'Nature Reserve'],
      city: ['City Center', 'Historic District', 'Shopping District', 'Museum', 'Art Gallery'],
      food: ['Local Market', 'Food District', 'Traditional Restaurant', 'Cafe', 'Street Food Area'],
      culture: ['Museum', 'Historic Site', 'Cultural Center', 'Theater', 'Gallery']
    };
    
    // Determine which attractions to include based on preferences
    const attractionsToInclude = [];
    Object.keys(commonAttractions).forEach(category => {
      if (preferences.includes(category)) {
        attractionsToInclude.push(...commonAttractions[category]);
      }
    });
    
    // If no specific preferences, include a mix
    if (attractionsToInclude.length === 0) {
      Object.values(commonAttractions).forEach(attractions => {
        attractionsToInclude.push(...attractions.slice(0, 2));
      });
    }
    
    // Generate itinerary for each day
    const itinerary = [];
    for (let day = 1; day <= numDays; day++) {
      const activities = [];
      
      // Day 1: Arrival and check-in
      if (day === 1) {
        activities.push(
          { 
            time: "09:00", 
            description: `Arrival at ${locationNames.airport.name}`, 
            type: "flight",
            price: locationNames.airport.price
          },
          { 
            time: "11:00", 
            description: `Check-in at ${locationNames.hotel.name}`, 
            type: "hotel",
            price: locationNames.hotel.price
          },
          { 
            time: "13:00", 
            description: `Lunch at ${locationNames.restaurants[0].name}`, 
            type: "food",
            price: locationNames.restaurants[0].price
          },
          { 
            time: "15:00", 
            description: `Explore ${locationNames.attractions[0].name}`, 
            type: "city",
            price: locationNames.attractions[0].price
          }
        );
      } 
      // Last day: Departure
      else if (day === numDays) {
        activities.push(
          { 
            time: "09:00", 
            description: `Breakfast at ${locationNames.hotel.name}`, 
            type: "food",
            price: "Included with hotel"
          },
          { 
            time: "11:00", 
            description: `Last-minute shopping at ${locationNames.shopping[0].name}`, 
            type: "city",
            price: locationNames.shopping[0].price
          },
          { 
            time: "13:00", 
            description: `Lunch at ${locationNames.restaurants[1].name}`, 
            type: "food",
            price: locationNames.restaurants[1].price
          },
          { 
            time: "15:00", 
            description: `Departure from ${locationNames.airport.name}`, 
            type: "flight",
            price: locationNames.airport.price
          }
        );
      }
      // Middle days: Mix of activities
      else {
        // Get random attractions for this day
        const dayAttractions = [...attractionsToInclude]
          .sort(() => 0.5 - Math.random())
          .slice(0, 2);
        
        // Get activity types based on travel style
        const dayActivityTypes = [...activityTypes[travelStyle]]
          .sort(() => 0.5 - Math.random())
          .slice(0, 4);
        
        // Get specific location names for this day
        const dayLocationNames = {
          attraction1: locationNames.attractions[Math.floor(Math.random() * locationNames.attractions.length)],
          attraction2: locationNames.attractions[Math.floor(Math.random() * locationNames.attractions.length)],
          restaurant: locationNames.restaurants[Math.floor(Math.random() * locationNames.restaurants.length)],
          cafe: locationNames.cafes[Math.floor(Math.random() * locationNames.cafes.length)],
          park: locationNames.parks[Math.floor(Math.random() * locationNames.parks.length)],
          museum: locationNames.museums[Math.floor(Math.random() * locationNames.museums.length)]
        };
        
        activities.push(
          { 
            time: "09:00", 
            description: `Breakfast at ${locationNames.hotel.name}`, 
            type: "food",
            price: "Included with hotel"
          },
          { 
            time: "10:00", 
            description: `Visit ${dayLocationNames.attraction1.name}`, 
            type: dayActivityTypes[0],
            price: dayLocationNames.attraction1.price
          },
          { 
            time: "13:00", 
            description: `Lunch at ${dayLocationNames.restaurant.name}`, 
            type: "food",
            price: dayLocationNames.restaurant.price
          },
          { 
            time: "15:00", 
            description: `Explore ${dayLocationNames.attraction2.name}`, 
            type: dayActivityTypes[1],
            price: dayLocationNames.attraction2.price
          }
        );
      }
      
      itinerary.push({
        day,
        activities
      });
    }
    
    return itinerary;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 
    py-6 px-4 sm:px-6 lg:px-8 
    bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] 
    bg-opacity-50
    relative
    overflow-hidden
    before:absolute 
    before:inset-0 
    before:bg-[radial-gradient(circle_at_top_right,_rgba(59,130,246,0.1)_0%,_transparent_20%)] 
    before:opacity-50 
    before:pointer-events-none">
      <div className="max-w-3xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-xl p-6 md:p-8 relative 
          overflow-hidden
          border-t-4 border-blue-500
          before:absolute 
          before:inset-0 
          before:bg-[linear-gradient(135deg,_transparent_25%,_rgba(59,130,246,0.03)_25%,_rgba(59,130,246,0.03)_50%,_transparent_50%,_transparent_75%,_rgba(59,130,246,0.03)_75%)] 
          before:opacity-50 
          before:pointer-events-none 
          before:rounded-2xl"
        >
          {/* Back Button with Enhanced Style */}
          <button 
            onClick={() => router.back()} 
            className="absolute top-6 left-6 flex items-center 
            text-blue-600 hover:text-blue-800 
            bg-blue-50 hover:bg-blue-100 
            px-4 py-2 rounded-full 
            transition-all duration-300 
            shadow-md hover:shadow-lg 
            group z-50"
          >
            <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
            <span className="text-md font-medium">Back</span>
          </button>

          <div className="text-center mb-10">
            <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-4">
              Create Your Trip with AI
            </h1>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Unlock personalized travel experiences tailored to your preferences. Let our AI craft the perfect itinerary.
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Destination Input */}
              <div className="space-y-2">
                <label className="flex items-center text-gray-700 font-semibold mb-2">
                  <FaMapMarkerAlt className="mr-2 text-blue-500" />
                  Destination
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="destination"
                    value={formData.destination}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl 
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                    transition-all duration-300 
                    placeholder-gray-400"
                    placeholder="Where do you want to go?"
                    required
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Date Inputs */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="flex items-center text-gray-700 font-semibold mb-2">
                    <FaCalendarAlt className="mr-2 text-blue-500" />
                    Start Date
                  </label>
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl 
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                    transition-all duration-300"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="flex items-center text-gray-700 font-semibold mb-2">
                    <FaCalendarAlt className="mr-2 text-blue-500" />
                    End Date
                  </label>
                  <input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl 
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                    transition-all duration-300"
                    required
                  />
                </div>
              </div>

              {/* Travel Style */}
              <div className="space-y-2">
                <label className="flex items-center text-gray-700 font-semibold mb-2">
                  <FaPlane className="mr-2 text-blue-500" />
                  Travel Style
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['relaxed', 'balanced', 'active'].map((style) => (
                    <label 
                      key={style} 
                      className={`
                        flex items-center justify-center 
                        px-4 py-3 rounded-xl cursor-pointer 
                        transition-all duration-300
                        ${formData.travelStyle === style 
                          ? 'bg-blue-500 text-white' 
                          : 'bg-gray-100 text-gray-600 hover:bg-blue-100'}
                      `}
                    >
                      <input
                        type="radio"
                        name="travelStyle"
                        value={style}
                        checked={formData.travelStyle === style}
                        onChange={handleChange}
                        className="hidden"
                      />
                      {style.charAt(0).toUpperCase() + style.slice(1)}
                    </label>
                  ))}
                </div>
              </div>

              {/* Budget Selection */}
              <div className="space-y-2">
                <label className="text-gray-700 font-semibold mb-2">Budget</label>
                <div className="grid grid-cols-3 gap-2">
                  {['low', 'medium', 'high'].map((option) => (
                    <label 
                      key={option} 
                      className={`
                        flex items-center justify-center 
                        px-4 py-3 rounded-xl cursor-pointer 
                        transition-all duration-300
                        ${formData.budget === option 
                          ? 'bg-blue-500 text-white' 
                          : 'bg-gray-100 text-gray-600 hover:bg-blue-100'}
                      `}
                    >
                      <input
                        type="radio"
                        name="budget"
                        value={option}
                        checked={formData.budget === option}
                        onChange={handleChange}
                        className="hidden"
                      />
                      {option.charAt(0).toUpperCase() + option.slice(1)}
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Preferences Textarea */}
            <div className="space-y-2">
              <label className="text-gray-700 font-semibold">Preferences & Interests</label>
              <textarea
                name="preferences"
                value={formData.preferences}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl 
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                transition-all duration-300 
                placeholder-gray-400"
                rows="5"
                placeholder="Share your travel dreams: beaches, hiking, city exploration, culinary adventures, cultural experiences..."
              />
            </div>

            {/* Submit Button with Enhanced Styling */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 
              text-white py-4 rounded-xl font-bold 
              hover:from-blue-600 hover:to-indigo-700 
              transition-all duration-300 
              transform hover:shadow-xl 
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Generate Your Perfect Itinerary
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default CreateWithAi;

