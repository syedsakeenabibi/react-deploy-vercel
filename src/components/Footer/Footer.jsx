import React from 'react';
import FbIcon from '../common/FbIcon';
import InstaIcon from '../common/InstaIcon';

const Footer = ({ content }) => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-4">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
          {content?.items &&
            content?.items.map((item, index) => (
              <div key={index} className="flex flex-col">
                <h3 className="text-base font-medium mb-5 text-white">
                  {item?.title}
                </h3>
                {item?.list &&
                  item?.list.map((listItem, idx) => (
                    <a
                      key={idx}
                      href={listItem?.path}
                      className="text-sm mb-1 hover:underline hover:text-gray-100 transition-colors duration-300"
                    >
                      {listItem?.label}
                    </a>
                  ))}
                {item?.description && <p>{item?.description}</p>}
              </div>
            ))}
        </div>
        {/* Centering Icons */}
        <div className="flex justify-center items-center  gap-4 mt-4"> 
            <a href='/linked'><FbIcon /></a>
            <a href='/Insta'><InstaIcon /></a>
        </div>
        <div className="mt-6 border-t border-gray-700 pt-2 text-center">
          <p className="text-xs">{content?.copyright}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
