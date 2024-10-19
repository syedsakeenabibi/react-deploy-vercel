// SeactionHeading.js
import React from 'react';
// Ensure to import PropTypes

const SeactionHeading = ({ title }) => { // Destructure the title from props
  console.log('Title:', title); // Debugging line

  return (
    <div className='flex flex-wrap items-center justify-center py-4'>
      <div className='w-1/4 h-1 bg-gray-300 mr-4'></div> {/* Example decorative element */}
      <p className='text-3xl text-black'>{title}</p> {/* Correctly use the title */}
      <div className='w-1/4 h-1 bg-gray-300 ml-4'></div> {/* Example decorative element */}
    </div>
  );
}

// Default props (optional if you want a default value)
SeactionHeading.defaultProps = {
 
};

// Prop types validation
SeactionHeading.prototype= { // Corrected from 'prototype' to 'propTypes'
  title:String // Specify that title must be a string
};

export default SeactionHeading;
