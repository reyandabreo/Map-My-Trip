
import React from 'react';
import { Shield, MapPin, MessageCircle } from 'lucide-react';

const Feature = ({ icon, title, description }) => (
  <div className="flex items-start mb-6">
    <div className="mr-4 mt-1">{icon}</div>
    <div>
      <h3 className="font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  </div>
);

const WhyChooseUs = () => {
  return (
    <div className="max-w-6xl mx-auto p-8 flex flex-col md:flex-row items-center">
      <div className="md:w-1/2 pr-8">
        <h2 className="text-3xl font-bold mb-2">Why Should You Choose Us</h2>
        <p className="text-gray-600 mb-8">We have extensive knowledge and experience in the travel industry.</p>
        
        <Feature
          icon={<Shield size={24} />}
          title="Safety and support"
          description="Our top priority is the safety and well-being of our clients. We maintain high safety standards and have emergency support available during the trip."
        />
        
        <Feature
          icon={<MapPin size={24} />}
          title="Diverse Range of Destinations"
          description="Whether it's a domestic tour or an international adventure, we cover a wide range of destinations to cater to different interests and preferences."
        />
        
        <Feature
          icon={<MessageCircle size={24} />}
          title="24/7 Customer Support"
          description="Our dedicated customer support team is available round the clock to address any queries or concerns before, during, and after the trip."
        />
      </div>
      
      <div className="md:w-1/2 relative">
        <div className="w-64 h-64 rounded-full overflow-hidden absolute top-0 left-0">
          <img src="/images/traveller_1.jpg" alt="Travel scene 1" className="w-full h-full object-cover" />
        </div>
        <div className="w-64 h-64 rounded-full overflow-hidden absolute bottom-0 right-0">
          <img src="/images/traveller_2.jpg" alt="Travel scene 2" className="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
