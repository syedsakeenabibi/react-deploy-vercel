import React from 'react';
import NewArrivals from './components/Sections/NewArrivals';
import HeroSection from './components/HeroSection/HeroSection';
import Category from './components/Sections/Categories/Category';
import content from './data/content.json';
import Footer from './components/Footer/Footer';

const Shop = () => {
  return (
    <>
      <HeroSection />
      <NewArrivals />
      {content?.pages?.shop?.sections?.map((section, index) => (
        <Category key={index} title={section.title} data={section.data} />
      ))}
      <Footer content={content?.footer} />
    </>
  );
};

export default Shop;
