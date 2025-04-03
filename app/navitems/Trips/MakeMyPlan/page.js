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
  
  // New states for saving and publishing
  const [isPublic, setIsPublic] = useState(false);
  const [publishError, setPublishError] = useState('');

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

  // Expanded destination-specific activities
  const destinationActivities = {
    paris: {
      relaxed: [
        'Picnic in Luxembourg Gardens',
        'Seine River Sunset Cruise',
        'Jardin des Tuileries Stroll',
        'Café Terrace Relaxation',
        'Musée de l\'Orangerie Visit'
      ],
      adventure: [
        'Climbing Arc de Triomphe',
        'Bike Tour of Hidden Paris',
        'Catacombs Explorer Tour',
        'Seine River Kayaking',
        'Street Art Walking Tour'
      ],
      cultural: [
        'Louvre Guided Tour',
        'French Cooking Class',
        'Historical Marais District Walk',
        'Opera Garnier Visit',
        'Local Market Food Tour'
      ],
      luxury: [
        'Private Eiffel Tower Dining',
        'Champagne Tasting Experience',
        'Luxury Shopping on Champs-Élysées',
        'Michelin Star Restaurant Tour',
        'Private Palace of Versailles Tour'
      ]
    },
    tokyo: {
      relaxed: [
        'Tea Ceremony Experience',
        'Zen Garden Meditation',
        'Ueno Park Cherry Blossom Walk',
        'Traditional Onsen Bath',
        'Peaceful Stroll in Shinjuku Gyoen'
      ],
      adventure: [
        'Mount Fuji Day Trip',
        'Ninja Training Experience',
        'Tokyo Disneyland Thrills',
        'Akihabara Tech Adventure',
        'Sumo Wrestling Workshop'
      ],
      cultural: [
        'Traditional Tea Ceremony',
        'Senso-ji Temple Tour',
        'Kabuki Theater Performance',
        'Calligraphy Workshop',
        'Traditional Craft Market Visit'
      ],
      luxury: [
        'Private Sushi Making Class',
        'Helicopter City Tour',
        'Luxury Ryokan Stay',
        'High-end Sake Tasting',
        'Exclusive Robot Restaurant Experience'
      ]
    },
    london: {
      relaxed: [
        'Hyde Park Picnic',
        'Thames River Cruise',
        'Afternoon Tea Experience',
        'Kew Gardens Stroll',
        'British Museum Leisurely Tour'
      ],
      adventure: [
        'Thames River Kayaking',
        'London Bridge Climb',
        'Parkour Workshop',
        'Zip Line at The O2',
        'Urban Bike Adventure'
      ],
      cultural: [
        'Tower of London Historical Tour',
        'Shakespeare Globe Theatre Visit',
        'British Cooking Class',
        'Walking Literary Tour',
        'Royal Museums Greenwich'
      ],
      luxury: [
        'Private West End Show',
        'Luxury Shopping at Harrods',
        'Michelin Star Dining Experience',
        'Private Thames Dinner Cruise',
        'Royal Palace Private Tour'
      ]
    },
    rome: {
      relaxed: [
        'Villa Borghese Gardens Walk',
        'Trastevere Neighborhood Stroll',
        'Gelato Tasting Tour',
        'Botanical Garden Visit',
        'Sunset at Spanish Steps'
      ],
      adventure: [
        'Vespa City Tour',
        'Catacombs Exploration',
        'Bike Tour of Ancient Rome',
        'Gladiator School Experience',
        'Climbing Aventine Hill'
      ],
      cultural: [
        'Colosseum Guided Tour',
        'Vatican Museums Visit',
        'Italian Cooking Class',
        'Roman Forum Historical Walk',
        'Traditional Pasta Making Workshop'
      ],
      luxury: [
        'Private Vatican Tour',
        'Luxury Wine Tasting',
        'Designer Shopping Tour',
        'Exclusive Rooftop Dining',
        'Private Vespa and Sidecar Tour'
      ]
    },
    // Add more destinations as needed
  };

  // Update the getRecommendations function
  const getRecommendations = () => {
    const destinationLower = destination.toLowerCase().split(',')[0].trim();
    
    // Get general recommendations for unknown destinations
    const generalRecommendations = {
      relaxed: [
        'Scenic Nature Walk',
        'Local Cafe Experience',
        'Sunset Viewing',
        'Botanical Garden Visit',
        'Wellness Activity'
      ],
      adventure: [
        'Local Hiking Trail',
        'Water Sports Activity',
        'City Bike Tour',
        'Adventure Park Visit',
        'Outdoor Exploration'
      ],
      cultural: [
        'Local Museum Visit',
        'Historical Site Tour',
        'Traditional Craft Workshop',
        'Local Festival/Event',
        'Culinary Experience'
      ],
      luxury: [
        'Fine Dining Experience',
        'Private City Tour',
        'Premium Shopping',
        'Exclusive Entertainment',
        'High-end Spa Treatment'
      ]
    };

    // Check if we have specific recommendations for this destination and style
    const destinationActivitiesForStyle = destinationActivities[destinationLower]?.[tripStyle];

    if (destinationActivitiesForStyle && destinationActivitiesForStyle.length > 0) {
      // If we have specific recommendations, use those
      setRecommendations(destinationActivitiesForStyle);
    } else {
      // Fallback to general recommendations based on trip style
      setRecommendations(generalRecommendations[tripStyle] || []);
    }
  };

  // Save trip to local storage
  const saveTrip = () => {
    const tripData = {
      id: Date.now(),
      tripName,
      destination,
      startDate,
      endDate,
      travelers,
      activities,
      budget,
      tripStyle,
      createdAt: new Date().toISOString(),
      isPublic: false
    };

    // Retrieve existing saved trips
    const savedTrips = JSON.parse(localStorage.getItem('savedTrips') || '[]');
    
    // Check for duplicates
    const isDuplicate = savedTrips.some(
      trip => trip.tripName === tripName && 
              trip.destination === destination && 
              trip.startDate === startDate
    );

    if (isDuplicate) {
      alert('A similar trip plan already exists. Please use a different name or modify the details.');
      return;
    }

    // Save the trip
    savedTrips.push(tripData);
    localStorage.setItem('savedTrips', JSON.stringify(savedTrips));
    
    alert('Trip plan saved successfully!');
  };

  // Publish trip (simulated)
  const publishTrip = () => {
    // Basic validation
    if (!tripName || !destination || activities.length === 0) {
      setPublishError('Please complete all trip details before publishing.');
      return;
    }

    const publishedTripData = {
      id: Date.now(),
      tripName,
      destination,
      startDate,
      endDate,
      travelers,
      activities,
      budget,
      tripStyle,
      createdAt: new Date().toISOString(),
      isPublic: true,
      likes: 0,
      views: 0,
      author: 'CurrentUser' // In a real app, this would come from authentication
    };

    // Retrieve existing published trips
    const publishedTrips = JSON.parse(localStorage.getItem('publishedTrips') || '[]');
    
    // Check for duplicates
    const isDuplicate = publishedTrips.some(
      trip => trip.tripName === tripName && 
              trip.destination === destination && 
              trip.startDate === startDate
    );

    if (isDuplicate) {
      setPublishError('A similar trip plan is already published. Please modify the details.');
      return;
    }

    // Publish the trip
    publishedTrips.push(publishedTripData);
    localStorage.setItem('publishedTrips', JSON.stringify(publishedTrips));
    
    // Navigate to published trips or show success message
    router.push('/navitems/Trips/PublishedPlans');
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
            <h2 className="text-2xl font-bold mb-6">Plan Your Activities 🌟</h2>
            
            {/* Recommendations Section */}
            <div className="bg-blue-50 p-6 rounded-xl">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-blue-800">
                  Recommended Activities for {destination}
                </h3>
                <button 
                  onClick={getRecommendations}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Refresh Recommendations
                </button>
              </div>
              
              {recommendations.length === 0 ? (
                <div className="text-center py-4 text-gray-500">
                  <p>No recommendations yet. Click 'Refresh Recommendations'.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {recommendations.map((activity, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium text-gray-800">{activity}</h4>
                        <button 
                          onClick={() => {
                            // Add activity to the list
                            setActivities([...activities, {
                              name: activity,
                              duration: '2-3 hours',
                              notes: ''
                            }]);
                          }}
                          className="bg-green-500 text-white p-2 rounded-full hover:bg-green-600 transition-colors"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                      <p className="text-sm text-gray-500">
                        {tripStyle === 'relaxed' ? 'Relaxing' : 
                         tripStyle === 'adventure' ? 'Exciting' : 
                         tripStyle === 'cultural' ? 'Enriching' : 
                         'Premium'} experience
                      </p>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Manual Activity Addition */}
            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-4">Your Planned Activities</h3>
              {activities.map((activity, index) => (
                <div 
                  key={index} 
                  className="flex items-center bg-white p-4 rounded-lg shadow-md mb-3"
                >
                  <div className="flex-grow">
                    <input 
                      type="text" 
                      value={activity.name}
                      onChange={(e) => {
                        const newActivities = [...activities];
                        newActivities[index].name = e.target.value;
                        setActivities(newActivities);
                      }}
                      className="w-full text-gray-800 font-medium"
                      placeholder="Activity name"
                    />
                    <div className="flex space-x-2 mt-2">
                      <input 
                        type="text" 
                        value={activity.duration}
                        onChange={(e) => {
                          const newActivities = [...activities];
                          newActivities[index].duration = e.target.value;
                          setActivities(newActivities);
                        }}
                        className="w-1/2 text-sm text-gray-600 border rounded px-2 py-1"
                        placeholder="Duration (e.g., 2-3 hours)"
                      />
                      <input 
                        type="text" 
                        value={activity.notes}
                        onChange={(e) => {
                          const newActivities = [...activities];
                          newActivities[index].notes = e.target.value;
                          setActivities(newActivities);
                        }}
                        className="w-1/2 text-sm text-gray-600 border rounded px-2 py-1"
                        placeholder="Additional notes"
                      />
                    </div>
                  </div>
                  <button 
                    onClick={() => {
                      const newActivities = activities.filter((_, i) => i !== index);
                      setActivities(newActivities);
                    }}
                    className="ml-4 text-red-500 hover:text-red-600"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              ))}
              <button 
                onClick={() => setActivities([...activities, { name: '', duration: '', notes: '' }])}
                className="mt-4 w-full bg-blue-50 text-blue-600 p-3 rounded-lg border-2 border-blue-200 hover:bg-blue-100 transition-colors flex items-center justify-center"
              >
                <Plus className="mr-2" /> Add Custom Activity
              </button>
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
                        {activity.duration} - {activity.notes}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Publish and Save Options */}
              <div className="mt-6 border-t pt-4">
                <h3 className="font-semibold text-gray-600 mb-4">Finalize Your Trip</h3>
                
                {/* Publish Error Message */}
                {publishError && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
                    {publishError}
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Save Privately Option */}
                  <div 
                    onClick={saveTrip}
                    className="bg-blue-50 border border-blue-200 p-4 rounded-lg cursor-pointer hover:bg-blue-100 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-blue-800">Save Privately</h4>
                        <p className="text-sm text-blue-600">
                          Save this trip plan for your personal reference
                        </p>
                      </div>
                      <div className="bg-blue-500 text-white rounded-full p-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Publish Option */}
                  <div 
                    onClick={publishTrip}
                    className="bg-green-50 border border-green-200 p-4 rounded-lg cursor-pointer hover:bg-green-100 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-green-800">Publish Trip</h4>
                        <p className="text-sm text-green-600">
                          Share your trip plan with the community
                        </p>
                      </div>
                      <div className="bg-green-500 text-white rounded-full p-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                        </svg>
                      </div>
                    </div>
                  </div>
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
                saveTrip();
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
