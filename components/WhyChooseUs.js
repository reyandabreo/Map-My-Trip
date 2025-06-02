
import React from 'react';
import { MapPin, MessageCircle, TvMinimal } from 'lucide-react';

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
          icon={<TvMinimal size={24} />}
          title="Easy-to-Use Interface"
          description="Maintain a consistent visual style throughout the app, using your brand's colors, fonts, and imagery.Use high-resolution images of destinations and activities to create a visually appealing experience. "
        />
        
        <Feature
          icon={<MapPin size={24} />}
          title="Diverse Range of Destinations"
          description="Whether it's a domestic tour or an international adventure, we cover a wide range of destinations to cater to different interests and preferences."
        />
        
        <Feature
          icon={<MessageCircle size={24} />}
          title="Customer Support Section"
          description="FAQ Section let's you sddress common questions and concerns to provide self-service support. There is even a query box provided if the user has any specific query."
        />
      </div>
      
      <div className="md:w-1/2 relative">
        <div className="w-64 h-84 rounded-full overflow-hidden top-0 left-0">
          <img src="/images/traveller_1.jpg" alt="Travel scene 1" className="w-full h-full object-cover" />
        </div>
        <div className="w-64 h-84 rounded-full overflow-hidden absolute bottom-0 right-0">
          <img src="/images/traveller_2.jpg" alt="Travel scene 2" className="w-full h-full object-cover" />
        </div>

      </div>
    </div>
  );
};

export default WhyChooseUs;
