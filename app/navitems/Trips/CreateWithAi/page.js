"use client";
import { useState, useRef } from "react";
import { FaArrowLeft, FaSearch, FaPlane, FaUsers, FaCalendarAlt, FaWallet, FaStar } from "react-icons/fa";
import { useRouter } from "next/navigation";

const SearchBar = () => {
  const router = useRouter();
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [budget, setBudget] = useState("");
  const [people, setPeople] = useState(1);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const inputRef = useRef(null);

  const fetchSuggestions = (query) => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    const API_KEY = "AlzaSyIalcONhypW28MsJ2b6OGhMVBGvschtgJe";
    const apiUrl = `https://maps.gomaps.pro/maps/api/place/autocomplete/json?input=${query}&components=country:us|country:pr&language=en&key=${API_KEY}`;

    fetch(apiUrl, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === "OK") {
          setSuggestions(result.predictions);
        }
      })
      .catch((error) => console.log("error", error));
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    if (value.length > 2) {
      fetchSuggestions(value);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion.description);
    setSuggestions([]);
  };

  const handleSubmit = async () => {
    const formData = {
      budget,
      people,
      startDate,
      endDate,
      place: inputValue,
    };
  
    try {
      // Send the form data to the backend API
      const response = await fetch("/api/auto-create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log("API Response:", data); // Debugging log
  
        // Ensure itinerary is a string
        const itinerary = typeof data.itinerary === "string" ? data.itinerary : JSON.stringify(data.itinerary);
  
        // Redirect to the itinerary page with the generated itinerary
        router.push(`/itinerary?itinerary=${encodeURIComponent(itinerary)}`);
      } else {
        console.error("Error generating itinerary");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex flex-col items-center w-full space-y-6">
      {/* Search Bar */}
      <div className="relative w-full transform -rotate-1">
        <div className="flex items-center w-full">
          <div className="relative flex-grow">
            <input
              ref={inputRef}
              type="text"
              placeholder="Where do you want to go?"
              value={inputValue}
              onChange={handleInputChange}
              className="w-full px-4 py-4 pl-12 bg-white border-2 border-blue-400 rounded-l-xl text-blue-800 focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-md"
            />
            <FaPlane className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-500 text-lg" />
          </div>
          <button
            className="bg-blue-500 text-white px-8 py-4 rounded-r-xl hover:bg-blue-600 transition-all font-bold shadow-md text-lg"
            onClick={handleSubmit}
          >
            <FaSearch className="inline mr-2" /> Search
          </button>
        </div>

        {/* Suggestions */}
        {suggestions.length > 0 && (
          <ul className="absolute top-full left-0 right-0 mt-1 bg-white border-2 border-blue-300 rounded-xl shadow-lg z-20 max-h-60 overflow-y-auto">
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="px-4 py-3 cursor-pointer hover:bg-blue-50 border-b border-blue-100 last:border-b-0"
              >
                {suggestion.description}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Input Fields with Slight Tilt */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
        <div className="flex flex-col transform rotate-1">
          <label className="text-sm text-blue-600 mb-1 font-medium flex items-center gap-2">
            <FaWallet className="text-blue-500" /> Budget
          </label>
          <input
            type="number"
            placeholder="Enter Budget"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            className="w-full px-4 py-3 bg-white border-2 border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-sm"
            min="0"
          />
        </div>

        <div className="flex flex-col transform -rotate-1">
          <label className="text-sm text-blue-600 mb-1 font-medium flex items-center gap-2">
            <FaUsers className="text-blue-500" /> Number of People
          </label>
          <input
            type="number"
            placeholder="Number of People"
            value={people}
            onChange={(e) => setPeople(e.target.value)}
            className="w-full px-4 py-3 bg-white border-2 border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-sm"
            min="1"
          />
        </div>

        <div className="flex flex-col transform -rotate-1">
          <label className="text-sm text-blue-600 mb-1 font-medium flex items-center gap-2">
            <FaCalendarAlt className="text-blue-500" /> Start Date
          </label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full px-4 py-3 bg-white border-2 border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-sm"
          />
        </div>

        <div className="flex flex-col transform rotate-1">
          <label className="text-sm text-blue-600 mb-1 font-medium flex items-center gap-2">
            <FaCalendarAlt className="text-blue-500" /> End Date
          </label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full px-4 py-3 bg-white border-2 border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-sm"
            min={startDate}
          />
        </div>
      </div>

      {/* Blue Wave Divider */}
      <div className="w-full">
        <svg className="w-full" height="20" viewBox="0 0 100 10" preserveAspectRatio="none">
          <path d="M0,10 C30,0 70,15 100,10 L100,0 L0,0 Z" fill="#93C5FD" />
        </svg>
      </div>

      {/* Create Button with Tilt */}
      <button 
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-10 py-4 rounded-xl hover:bg-blue-600 transition-all font-bold shadow-lg transform -rotate-1 hover:rotate-0"
      >
        Create My Trip <FaStar className="inline ml-2" />
      </button>
    </div>
  );
};

const CreateWithAI = () => {
  const router = useRouter();
  
  const handleBack = () => {
    router.back();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-50 p-6">
      {/* Simple Blue Corner Shapes */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-blue-100 rounded-br-full"></div>
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-blue-100 rounded-tl-full"></div>
      
      {/* Main Container with Tilt */}
      <div className="relative w-full max-w-2xl transform rotate-1">
        <div className="bg-white rounded-xl shadow-xl p-8 border-2 border-blue-300">
          {/* Back Button */}
          <button 
            onClick={handleBack}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-500 transition-colors bg-blue-50 px-4 py-2 rounded-lg shadow-sm mb-8"
          >
            <FaArrowLeft /> Back
          </button>
          
          {/* Fun Heading */}
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-blue-600 mb-2">Plan Your Adventure!</h1>
            <div className="h-1 w-32 bg-blue-400 mx-auto rounded-full transform -rotate-3"></div>
            <h2 className="text-xl font-medium text-blue-500 mt-4 mb-2">Create Your Trip with AI</h2>
            <p className="text-md text-blue-600 max-w-md mx-auto">
              Fill in the details below, and we'll craft a personalized travel plan just for you.
            </p>
          </div>
          
          <SearchBar />
        </div>
      </div>
    </div>
  );
};

export default CreateWithAI;