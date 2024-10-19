import React, { useState } from 'react';

const SizeFilter = ({ sizes }) => {
  const [selectedSize, setSelectedSize] = useState(null);

  const handleSizeClick = (size) => {
    setSelectedSize(size);
  };

  return (
    <div>
      <div className="flex flex-col mb-2">
        <p className="text-[20px] text-black mt-1 mb-2">Size</p>
        <div className="flex flex-wrap gap-3 px-2 mt-1">
          {sizes?.map((item) => {
            const isSelected = selectedSize === item;

            return (
              <div key={item} className="flex flex-col mr-1">
                <div
                  className={`w-8 h-8 border rounded-xl cursor-pointer flex items-center justify-center 
                    ${isSelected ? 'bg-black text-white' : 'bg-white text-black'} border-black`}
                  onClick={() => handleSizeClick(item)}
                >
                  {item}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SizeFilter;
