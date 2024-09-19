import React from 'react';
import Header from '../components/Header/Header';
import Hero from '../components/Hero/Hero';
import Slider from '../components/SliderMovie/SliderMovie';
import './HomePage.css';
import HorizontalCards from '../components/HorizontalCards/HorizontalCards';
import Footer from '../components/Footer/Footer';

function HomePage() {
  return (
    <div className="home-page">
      <Header />
      <Hero />
      <Slider />
      <HorizontalCards />
      <Footer />
    </div>
  );
}

export default HomePage;
