import React, { useMemo } from 'react';
import SvgStarIcon from '../common/SvgStarIcon';
import SvgEmptyStar from '../common/SvgEmptyStar';

const Rating = ({ rating }) => {
    // Ensure rating is a number and within the valid range (0-5)
    const validRating = Math.min(Math.max(Number(rating), 0), 5);

    // Add debugging logs to check the values
    console.log('Raw rating:', rating);
    console.log('Valid rating:', validRating);

    const ratingNumber = useMemo(() => {
        const floorRating = Math.floor(validRating);

        // If floorRating is a valid number, create an array of that length
        if (Number.isInteger(floorRating) && floorRating >= 0 && floorRating <= 5) {
            console.log('Floor rating:', floorRating);
            return new Array(floorRating).fill(); // Create an array based on the valid rating value
        }
        return []; // Fallback to an empty array if the rating is invalid
    }, [validRating]);

    return (
        <div className='flex items-center'>
            {ratingNumber.map((_, index) => (
                <SvgStarIcon key={index} />
            ))}

            {new Array(5 - ratingNumber.length).fill().map((_, index) => (
                <SvgEmptyStar key={'empty-' + index} />
            ))}

            <span
                className='ml-2 text-gray-800 '
                style={{
                    fontSize: '20px',
                    color: '#4B5563',
                    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)',
                    letterSpacing: '0.5px',
                }}
            >
                {validRating.toFixed(1)} {/* Adjust to one decimal place if desired */}
            </span>
        </div>
    );
};

export default Rating;
