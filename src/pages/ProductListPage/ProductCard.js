import React, { useState } from 'react';
import FavoriteIcon from '../../components/common/FavoriteIcon';
import { Link } from 'react-router-dom';

const ProductCard = ({ id, title, description, price, discount, rating, brand, thumbnail,slug }) => {
  const [isDescriptionVisible, setIsDescriptionVisible] = useState(false); // Hide description initially

  const toggleDescription = () => {
    setIsDescriptionVisible(!isDescriptionVisible); // Toggle description visibility
  };

  return (
    <div className='flex flex-col p-4 rounded-lg shadow-md overflow-hidden mb-4 w-[250px]'> {/* Adjust container width */}
      {/* Use backticks for template literal to correctly inject the product ID */}
      <Link to={`/product/${slug}`}>
        <div className='relative overflow-hidden'> {/* Container for image with relative positioning */}
          <img 
            className='h-auto w-full max-h-[250px] object-contain border border-gray-300 cursor-pointer transform transition-transform duration-300 hover:scale-110' // Adjusted to maintain the aspect ratio and fit the full image
            src={thumbnail} 
            alt={title} 
          />
          {/* Heart Icon - Positioned inside the image in the top-right corner */}
          <button className='absolute top-2 right-2 p-1 bg-white rounded-full'>
            <FavoriteIcon className="text-gray-500" /> {/* You can customize the color or style here */}
          </button>
        </div>
      </Link>
      
      <div className='flex flex-col mt-4'> {/* Container for product details */}
        <div className='flex justify-between items-center'> {/* Flex container for title and price */}
          <p className='text-[14px] text-black font-bold'>{title}</p>
          <p className='text-[14px] text-black font-bold'>₹{price}</p> {/* Price on the right */}
        </div>

        {/* Conditional description rendering */}
        {description && (
          <div>
            {isDescriptionVisible ? (
              <div>
                {/* Description when visible */}
                <p className='text-[12px] px-2 text-gray-600'>
                  {description}
                </p>

                {/* Button to hide description */}
                <button 
                  className='text-blue-500 mt-2' 
                  onClick={toggleDescription}
                >
                  Read Less
                </button>
              </div>
            ) : (
              <div>
                {/* Button to show description */}
                <button 
                  className='text-blue-500 mt-2' 
                  onClick={toggleDescription}
                >
                  Read More
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
