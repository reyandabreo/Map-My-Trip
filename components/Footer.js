import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-4">
      <div className="container mx-auto flex justify-between">
        <div>
          <img src="mou-trips-logo.png" alt="MOU Trips Logo" className="w-20 h-20" />
          <p className="text-gray-700">MOU Trips</p>
        </div>

        <div className="flex flex-col space-y-2">
          <h3 className="text-gray-700 font-bold">Information</h3>
          <ul className="text-gray-500">
            <li><a href="/">Home</a></li>
            <li><a href="/explore">Explore</a></li>
            <li><a href="/travel">Travel</a></li>
          </ul>
        </div>

        <div className="flex flex-col space-y-2">
          <h3 className="text-gray-700 font-bold">Helpful Links</h3>
          <ul className="text-gray-500">
            <li><a href="/destination">Destination</a></li>
            <li><a href="/support">Support</a></li>
            <li><a href="/travel-conditions">Travel & Conditions</a></li>
          </ul>
        </div>

        <div className="flex flex-col space-y-2">
          <h3 className="text-gray-700 font-bold">Contact Details</h3>
          <ul className="text-gray-500">
            <li><a href="tel:+651125658">+651 125 658</a></li>
            <li><a href="mailto:isratech@outlook.com">isratech@outlook.com</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;