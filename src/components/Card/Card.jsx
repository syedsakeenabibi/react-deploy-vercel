import React from 'react';
import ArrowIcon from '../common/ArrowIcon';

const Card = ({ imagepath, title, description, actionArrow ,height,width}) => {
  return (
    <div className='flex flex-col p-2 rounded-lg shadow-md overflow-hidden mb-4 pl-8 pr-2 ml-4 mr-4'> {/* Single box with a white background */}
      <img 
        className='h-[260px] w-[200px] object-cover hover:scale-105 cursor-pointer' 
        src={imagepath} 
        alt={title} 
      />
      <div className='flex flex-col mt-2'> {/* Keep title and description together */}
        <p className='text-[16px] text-black font-bold'>{title}</p> {/* Title */}
        {description && <p className='text-[16px] px-2 text-gray-600 '>{description}</p>} {/* Description */}
        {actionArrow && (
          <div className='flex justify-end items-center mt-2'> {/* Arrow container */}
            <span className='cursor-pointer pr-2'>
            <ArrowIcon/> 
            </span>
            <span className='text-lg'>&#9654;</span> {/* Arrow symbol */}
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
