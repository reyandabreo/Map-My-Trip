// pages/index.js

import React from 'react';

// import Navbar from '../components/Navbar';

import Hero from '../components/Hero';

import PopularPlaces from '../components/PopularPlaces';

import Stats from '../components/Stats';

import Destination from '../components/Destination';

import WhyChooseUs from '../components/WhyChooseUs';

import UserReviews from '../components/UserReviews';

import Faqs from '../components/Faqs';

import Footer from '../components/Footer';

const HomePage = () => {

  return (

    <div>

      <Hero />

      <PopularPlaces />

      <Stats />

      <Destination />

      <WhyChooseUs />

      <UserReviews />

      <Faqs />

      <Footer />

    </div>

  );

};


export default HomePage;