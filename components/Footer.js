import React from 'react';
import { FaFacebookF, FaTwitter, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-orange-50 py-8 px-4">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-gray-700">
        {/* Company Info & Social Media Icons */}
        <div className="col-span-1">
          <h2 className="font-bold text-xl mb-2">MapMyTrip</h2>
          <div className="flex space-x-4 mt-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-600 hover:text-orange-800"
            >
              <FaFacebookF size={24} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-600 hover:text-orange-800"
            >
              <FaTwitter size={24} />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-600 hover:text-orange-800"
            >
              <FaYoutube size={24} />
            </a>
          </div>
        </div>

        {/* Information Links */}
        <div className="col-span-1">
          <h3 className="font-bold text-lg mb-2">Information</h3>
          <ul>
            <li className="mb-2">
              <a href="/navitems/Explore" className="hover:text-orange-800">
                Explore
              </a>
            </li>
            <li className="mb-2">
              <a href="/navitems/Trips" className="hover:text-orange-800">
                Trips
              </a>
            </li>
            <li className="mb-2">
              <a href="/navitems/UserReviews" className="hover:text-orange-800">
                Reviews
              </a>
            </li>
          </ul>
        </div>

        {/* Helpful Links */}
        <div className="col-span-1">
          <h3 className="font-bold text-lg mb-2">Helpful Links</h3>
          <ul>
            <li className="mb-2">
              <a href="#" className="hover:text-orange-800">
                Home
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="hover:text-orange-800">
                Support
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="hover:text-orange-800">
                Travel & Condition
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Details */}
        <div className="col-span-1">
          <h3 className="font-bold text-lg mb-2">Contact Details</h3>
          <ul>
            <li className="mb-2">+91 9999988888</li>
            <li className="mb-2">
              <a
                href="mailto:isratech8@outlook.com"
                className="hover:text-orange-800"
              >
                mapmytrip@yahoo.com           
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
