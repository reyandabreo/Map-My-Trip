"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Calendar, MapPin, Users, Plus, Trash2, ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { motion } from 'framer-motion';

const MakeMyPlan = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [progress, setProgress] = useState(0);
  
  // Form States
  const [tripName, setTripName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [destination, setDestination] = useState('');
  const [travelers, setTravelers] = useState(1);
  const [activities, setActivities] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [budget, setBudget] = useState('');
  const [tripStyle, setTripStyle] = useState('');

  const tripStyles = [
    { id: 'relaxed', name: 'Relaxed', icon: '🌴', description: 'Peaceful and easy-going journey' },
    { id: 'adventure', name: 'Adventure', icon: '🏃‍♂️', description: 'Thrilling and active experiences' },
    { id: 'cultural', name: 'Cultural', icon: '🏛️', description: 'Deep dive into local traditions' },
    { id: 'luxury', name: 'Luxury', icon: '✨', description: 'Premium experiences and comfort' },
  ];

  const steps = [
    { number: 1, name: 'Basics', description: 'Trip essentials' },
    { number: 2, name: 'Style', description: 'Trip personality' },
    { number: 3, name: 'Activities', description: 'Things to do' },
    { number: 4, name: 'Review', description: 'Final check' },
  ];

  const updateProgress = (step) => {
    setProgress(((step - 1) / (steps.length - 1)) * 100);
  };

  const nextStep = () => {
    const next = currentStep + 1;
    setCurrentStep(next);
    updateProgress(next);
  };

  const prevStep = () => {
    const prev = currentStep - 1;
    setCurrentStep(prev);
    updateProgress(prev);
  };

  // Add this after the tripStyles constant
  const styleBasedActivities = {
    relaxed: {
      'paris': [
        'Picnic in Luxembourg Gardens',
        'Seine River Sunset Cruise',
        'Spa Day at a Luxury Hotel',
        'Wine Tasting in Montmartre',
        'Afternoon Tea at Ladurée'
      ],
      'tokyo': [
        'Tea Ceremony Experience',
        'Zen Garden Meditation',
        'Hot Springs Bath (Onsen)',
        'Peaceful Stroll in Shinjuku Gyoen',
        'Relaxing Massage in Ginza'
      ],
      // Add more destinations...
    },
    adventure: {
      'paris': [
        'Climbing Arc de Triomphe',
        'Bike Tour of Hidden Paris',
        'Catacombs Explorer Tour',
        'Parkour Workshop',
        'Seine River Kayaking'
      ],
      'tokyo': [
        'Mario Kart City Tour',
        'Robot Restaurant Show',
        'Hiking Mount Takao',
        'Ninja Training Experience',
        'Tsukiji Fish Market Dawn Tour'
      ],
      // Add more destinations...
    },
    cultural: {
      'paris': [
        'Louvre Guided Tour',
        'French Cooking Class',
        'Historical Walking Tour',
        'Opera Garnier Visit',
        'Local Market Food Tour'
      ],
      'tokyo': [
        'Sumo Wrestling Match',
        'Traditional Crafts Workshop',
        'Temple and Shrine Tour',
        'Kimono Wearing Experience',
        'Japanese Calligraphy Class'
      ],
      // Add more destinations...
    },
    luxury: {
      'paris': [
        'Private Eiffel Tower Dining',
        'Champagne Tasting Experience',
        'Luxury Shopping with Personal Stylist',
        'Michelin Star Restaurant Tour',
        'Private Palace of Versailles Tour'
      ],
      'tokyo': [
        'Private Sushi Making with Master Chef',
        'Helicopter City Tour',
        'Premium Sake Tasting',
        'Private Tea Ceremony',
        'Luxury Ryokan Stay Experience'
      ],
      // Add more destinations...
    }
  };

  // Update the getRecommendations function
  const getRecommendations = () => {
    const destinationLower = destination.toLowerCase();
    
    // Get general recommendations for unknown destinations
    const generalRecommendations = {
      relaxed: [
        'Spa & Wellness Session',
        'Scenic Nature Walk',
        'Sunset Viewing',
        'Local Cafe Experience',
        'Garden Visit'
      ],
      adventure: [
        'Local Hiking Trail',
        'Water Sports Activity',
        'Bike Tour',
        'Rock Climbing',
        'Adventure Park Visit'
      ],
      cultural: [
        'Museum Visit',
        'Local Cooking Class',
        'Historical Site Tour',
        'Traditional Art Workshop',
        'Local Festival/Event'
      ],
      luxury: [
        'Fine Dining Experience',
        'Private City Tour',
        'Premium Shopping Trip',
        'Exclusive Entertainment',
        'High-end Spa Treatment'
      ]
    };

    // If we have specific recommendations for this destination and style
    if (styleBasedActivities[tripStyle]?.[destinationLower]) {
      setRecommendations(styleBasedActivities[tripStyle][destinationLower]);
    } else {
      // Use general recommendations based on style
      setRecommendations(generalRecommendations[tripStyle] || []);
    }
  };

  // Render different steps
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-2xl font-bold mb-6">Let's Start with the Basics! ✈️</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">What should we call your adventure?</label>
                <input
                  type="text"
                  value={tripName}
                  onChange={(e) => setTripName(e.target.value)}
                  className="w-full p-3 border rounded-lg"
                  placeholder="e.g., Summer Escape 2024"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-2">When does the journey begin?</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 text-gray-400" size={20} />
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full p-3 pl-12 border rounded-lg"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">When does it end?</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 text-gray-400" size={20} />
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      min={startDate}
                      className="w-full p-3 pl-12 border rounded-lg"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Where are you headed?</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 text-gray-400" size={20} />
                  <input
                    type="text"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="w-full p-3 pl-12 border rounded-lg"
                    placeholder="e.g., Paris, France"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 mb-2">How many adventurers are joining?</label>
                <div className="relative">
                  <Users className="absolute left-3 top-3 text-gray-400" size={20} />
                  <input
                    type="number"
                    value={travelers}
                    onChange={(e) => setTravelers(parseInt(e.target.value))}
                    min="1"
                    className="w-full p-3 pl-12 border rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-2xl font-bold mb-6">What's Your Travel Style? 🎨</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {tripStyles.map((style) => (
                <motion.div
                  key={style.id}
                  onClick={() => setTripStyle(style.id)}
                  className={`p-6 rounded-lg border-2 cursor-pointer relative ${
                    tripStyle === style.id
                      ? 'border-orange-500 bg-orange-50'
                      : 'border-gray-200 hover:border-orange-200'
                  }`}
                  whileHover={{ 
                    scale: 1.02,
                    transition: { duration: 0.2 }
                  }}
                  whileTap={{ 
                    scale: 0.98,
                    transition: { duration: 0.1 }
                  }}
                  animate={tripStyle === style.id ? {
                    y: [0, -2, 0],
                    transition: {
                      duration: 0.2,
                      ease: "easeOut"
                    }
                  } : {}}
                >
                  <motion.div
                    animate={tripStyle === style.id ? {
                      rotate: [0, -2, 2, 0],
                      transition: {
                        duration: 0.3,
                        ease: "easeInOut"
                      }
                    } : {}}
                    className="text-4xl mb-2"
                  >
                    {style.icon}
                  </motion.div>
                  <motion.h3 
                    className="text-xl font-semibold mb-2"
                    animate={tripStyle === style.id ? {
                      scale: [1, 1.05, 1],
                      transition: { duration: 0.2 }
                    } : {}}
                  >
                    {style.name}
                  </motion.h3>
                  <p className="text-gray-600">{style.description}</p>
                  
                  {tripStyle === style.id && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-2 right-2 bg-orange-500 text-white rounded-full p-1"
                    >
                      <Check size={16} />
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <label className="block text-gray-700 mb-2">What's your budget range? 💰</label>
              <select
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="w-full p-3 border rounded-lg"
              >
                <option value="">Select budget range</option>
                <option value="budget">Budget ($)</option>
                <option value="moderate">Moderate ($$)</option>
                <option value="luxury">Luxury ($$$)</option>
              </select>
            </motion.div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-2xl font-bold mb-6">
              Plan Your {tripStyle.charAt(0).toUpperCase() + tripStyle.slice(1)} Activities! 🎯
            </h2>
            
            <div className="bg-orange-50 p-4 rounded-lg mb-6">
              <p className="text-gray-700">
                {tripStyle === 'relaxed' && "Based on your relaxed style, we've suggested some peaceful and enjoyable activities."}
                {tripStyle === 'adventure' && "Get ready for some exciting activities that match your adventurous spirit!"}
                {tripStyle === 'cultural' && "Dive deep into local culture with these carefully selected activities."}
                {tripStyle === 'luxury' && "Experience the finest activities that cater to your luxury preferences."}
              </p>
            </div>

            {recommendations.length > 0 && (
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-4">
                  Recommended for {tripStyle.charAt(0).toUpperCase() + tripStyle.slice(1)} Travelers in {destination}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {recommendations.map((rec, index) => (
                    <div
                      key={index}
                      onClick={() => {
                        const timeSlot = `Day ${Math.floor(index / 2 + 1)} - ${
                          index % 2 === 0 ? 'Morning' : 'Afternoon'
                        }`;
                        setActivities([...activities, { 
                          name: rec, 
                          time: timeSlot, 
                          location: destination 
                        }]);
                      }}
                      className="p-4 bg-white border-2 border-orange-200 rounded-lg cursor-pointer hover:border-orange-500 hover:bg-orange-50 transition-all duration-300"
                    >
                      <div className="flex items-center justify-between">
                        <p className="font-medium">{rec}</p>
                        <Plus size={20} className="text-orange-500" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold">Your Activities</h3>
                <button
                  onClick={() => setActivities([...activities, { name: '', time: '', location: '' }])}
                  className="flex items-center text-orange-500 hover:text-orange-600"
                >
                  <Plus size={20} className="mr-1" />
                  Add Activity
                </button>
              </div>

              {activities.map((activity, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input
                      type="text"
                      value={activity.name}
                      onChange={(e) => {
                        const newActivities = [...activities];
                        newActivities[index].name = e.target.value;
                        setActivities(newActivities);
                      }}
                      placeholder="Activity name"
                      className="p-2 border rounded"
                    />
                    <input
                      type="text"
                      value={activity.time}
                      onChange={(e) => {
                        const newActivities = [...activities];
                        newActivities[index].time = e.target.value;
                        setActivities(newActivities);
                      }}
                      placeholder="Time"
                      className="p-2 border rounded"
                    />
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={activity.location}
                        onChange={(e) => {
                          const newActivities = [...activities];
                          newActivities[index].location = e.target.value;
                          setActivities(newActivities);
                        }}
                        placeholder="Location"
                        className="p-2 border rounded flex-grow"
                      />
                      <button
                        onClick={() => {
                          const newActivities = activities.filter((_, i) => i !== index);
                          setActivities(newActivities);
                        }}
                        className="text-red-500 hover:text-red-600"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-2xl font-bold mb-6">Review Your Adventure! 🎉</h2>
            
            <div className="bg-white rounded-lg shadow p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold text-gray-600">Trip Name</h3>
                  <p className="text-lg">{tripName}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-600">Destination</h3>
                  <p className="text-lg">{destination}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-600">Dates</h3>
                  <p className="text-lg">{startDate} to {endDate}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-600">Travelers</h3>
                  <p className="text-lg">{travelers}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-600">Style</h3>
                  <p className="text-lg capitalize">{tripStyle}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-600">Budget</h3>
                  <p className="text-lg capitalize">{budget}</p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-600 mb-2">Planned Activities</h3>
                <div className="space-y-2">
                  {activities.map((activity, index) => (
                    <div key={index} className="bg-gray-50 p-3 rounded">
                      <p className="font-medium">{activity.name}</p>
                      <p className="text-sm text-gray-600">
                        {activity.time} at {activity.location}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Progress Bar */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="relative pt-1">
          <div className="flex mb-2 items-center justify-between">
            <div>
              <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-orange-600 bg-orange-200">
                Step {currentStep} of {steps.length}
              </span>
            </div>
            <div className="text-right">
              <span className="text-xs font-semibold inline-block text-orange-600">
                {Math.round(progress)}%
              </span>
            </div>
          </div>
          <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-orange-200">
            <div
              style={{ width: `${progress}%` }}
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-orange-500 transition-all duration-500"
            ></div>
          </div>
        </div>

        {/* Steps Indicator */}
        <div className="flex justify-between">
          {steps.map((step) => (
            <div
              key={step.number}
              className={`flex flex-col items-center ${
                currentStep >= step.number ? 'text-orange-600' : 'text-gray-400'
              }`}
            >
              <div
                className={`w-8 h-8 flex items-center justify-center rounded-full mb-2 ${
                  currentStep >= step.number ? 'bg-orange-500 text-white' : 'bg-gray-200'
                }`}
              >
                {currentStep > step.number ? <Check size={16} /> : step.number}
              </div>
              <div className="text-sm font-medium">{step.name}</div>
              <div className="text-xs">{step.description}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
        {renderStep()}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          {currentStep > 1 && (
            <button
              onClick={prevStep}
              className="flex items-center text-gray-600 hover:text-orange-500"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back
            </button>
          )}
          
          {currentStep < steps.length ? (
            <button
              onClick={nextStep}
              className="ml-auto flex items-center bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600"
            >
              Next
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
          ) : (
            <button
              onClick={() => {
                // Save trip logic here
                router.push('/navitems/Trips/ViewExistingPlan');
              }}
              className="ml-auto flex items-center bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600"
            >
              Complete Plan
              <Check className="w-5 h-5 ml-2" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MakeMyPlan;
