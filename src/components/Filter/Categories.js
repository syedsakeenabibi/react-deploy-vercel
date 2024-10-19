import React from 'react';

// This component will receive 'types' as props and render them dynamically
const Categories = ({ types }) => {
  return (
    <div>
      {types?.map((type) => (
        <div className='flex items-center p-1' key={type.code}>
          <input
            type='checkbox'
            name={type?.code}
            className='border rounded-lg w-4 h-4 accent-black text-black'
          />
          <label htmlFor={type?.code} className='px-2 text-[14px] text-gray-600'>{type?.name}</label>
        </div>
      ))}
    </div>
  );
};

export default Categories;
