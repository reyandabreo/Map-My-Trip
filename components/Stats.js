import React from 'react';

const Stats = () => {
return (
  <div className="bg-orange-100 rounded-xl p-4 sm:p-6 flex flex-col md:flex-row justify-around items-center text-sm mx-auto w-11/12 md:w-3/4 lg:w-1/2 gap-6 md:gap-0">
    <div className="text-center">
      <h1 className="text-2xl font-bold mb-2">--</h1>
      <p className="m-0 text-sm sm:text-base">World Of<br />Experiences</p>
    </div>
    <div className="text-center">
      <h1 className="text-2xl font-bold mb-2">--</h1>
      <p className="m-0 text-sm sm:text-base">Fine<br />Destinations</p>
    </div>
    <div className="text-center">
      <h1 className="text-2xl font-bold mb-2">--</h1>
      <p className="m-0 text-sm sm:text-base">Customer<br />Reviews</p>
    </div>
    <div className="text-center">
      <h1 className="text-2xl font-bold mb-2">--</h1>
      <p className="m-0 text-sm sm:text-base">Overall<br />Rating</p>
    </div>
  </div>
);

};

export default Stats;
