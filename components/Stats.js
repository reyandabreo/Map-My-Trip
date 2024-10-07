import React from 'react';

const Stats = () => {
  return (
    <div className="bg-orange-100 rounded-xl p-4 flex justify-around items-center text-sm mx-auto w-3/4 md:w-1/2 lg:w-1/2">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-2">10</h1>
        <p className="m-0">World Of<br />Experiences</p>
      </div>
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-2">2K+</h1>
        <p className="m-0">Fine<br />Destinations</p>
      </div>
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-2">10K+</h1>
        <p className="m-0">Customer<br />Reviews</p>
      </div>
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-2">4.8</h1>
        <p className="m-0">Overall<br />Rating</p>
      </div>
    </div>
  );
};

export default Stats;
