import React from 'react';


import Card from '../../Card/Card';

const Category = ({ title, data}) => {
  return (
    <div className="px-12"> {/* Remove bg color */}
      <h2 className="text-black text-2xl font-bold text-center mb-4">{title}</h2> {/* Black title */}
      <div className="flex px-2 py-5">
        {data && data.map((item, index) => {
          return (
            <Card 
              key={index} 
              title={item?.title} 
              description={item?.description} 
              imagepath={item?.image} 
              actionArrow={true} height={'250px'} width={'240px'}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Category;
