"use client";
import { useEffect, useState, useRef } from "react";
import { useSearchParams,useRouter } from "next/navigation";
import { FaMapMarkerAlt, FaFlag, FaEdit, FaSave, FaTimes, FaTrophy, FaCheck, FaCamera, FaMapPin, FaCompass } from "react-icons/fa";
import { IoMdPerson, IoMdAirplane, IoMdRestaurant, IoMdBed } from "react-icons/io";
import { MdLocationOn, MdDirectionsRun, MdOutlineLocationCity, MdHiking, MdBeachAccess } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft } from 'lucide-react';

const ItineraryComponent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [itinerary, setItinerary] = useState([]);
  const [editingState, setEditingState] = useState({
    isEditing: false,
    dayIndex: null,
    activityIndex: null,
  });
  const [editForm, setEditForm] = useState({
    time: "",
    description: "",
    type: "location" // Default type
  });
  const [completedActivities, setCompletedActivities] = useState({});
  const [currentPosition, setCurrentPosition] = useState({ day: 0, activity: 0 });
  const [showConfetti, setShowConfetti] = useState(false);
  const [progressPercent, setProgressPercent] = useState(0);
  const [allCompleted, setAllCompleted] = useState(false);
  const [currentView, setCurrentView] = useState("journey"); // "journey" or "map"
  const [theme, setTheme] = useState("adventure"); // "adventure", "beach", "urban"
  const [memories, setMemories] = useState({}); // For storing photos or notes
  const personRef = useRef(null);
  const timelineRef = useRef(null);

  // Activity types with corresponding icons
  const activityIcons = {
    location: <MdLocationOn className="text-xl" />,
    food: <IoMdRestaurant className="text-xl" />,
    hotel: <IoMdBed className="text-xl" />,
    attraction: <FaCamera className="text-xl" />,
    hiking: <MdHiking className="text-xl" />,
    beach: <MdBeachAccess className="text-xl" />,
    city: <MdOutlineLocationCity className="text-xl" />,
    flight: <IoMdAirplane className="text-xl" />
  };

  // Theme styles
  const themeStyles = {
    adventure: {
      primaryColor: "from-green-500 to-emerald-700",
      secondaryColor: "bg-amber-500",
      accentColor: "bg-orange-400",
      textColor: "text-emerald-800",
      startColor: "from-green-500 to-green-700",
      finishColor: "from-amber-500 to-amber-700"
    },
    beach: {
      primaryColor: "from-blue-400 to-cyan-600",
      secondaryColor: "bg-yellow-400",
      accentColor: "bg-orange-300",
      textColor: "text-cyan-800",
      startColor: "from-blue-400 to-blue-600",
      finishColor: "from-orange-400 to-orange-600"
    },
    urban: {
      primaryColor: "from-indigo-500 to-purple-700",
      secondaryColor: "bg-slate-600",
      accentColor: "bg-pink-400",
      textColor: "text-indigo-800",
      startColor: "from-slate-600 to-slate-800",
      finishColor: "from-purple-500 to-purple-700"
    }
  };

  const currentTheme = themeStyles[theme];

  useEffect(() => {
    const itineraryParam = searchParams.get("itinerary");
    if (itineraryParam) {
      try {
        const decodedItinerary = decodeURIComponent(itineraryParam);
        const parsedItinerary = JSON.parse(decodedItinerary);
        
        // Add activity types if not already present
        const enhancedItinerary = parsedItinerary.map(day => ({
          ...day,
          activities: day.activities.map(activity => ({
            ...activity,
            type: activity.type || getRandomActivityType(),
            notes: activity.notes || "",
          }))
        }));
        
        setItinerary(enhancedItinerary);
        
        // Initialize completed activities tracking
        const initialCompleted = {};
        enhancedItinerary.forEach((day, dayIndex) => {
          day.activities.forEach((_, actIndex) => {
            initialCompleted[`${dayIndex}-${actIndex}`] = false;
          });
        });
        setCompletedActivities(initialCompleted);
      } catch (error) {
        console.error("Error parsing itinerary JSON:", error);
      }
    }
  }, [searchParams]);

  useEffect(() => {
    // Calculate overall progress
    if (Object.keys(completedActivities).length > 0) {
      const totalActivities = Object.keys(completedActivities).length;
      const completedCount = Object.values(completedActivities).filter(Boolean).length;
      const percent = (completedCount / totalActivities) * 100;
      setProgressPercent(percent);
      
      // Check if all activities are completed
      if (percent === 100 && !allCompleted) {
        setAllCompleted(true);
        celebrateCompletion();
      }
    }
  }, [completedActivities]);

  // Scroll to current position
  useEffect(() => {
    if (currentPosition && timelineRef.current) {
      const currentDayElement = document.getElementById(`day-${currentPosition.day}`);
      const currentActivityElement = document.getElementById(`activity-${currentPosition.day}-${currentPosition.activity}`);
      
      if (currentDayElement && currentActivityElement) {
        currentActivityElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [currentPosition]);

  // Generate a random activity type for variety
  const getRandomActivityType = () => {
    const types = ['location', 'food', 'hotel', 'attraction', 'hiking', 'beach', 'city', 'flight'];
    const randomIndex = Math.floor(Math.random() * types.length);
    return types[randomIndex];
  };

  // Start editing an activity
  const startEditing = (dayIndex, activityIndex, activity) => {
    setEditingState({
      isEditing: true,
      dayIndex,
      activityIndex,
    });
    setEditForm({
      time: activity.time,
      description: activity.description,
      type: activity.type || "location",
      notes: activity.notes || ""
    });
  };

  // Cancel editing
  const cancelEditing = () => {
    setEditingState({
      isEditing: false,
      dayIndex: null,
      activityIndex: null,
    });
  };

  // Save edited activity
  const saveActivity = () => {
    const { dayIndex, activityIndex } = editingState;
    const updatedItinerary = [...itinerary];
    
    updatedItinerary[dayIndex].activities[activityIndex] = {
      ...updatedItinerary[dayIndex].activities[activityIndex],
      time: editForm.time,
      description: editForm.description,
      type: editForm.type,
      notes: editForm.notes
    };
    
    setItinerary(updatedItinerary);
    cancelEditing();
  };

  // Update form values
  const handleFormChange = (e) => {
    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value,
    });
  };

  // Toggle activity completion
  const toggleComplete = (dayIndex, activityIndex) => {
    const activityKey = `${dayIndex}-${activityIndex}`;
    const newCompletedState = !completedActivities[activityKey];
    
    setCompletedActivities({
      ...completedActivities,
      [activityKey]: newCompletedState
    });

    if (newCompletedState) {
      // If completing an activity
      triggerCompletionAnimation(dayIndex, activityIndex);
      
      // Move to next checkpoint if it's the current one
      if (currentPosition.day === dayIndex && currentPosition.activity === activityIndex) {
        moveToNextCheckpoint(dayIndex, activityIndex);
      }
    }
  };

  // Add a memory (photo or note) to an activity
  const addMemory = (dayIndex, activityIndex, memoryType, content) => {
    const activityKey = `${dayIndex}-${activityIndex}`;
    
    setMemories({
      ...memories,
      [activityKey]: {
        ...(memories[activityKey] || {}),
        [memoryType]: content
      }
    });
  };

  // Trigger animation for completion
  const triggerCompletionAnimation = (dayIndex, activityIndex) => {
    // Show confetti briefly
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 2000);
  };

  // Move to next checkpoint
  const moveToNextCheckpoint = (currentDay, currentActivity) => {
    let nextDay = currentDay;
    let nextActivity = currentActivity + 1;
    
    // Check if we need to move to next day
    if (nextActivity >= itinerary[currentDay].activities.length) {
      nextDay++;
      nextActivity = 0;
    }
    
    // Check if we've reached the end
    if (nextDay < itinerary.length) {
      setCurrentPosition({ day: nextDay, activity: nextActivity });
      
      // Animate person movement
      if (personRef.current) {
        personRef.current.classList.add('moving-animation');
        setTimeout(() => {
          personRef.current.classList.remove('moving-animation');
        }, 1000);
      }
    } else {
      // Reached the end of itinerary
      celebrateCompletion();
    }
  };

  // Celebrate full completion
  const celebrateCompletion = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 5000);
  };

  // Handle manual checkpoint navigation
  const jumpToCheckpoint = (dayIndex, activityIndex) => {
    setCurrentPosition({ day: dayIndex, activity: activityIndex });
    if (personRef.current) {
      personRef.current.classList.add('jump-animation');
      setTimeout(() => {
        personRef.current.classList.remove('jump-animation');
      }, 1000);
    }
  };

  // Change theme
  const changeTheme = (newTheme) => {
    setTheme(newTheme);
  };

  return (
    
    <div className={`min-h-screen bg-gradient-to-b ${currentTheme.primaryColor} py-10 px-4 transition-colors duration-1000`}>
       {/* Back Button */}
       <button 
        onClick={() => router.back()} 
        className="absolute top-4 left-4 flex items-center text-white mb-4 hover:text-orange-900 z-50"
      >
        <ArrowLeft className="w-6 h-6 mr-2" />
        <span className="text-lg font-medium">Back</span>
      </button>
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-extrabold text-white mb-3 tracking-tight shadow-text">
            Your Adventure Journey
          </h1>
          <p className="text-white text-opacity-90 mb-6 text-lg">Follow your path from start to finish</p>
          
          {/* View and Theme Selector */}
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            <div className="flex bg-white bg-opacity-20 backdrop-blur-lg rounded-full p-1 shadow-lg">
              <button 
                onClick={() => setCurrentView("journey")}
                className={`px-4 py-2 rounded-full transition-all ${currentView === "journey" ? "bg-white text-blue-600 shadow" : "text-white"}`}
              >
                <span className="flex items-center"><FaCompass className="mr-2" /> Journey</span>
              </button>
              <button 
                onClick={() => setCurrentView("map")}
                className={`px-4 py-2 rounded-full transition-all ${currentView === "map" ? "bg-white text-blue-600 shadow" : "text-white"}`}
              >
                <span className="flex items-center"><FaMapPin className="mr-2" /> Map</span>
              </button>
            </div>
            
            <div className="flex bg-white bg-opacity-20 backdrop-blur-lg rounded-full p-1 shadow-lg">
              <button 
                onClick={() => changeTheme("adventure")}
                className={`px-3 py-2 rounded-full transition-all ${theme === "adventure" ? "bg-white text-green-600 shadow" : "text-white"}`}
              >
                <span className="flex items-center"><MdHiking className="mr-1" /> Adventure</span>
              </button>
              <button 
                onClick={() => changeTheme("beach")}
                className={`px-3 py-2 rounded-full transition-all ${theme === "beach" ? "bg-white text-blue-600 shadow" : "text-white"}`}
              >
                <span className="flex items-center"><MdBeachAccess className="mr-1" /> Beach</span>
              </button>
              <button 
                onClick={() => changeTheme("urban")}
                className={`px-3 py-2 rounded-full transition-all ${theme === "urban" ? "bg-white text-purple-600 shadow" : "text-white"}`}
              >
                <span className="flex items-center"><MdOutlineLocationCity className="mr-1" /> Urban</span>
              </button>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="max-w-md mx-auto">
            <div className="relative">
              <div className="w-full bg-white bg-opacity-30 rounded-full h-4 mb-6 shadow-inner overflow-hidden">
                <motion.div 
                  className={`h-4 rounded-full ${currentTheme.secondaryColor} transition-all duration-1000 ease-in-out`}
                  style={{ width: `${progressPercent}%` }}
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercent}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                ></motion.div>
              </div>
              <div className="absolute -top-6 transition-all duration-300" style={{ left: `calc(${progressPercent}% - 12px)` }}>
                <motion.div 
                  className="w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <IoMdPerson className={`text-xl ${currentTheme.textColor}`} />
                </motion.div>
              </div>
            </div>
            <p className="text-center text-white font-medium">
              {Math.round(progressPercent)}% Complete
            </p>
          </div>
        </div>
        {/* Confetti Effect */}
        {showConfetti && (
          <div className="fixed inset-0 pointer-events-none z-50">
            {[...Array(100)].map((_, i) => (
              <motion.div 
                key={i} 
                className="absolute"
                initial={{ 
                  top: "-10%", 
                  left: `${Math.random() * 100}%`,
                  backgroundColor: `hsl(${Math.random() * 360}, 100%, 50%)`,
                  width: `${Math.random() * 10 + 5}px`,
                  height: `${Math.random() * 10 + 5}px`,
                  borderRadius: Math.random() > 0.5 ? "50%" : "0%",
                  opacity: 1
                }}
                animate={{ 
                  top: "110%", 
                  rotate: Math.random() * 720,
                  opacity: 0
                }}
                transition={{ 
                  duration: Math.random() * 4 + 2,
                  ease: "linear"
                }}
              />
            ))}
          </div>
        )}

        {itinerary.length > 0 ? (
          <div className="relative" ref={timelineRef}>
            {currentView === "journey" ? (
              <div className="flex flex-col items-center space-y-12 relative">
                {/* Start Line */}
                <motion.div 
                  className={`w-full bg-gradient-to-r ${currentTheme.startColor} h-16 rounded-xl flex items-center justify-center shadow-lg relative overflow-hidden`}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="absolute inset-0 flex">
                    {[...Array(10)].map((_, i) => (
                      <div 
                        key={i} 
                        className={`flex-1 h-full ${i % 2 === 0 ? 'bg-white bg-opacity-10' : 'bg-transparent'}`}
                      ></div>
                    ))}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 animate-shimmer"></div>
                  <span className="text-white font-bold text-xl relative z-10 flex items-center">
                    <FaFlag className="mr-3 text-2xl" /> START YOUR ADVENTURE
                  </span>
                </motion.div>

                {/* Days and Activities */}
                {itinerary.map((day, dayIndex) => (
                  <motion.div 
                    key={dayIndex} 
                    className="w-full"
                    id={`day-${dayIndex}`}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: dayIndex * 0.1 }}
                  >
                    <div className="flex items-center justify-between mb-6">
                      <div className="h-px bg-white bg-opacity-30 flex-grow"></div>
                      <h2 className="text-2xl font-bold text-white px-6 py-3 bg-white bg-opacity-20 backdrop-blur-sm rounded-full shadow-lg mx-4">
                        {day.day}
                      </h2>
                      <div className="h-px bg-white bg-opacity-30 flex-grow"></div>
                    </div>
                    
                    <div className="relative flex flex-col items-center space-y-12">
                      {day.activities.map((activity, actIndex) => {
                        const isCompleted = completedActivities[`${dayIndex}-${actIndex}`];
                        const isCurrent = currentPosition.day === dayIndex && currentPosition.activity === actIndex;
                        const activityMemory = memories[`${dayIndex}-${actIndex}`];
                        
                        return (
                          <motion.div 
                            key={actIndex} 
                            className="flex items-center space-x-4 w-full"
                            id={`activity-${dayIndex}-${actIndex}`}
                            initial={{ opacity: 0, x: actIndex % 2 === 0 ? -50 : 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: (dayIndex * 0.1) + (actIndex * 0.05) }}
                          >
                            {/* Left side time indicator */}
                            <div className="w-24 text-right">
                              <p className="text-white font-medium bg-white bg-opacity-20 backdrop-blur-sm rounded-lg py-1 px-3 inline-block">
                                {activity.time}
                              </p>
                            </div>
                            
                            {/* Connection line */}
                            <div className="relative flex flex-col items-center">
                              {/* Vertical line */}
                              {actIndex > 0 && (
                                <div className={`w-1 h-12 -mt-12 ${
                                  completedActivities[`${dayIndex}-${actIndex-1}`] ? "bg-white" : "bg-white bg-opacity-30"
                                } transition-colors duration-700`}></div>
                              )}
                              
                              {/* Checkpoint marker */}
                              <div 
                                className={`w-16 h-16 flex items-center justify-center text-white font-bold rounded-full shadow-lg cursor-pointer transition-all duration-500 hover:scale-110 ${
                                  isCompleted 
                                    ? `${currentTheme.secondaryColor} ring-4 ring-white ring-opacity-50` 
                                    : isCurrent 
                                      ? `${currentTheme.accentColor} animate-pulse ring-4 ring-white` 
                                      : "bg-white bg-opacity-30 backdrop-blur-sm"
                                }`}
                                onClick={() => jumpToCheckpoint(dayIndex, actIndex)}
                              >
                                {isCompleted ? (
                                  <FaCheck className="text-2xl" />
                                ) : (
                                  <div className="flex items-center justify-center">
                                    {activity.type && activityIcons[activity.type] || <MdLocationOn className="text-2xl" />}
                                  </div>
                                )}
                              </div>
                              
                              {/* Person indicator at current position */}
                              {isCurrent && (
                                <div 
                                  ref={personRef}
                                  className="absolute -right-8 transform transition-transform duration-500"
                                >
                                  <motion.div 
                                    className={`${currentTheme.secondaryColor} p-2 rounded-full shadow-lg`}
                                    animate={{ y: [0, -10, 0] }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                  >
                                    <MdDirectionsRun className="text-2xl text-white" />
                                  </motion.div>
                                </div>
                              )}
                              
                              {/* Bottom connection line */}
                              {(actIndex < day.activities.length - 1) && (
                                <div className={`w-1 h-12 ${
                                  isCompleted ? "bg-white" : "bg-white bg-opacity-30"
                                } transition-colors duration-700`}></div>
                              )}
                            </div>
                            
                            {/* Activity Card - Either display or edit mode */}
                            <div className="flex-1">
                              {editingState.isEditing && 
                               editingState.dayIndex === dayIndex && 
                               editingState.activityIndex === actIndex ? (
                                <motion.div 
                                  className="p-6 bg-white shadow-xl rounded-xl w-full border-2 border-blue-300"
                                  initial={{ scale: 0.95 }}
                                  animate={{ scale: 1 }}
                                  transition={{ duration: 0.3 }}
                                >
                                  <div className="flex flex-col space-y-4">
                                    <div className="flex space-x-4">
                                      <div className="flex-1">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                                        <input
                                          type="text"
                                          name="time"
                                          value={editForm.time}
                                          onChange={handleFormChange}
                                          className="w-full border rounded-lg p-2 text-sm"
                                          placeholder="Time"
                                        />
                                      </div>
                                      <div className="flex-1">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                                        <select
                                          name="type"
                                          value={editForm.type}
                                          onChange={handleFormChange}
                                          className="w-full border rounded-lg p-2 text-sm"
                                        >
                                          <option value="location">Location</option>
                                          <option value="food">Food</option>
                                          <option value="hotel">Hotel</option>
                                          <option value="attraction">Attraction</option>
                                          <option value="hiking">Hiking</option>
                                          <option value="beach">Beach</option>
                                          <option value="city">City</option>
                                          <option value="flight">Flight</option>
                                        </select>
                                      </div>
                                    </div>
                                    <div>
                                      <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                      <textarea
                                        name="description"
                                        value={editForm.description}
                                        onChange={handleFormChange}
                                        className="w-full border rounded-lg p-2 text-sm"
                                        placeholder="Description"
                                        rows="2"
                                      ></textarea>
                                    </div>
                                    <div>
                                      <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                                      <textarea
                                        name="notes"
                                        value={editForm.notes}
                                        onChange={handleFormChange}
                                        className="w-full border rounded-lg p-2 text-sm"
                                        placeholder="Any notes, tips or reminders"
                                        rows="2"
                                      ></textarea>
                                    </div>
                                    <div className="flex justify-end space-x-3 mt-2">
                                      <button 
                                        onClick={cancelEditing}
                                        className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg flex items-center"
                                      >
                                        <FaTimes className="mr-2" /> Cancel
                                      </button>
                                      <button 
                                        onClick={saveActivity}
                                        className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center"
                                      >
                                        <FaSave className="mr-2" /> Save
                                      </button>
                                    </div>
                                  </div>
                                </motion.div>
                              ) : (
                                <motion.div 
                                  className={`p-6 bg-white shadow-xl rounded-xl w-full transition-all duration-500 relative ${
                                    isCompleted ? "border-l-8 border-green-500" : isCurrent ? `border-l-8 ${currentTheme.accentColor}` : ""
                                  }`}
                                  initial={{ scale: 0.95, opacity: 0.5 }}
                                  animate={{ 
                                    scale: isCurrent ? 1.02 : 1, 
                                    opacity: 1,
                                    boxShadow: isCurrent ? "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" : "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
                                  }}
                                  transition={{ duration: 0.5 }}
                                >
                                  <div className="flex justify-between items-start mb-3">
                                    <div className="flex items-center">
                                      <span className="inline-flex items-center justify-center p-2 mr-3 rounded-lg bg-blue-100">
                                        {activity.type && activityIcons[activity.type] || <MdLocationOn className="text-xl text-blue-600" />}
                                      </span>
                                      <h3 className="text-xl font-semibold text-gray-800">{activity.description}</h3>
                                    </div>
                                    <div className="flex space-x-2">
                                      <button 
                                        className={`w-10 h-10 rounded-full flex items-center justify-center shadow-sm ${
                                          isCompleted ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-500"
                                        } hover:scale-110 transition-transform`}
                                        onClick={() => toggleComplete(dayIndex, actIndex)}
                                      >
                                        {isCompleted ? <FaCheck size={16} /> : "✓"}
                                      </button>
                                      <button 
                                        className="w-10 h-10 rounded-full flex items-center justify-center bg-blue-100 text-blue-600 shadow-sm hover:scale-110 transition-transform"
                                        onClick={() => startEditing(dayIndex, actIndex, activity)}
                                      >
                                        <FaEdit size={16} />
                                      </button>
                                    </div>
                                  </div>
                                  
                                  {activity.notes && (
                                    <div className="mt-3 p-3 bg-blue-50 rounded-lg text-gray-700 text-sm">
                                      <p>{activity.notes}</p>
                                    </div>
                                  )}
                                  
                                  {/* Memory section */}
                                  {activityMemory && (
                                    <div className="mt-4 pt-4 border-t border-gray-200">
                                      <h4 className="text-sm font-medium text-gray-500 mb-2">Your memories</h4>
                                      {activityMemory.note && (
                                        <div className="p-3 bg-amber-50 rounded-lg mb-2">
                                          <p className="text-sm italic">{activityMemory.note}</p>
                                        </div>
                                      )}
                                      {activityMemory.photo && (
                                        <div className="relative h-32 bg-gray-100 rounded-lg overflow-hidden">
                                          <img src={activityMemory.photo} alt="Memory" className="object-cover w-full h-full" />
                                        </div>
                                      )}
                                    </div>
                                  )}
                                  
                               {/* Add memory button */}
                               {isCompleted && !activityMemory && (
                                    <div className="mt-4 pt-4 border-t border-gray-200">
                                      <button 
                                        onClick={() => addMemory(dayIndex, activityIndex, 'note', 'Had a great time here!')}
                                        className="w-full py-2 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center hover:bg-amber-200 transition-colors"
                                      >
                                        <FaCamera className="mr-2" /> Add Memory
                                      </button>
                                    </div>
                                  )}
                                  
                                  {/* Completion stamp */}
                                  {isCompleted && (
                                    <div className="absolute -top-4 -right-4 bg-green-500 text-white rounded-full p-3 transform rotate-12 shadow-xl">
                                      <FaCheck className="text-lg" />
                                    </div>
                                  )}
                                </motion.div>
                              )}
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </motion.div>
                ))}

                {/* Finish Line */}
                <motion.div 
                  className={`w-full bg-gradient-to-r ${currentTheme.finishColor} h-16 rounded-xl flex items-center justify-center shadow-lg relative overflow-hidden`}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: itinerary.length * 0.2 }}
                >
                  <div className="absolute inset-0 flex">
                    {[...Array(10)].map((_, i) => (
                      <div 
                        key={i} 
                        className={`flex-1 h-full ${i % 2 === 0 ? 'bg-white bg-opacity-10' : 'bg-transparent'}`}
                      ></div>
                    ))}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 animate-shimmer"></div>
                  <span className="text-white font-bold text-xl relative z-10 flex items-center">
                    <FaTrophy className="mr-3 text-2xl" /> ADVENTURE COMPLETE
                  </span>
                </motion.div>

                {/* Checkered Pattern */}
                <div className="w-full h-8 flex rounded-b-lg overflow-hidden">
                  {[...Array(12)].map((_, i) => (
                    <div key={i} className={`flex-1 h-full ${i % 2 === 0 ? 'bg-black' : 'bg-white'}`}></div>
                  ))}
                </div>

                {/* Celebration Trophy - Shows when all activities are completed */}
                {allCompleted && (
                  <motion.div 
                    className="absolute -bottom-24 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ 
                      type: "spring",
                      stiffness: 260,
                      damping: 20,
                      delay: 0.5
                    }}
                  >
                    <div className="relative">
                      <div className="absolute -inset-10 bg-yellow-300 bg-opacity-30 rounded-full blur-lg animate-pulse"></div>
                      <FaTrophy className="text-6xl text-yellow-500 drop-shadow-lg" />
                    </div>
                    <p className="text-white text-xl font-bold mt-4 bg-black bg-opacity-20 px-6 py-2 rounded-full backdrop-blur-sm">
                      Journey Complete!
                    </p>
                  </motion.div>
                )}
              </div>
            ) : (
              // Map View
              <div className="bg-white bg-opacity-90 backdrop-blur-lg rounded-xl shadow-xl p-6 relative min-h-[600px]">
                <h2 className="text-2xl font-bold text-center mb-6">Trip Map View</h2>
                
                {/* Simplified Map Visualization */}
                <div className="relative w-full h-[500px] bg-blue-50 rounded-lg overflow-hidden border-2 border-blue-200">
                  {/* Map Background with some terrain features */}
                  <div className="absolute inset-0 p-4">
                    <div className="absolute top-[10%] left-[20%] w-32 h-20 bg-green-300 rounded-full transform -rotate-12"></div>
                    <div className="absolute top-[30%] right-[15%] w-40 h-24 bg-green-300 rounded-full transform rotate-6"></div>
                    <div className="absolute bottom-[20%] left-[30%] w-36 h-16 bg-blue-200 rounded-full"></div>
                    
                    {/* Roads */}
                    <div className="absolute top-[25%] left-[10%] w-[80%] h-3 bg-gray-300 rounded-full"></div>
                    <div className="absolute top-[25%] left-[30%] w-3 h-[50%] bg-gray-300 rounded-full"></div>
                    <div className="absolute top-[60%] left-[10%] w-[60%] h-3 bg-gray-300 rounded-full"></div>
                  </div>
                  
                  {/* Location Markers for each activity */}
                  {itinerary.map((day, dayIndex) => (
                    day.activities.map((activity, actIndex) => {
                      const isCompleted = completedActivities[`${dayIndex}-${actIndex}`];
                      const isCurrent = currentPosition.day === dayIndex && currentPosition.activity === actIndex;
                      
                      // Generate positions pseudo-randomly but consistently
                      const topPos = 10 + ((dayIndex * 25) + (actIndex * 10)) % 80;
                      const leftPos = 10 + ((dayIndex * 15) + (actIndex * 20)) % 80;
                      
                      return (
                        <motion.div
                          key={`map-${dayIndex}-${actIndex}`}
                          className={`absolute z-10 cursor-pointer transition-all duration-300 ${
                            isCurrent ? "z-20" : ""
                          }`}
                          style={{ 
                            top: `${topPos}%`, 
                            left: `${leftPos}%` 
                          }}
                          whileHover={{ scale: 1.2 }}
                          onClick={() => jumpToCheckpoint(dayIndex, actIndex)}
                        >
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg border-2 ${
                            isCompleted 
                              ? "bg-green-500 border-white" 
                              : isCurrent 
                                ? `${currentTheme.accentColor} border-white animate-pulse` 
                                : "bg-gray-100 border-gray-300"
                          }`}>
                            {activity.type && activityIcons[activity.type] || 
                              <MdLocationOn className={`text-2xl ${isCompleted ? "text-white" : isCurrent ? "text-white" : "text-gray-700"}`} />
                            }
                          </div>
                          
                          {/* Label */}
                          <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1">
                            <div className={`px-2 py-1 rounded text-xs font-medium ${
                              isCurrent ? "bg-blue-600 text-white" : "bg-white text-gray-800"
                            } whitespace-nowrap shadow-md`}>
                           {(day.day && typeof day.day === 'string' ? day.day.split(' ')[0] : day.day)} - {activity.time}
                            </div>
                          </div>
                          
                          {/* Current position indicator */}
                          {isCurrent && (
                            <motion.div 
                              className="absolute -inset-2 rounded-full border-4 border-blue-400 border-opacity-70"
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ duration: 2, repeat: Infinity }}
                            ></motion.div>
                          )}
                        </motion.div>
                      );
                    })
                  ))}
                  
                  {/* Path connecting the points */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none">
                    <defs>
                      <marker id="dot" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5">
                        <circle cx="5" cy="5" r="4" fill="white" />
                      </marker>
                    </defs>
                    
                    {itinerary.map((day, dayIndex) => 
                      day.activities.map((activity, actIndex) => {
                        // Skip if it's the last activity overall
                        if (dayIndex === itinerary.length - 1 && actIndex === day.activities.length - 1) return null;
                        
                        // Calculate positions
                        const startTopPos = 10 + ((dayIndex * 25) + (actIndex * 10)) % 80;
                        const startLeftPos = 10 + ((dayIndex * 15) + (actIndex * 20)) % 80;
                        
                        // Decide on next point (either next activity in same day or first activity in next day)
                        let nextDayIdx = dayIndex;
                        let nextActIdx = actIndex + 1;
                        
                        if (nextActIdx >= day.activities.length) {
                          nextDayIdx = dayIndex + 1;
                          nextActIdx = 0;
                        }
                        
                        // Skip if we don't have a next day
                        if (nextDayIdx >= itinerary.length) return null;
                        
                        const endTopPos = 10 + ((nextDayIdx * 25) + (nextActIdx * 10)) % 80;
                        const endLeftPos = 10 + ((nextDayIdx * 15) + (nextActIdx * 20)) % 80;
                        
                        // Check if this segment is completed
                        const isCompleted = completedActivities[`${dayIndex}-${actIndex}`];
                        
                        return (
                          <path 
                            key={`path-${dayIndex}-${actIndex}`}
                            d={`M ${startLeftPos}% ${startTopPos}% L ${endLeftPos}% ${endTopPos}%`}
                            stroke={isCompleted ? "#10B981" : "#D1D5DB"}
                            strokeWidth="3"
                            strokeDasharray={isCompleted ? "none" : "5,5"}
                            markerEnd="url(#dot)"
                            className="transition-colors duration-500"
                          />
                        );
                      })
                    )}
                  </svg>
                  
                  {/* Legend */}
                  <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-md p-3">
                    <h3 className="text-sm font-semibold mb-2">Legend</h3>
                    <div className="flex items-center space-x-4 text-xs">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-green-500 mr-1"></div>
                        <span>Completed</span>
                      </div>
                      <div className="flex items-center">
                        <div className={`w-3 h-3 rounded-full ${currentTheme.accentColor} mr-1`}></div>
                        <span>Current</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-gray-300 mr-1"></div>
                        <span>Upcoming</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <motion.div 
            className="text-center p-8 bg-white bg-opacity-80 backdrop-blur-lg rounded-xl shadow-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <FaMapMarkerAlt className="text-5xl text-red-500 mx-auto mb-4" />
            <p className="text-gray-700 text-lg">No itinerary found. Please add an itinerary parameter to the URL.</p>
            <p className="text-gray-500 mt-2 text-sm">Format: ?itinerary={`{"days":[{"day":"Day 1","activities":[...]}]}`}</p>
          </motion.div>
        )}
      </div>
      
      {/* Add these styles to your global CSS or style tag */}
      <style jsx global>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        .animate-shimmer {
          animation: shimmer 2.5s infinite;
        }
        
        .shadow-text {
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
        }
        
        .moving-animation {
          animation: moveAnimation 1s ease-in-out;
        }
        
        .jump-animation {
          animation: jumpAnimation 0.5s ease-in-out;
        }
        
        @keyframes moveAnimation {
          0% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-20px) scale(1.2); }
          100% { transform: translateY(0) scale(1); }
        }
        
        @keyframes jumpAnimation {
          0% { transform: scale(1); }
          50% { transform: scale(1.5); }
          100% { transform: scale(1); }
        }
        
        @keyframes fall {
          0% { transform: translateY(0) rotate(0); opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default ItineraryComponent;