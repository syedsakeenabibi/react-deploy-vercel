import React from 'react';
import { Link } from 'react-router-dom';

const Breadcrumb = ({ links }) => {
  return (
    <nav className='flex' aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
        {links?.map((link, index) => (
          <li key={index} className='inline-flex items-center'>
            <Link to={link?.path} className='inline-flex items-center text-sm font-medium text-gray-700 hover:text-gray-900'>
              {link?.title}
            </Link>
            {index < links.length - 1 && (
              // Separator for links except the last one
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 mx-1 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
