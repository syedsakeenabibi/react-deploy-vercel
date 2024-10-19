import React from 'react';
import { colorSelector } from '../../../components/Filter/ColorsFilter'; // Adjust path if needed

const ProductColors = ({ colors }) => {
    return (
        <div>
            <p className="text-[20px] text-black mb-2">Colors</p> {/* Adjusted margin-bottom */}
            <div className='flex'>
                {colors?.map((color, index) => (
                    <div
                        key={index}
                        className='rounded-full w-4 h-4 mx-1' // Added horizontal margin for spacing between colors
                        style={{ background: colorSelector[color] }} // Fallback color
                    >
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductColors;
