import React from 'react';
import HeroImg from '../../assets/fonts/img/hero-img.jpg'; // Adjust the path relative to your component

const HeroSection = () => {
  return (
    <div 
      className='relative flex items-center justify-center bg-cover bg-center w-full'
      style={{ 
        backgroundImage: `url(${HeroImg})`,
        height: '500px',
        position: 'relative'
      }}
    >
      {/* Background overlay */}
      <div className='absolute inset-0 bg-black opacity-50'></div>
      
      {/* Content */}
      <div className='relative z-10 px-10 lg:px-24'>
        <main className='text-center'>
          <div className='text-left'>
            <h2 className='text-4xl font-bold text-white'>Shopping</h2>
          </div>
          <p className='mt-3 text-white sm:mt-5 sm:max-w-xl text-6xl font-extrabold'>
        Festival dhamaka sales !
          </p>
          <p className='mt-3 text-white sm:mt-5 sm:max-w-xl text-2xl font-medium'>
            Trendy / Colorful / Combo/ Pack
          </p>
          <button className='mt-5 border rounded text-white bg-black w-44 h-12 hover:bg-gray-800 transition-all'>
            Shop Now !
          </button>
        </main>
      </div>
    </div>
  );
}

export default HeroSection;
