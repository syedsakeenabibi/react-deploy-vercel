import React, { useEffect } from 'react';
import NewArrivals from './components/Sections/NewArrivals';
import HeroSection from './components/HeroSection/HeroSection';
import Category from './components/Sections/Categories/Category';
import content from './data/content.json';
import Footer from './components/Footer/Footer';
import { fetchCategories } from './api/fetchCategories';
import { useDispatch } from 'react-redux';
import { setLoading } from './store/features/common';
import { loadCategories } from './store/features/category';

const Shop = () => {

  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(setLoading(true));
    fetchCategories().then(res=>{
      dispatch(loadCategories(res));
    }).catch(err=>{

    }).finally(()=>{
      dispatch(setLoading(false));
    })
  },[dispatch]);
  
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
