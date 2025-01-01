import React from 'react';

const UserReviews = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start p-28 mb-4 mt-4 py-4">
      <div className="md:w-1/2 pr-8">
        <h3 className="text-orange-500 text-sm uppercase mb-2">FROM OUR CLIENTS</h3>
        <h2 className="text-4xl font-bold mb-4">Real Travel History From Our Beloved Clients</h2>
        <p className="text-gray-600 mb-6">
          By choosing MapMyTrip, customers can expect an enriching and
          enjoyable travel experience, filled with unforgettable memories that will last
          a lifetime.
        </p>
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
        <div className="flex mt-4">
          {[1, 2, 3, 4].map((num) => (
            <div key={num} className="w-12 h-12 rounded-full overflow-hidden mr-2">
              <img 
                src={`/images/Client${num}.jpg`} 
                alt={`Client ${num}`} 
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
      <div className="md:w-1/2 mt-8 md:mt-0">
        <img 
          src="/images/Women_flowers.jpg" 
          alt="Woman in a field of flowers" 
          className="rounded-lg w-full h-auto"
        />
      </div>
    </div>
  );
};

export default UserReviews;