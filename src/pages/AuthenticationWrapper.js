import React from 'react';
import Navigation from '../components/Navigation/Navigation';
import { Outlet } from 'react-router-dom';
import BckImage from '../assets/fonts/img/bg-1.jpg';
import { useSelector } from 'react-redux';
import Spinner from '../components/Spinner/Spinner';

const AuthenticationWrapper = ({children}) => {

  const isLoading = useSelector((state)=> state?.commonState?.loading);


  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <Navigation variant="auth" />
      
      {/* Main Content */}
      <div className="flex flex-1">
        {/* Left Image Section */}
        <div className="w-full md:w-[50%] lg:w-[60%] flex justify-center items-center">
          <img 
            src={BckImage} 
            alt="Shopping" 
            className="w-full h-auto max-h-[400px] object-cover md:max-h-[500px]" 
          />
        </div>

        {/* Right Content Section */}
        <div className="flex-1 p-4 md:p-8 lg:p-12">
          <Outlet />
        </div>
        { isLoading && <Spinner /> } 
      </div>
    </div>
  );
};

export default AuthenticationWrapper;
