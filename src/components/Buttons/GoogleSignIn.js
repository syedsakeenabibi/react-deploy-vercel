import React, { useCallback } from 'react';
import GoogleLogo from '../../assets/fonts/img/google.jpg';
import { API_BASE_URL } from '../../api/constant';

const GoogleSignIn = () => {

const handleClick = useCallback(()=>{
  window.location.href = API_BASE_URL +"/oauth2/authorization/google";
},[])


  return (
    <button onClick={handleClick} className="flex justify-center items-center border w-full rounded border-gray-600 h-[48px] hover:bg-slate-50">
      {/* Google Icon */}
      <img 
        src={GoogleLogo} 
        alt="Google Icon" 
        className="w-6 h-6" // Adjusted size for the image
      />
      {/* Button Text */}
      <p className="px-2 text-gray-500 text-sm">Continue with Google</p>
    </button>
  );
};

export default GoogleSignIn;
