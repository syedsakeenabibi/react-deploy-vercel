import React, { useState, useEffect, useMemo } from 'react';
import { useLoaderData } from 'react-router-dom';
import content from '../../../data/content.json';
import Breadcrumb from '../../../components/Breadcrumb/Breadcrumb';
import Rating from '../../../components/Rating/Rating';
import SizeFilter from '../../../components/Filter/SizeFilter';
import ProductColors from '../../../components/Filter/ColorsFilter';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SeactionHeading from '../../../components/Sections/SectionsHeading/SeactionHeading';
import AutoModeIcon from '@mui/icons-material/AutoMode';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import LockIcon from '@mui/icons-material/Lock';
import ProductCard from '../ProductCard';

const ProductDetails = () => {
  const { product } = useLoaderData();
  const [image, setImage] = useState(product?.images[0] ?? product?.thumbnail);
  const [showSizeChart, setShowSizeChart] = useState(false);

  const categories = content?.categories || [];
  const productCategory = categories.find(category => category.id === product?.category_id);

  // Similar product data
  const similarProducts = useMemo(() => {
    return content?.products?.filter(item => item?.type_id === product?.type_id && item?.id !== product?.id);
  }, [product]);

  const breadcrumbLinks = [
    { title: 'Shop', path: '/' },
    {
      title: productCategory?.name || 'Category',
      path: productCategory?.path || '/shop'
    },
    { title: product?.title, path: `/product/${product?.id}` }
  ];

  useEffect(() => {
    if (product?.images?.length > 0) {
      setImage(product.images[0]);
    } else if (product?.thumbnail) {
      setImage(product.thumbnail);
    }
  }, [product]);

  const handleImageClick = (newImage) => {
    if (newImage !== image) {
      setImage(newImage);
    }
  };

  const toggleSizeChart = () => {
    setShowSizeChart((prev) => !prev);
  };

  return (
    <div className="flex flex-col p-5 bg-gray-100 rounded-lg shadow-lg">
      <div className="flex flex-col md:flex-row">
        
        {/* Left Side: Thumbnails and Main Image */}
        <div className="w-full lg:w-1/2 md:w-1/2 flex">
          {/* Mini Images - Vertical Alignment */}
          <div className="flex flex-col space-y-2 mr-5">
            {product?.images?.map((item, index) => (
              <button
                key={index}
                onClick={() => handleImageClick(item)}
                className={`border rounded-lg p-2 hover:scale-110 transition-transform duration-300 ease-in-out ${
                  image === item ? 'border-2 border-black' : ''
                }`}
              >
                <img
                  src={item}
                  className="h-[80px] w-[80px] object-cover rounded-lg"
                  alt={`sample-${index}`}
                />
              </button>
            ))}
          </div>

          {/* Main Image with Hover Zoom Effect */}
          <div className="relative overflow-hidden ml-5">
            <img
              src={image}
              className="h-[500px] w-[400px] border rounded-lg cursor-pointer object-cover transform transition-transform duration-300 ease-in-out hover:scale-110"
              alt={product?.title}
            />
          </div>
        </div>

        {/* Breadcrumb Section */}
        <div className='w-full mb-1 mt-10 ml-10'>
          <Breadcrumb links={breadcrumbLinks} />

          {/* Right Side: Additional Content */}
          <div className="w-full lg:w-1/2 md:w-1/2 pl-5 flex flex-col justify-start mt-10">
            <h2 className="text-xl font-semibold">{product?.title}</h2>
            <p className="mt-2">{product?.description}</p>
            <p className="mt-2 font-bold">${product?.price}</p>
            <div className="mt-1">
              <Rating rating={product?.rating} />
            </div>
            <div className=""> 
              {/* Size Filter */}
              <SizeFilter sizes={product?.size} />
              
              {/* More Information about Sizes */}
              <button
                onClick={toggleSizeChart}
                className="text-blue-600 underline cursor-pointer"
              >
                More Information About Sizes
              </button>
              {showSizeChart && (
                <div className="mt-2">
                  <img 
                    src="http://www.leatherexotica.com/wp-content/uploads/2015/03/DRESS-SIZE.jpg"
                    alt="Dress Size Chart"
                    className="w-full h-auto border rounded-lg mt-2"
                  />
                </div>
              )}
            </div>

            {/* Color Options */}
            <div className=""> 
              <ProductColors colors={product?.color} />
            </div>

            {/* Cart */}
            <div className='flex mt-2'>
              <button className="bg-black text-gray-300 rounded-lg flex items-center p-2 hover:bg-gray-800 transition duration-300">
                <ShoppingCartIcon />
                <span className="ml-2">Add to cart</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Vertical Border and Content on the Left */}
      <div className="flex mt-12 ml-10">
        {/* Left Side Content: Description and Features */}
        <div className="relative w-1/2 border-r border-gray-300 pr-10">
          {/* Product Description */}
          <p className="text-black font-bold text-2xl">Product Description</p>
          <div className="w-full pl-5 flex flex-col justify-start mt-5">
            <div className="border border-black p-3 rounded-lg bg-white">
              <p className="text-gray-700">{product?.description}</p>
            </div>
          </div>

          {/* Features Section */}
          <div className="flex flex-col justify-start mt-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="flex items-center space-x-3">
                <AutoModeIcon className="text-blue-500" />
                <p className="text-gray-700">10 days Return & Exchange</p>
              </div>
              <div className="flex items-center space-x-3">
                <LocalShippingIcon className="text-green-500" />
                <p className="text-gray-700">Free Delivery</p>
              </div>
              <div className="flex items-center space-x-3">
                <EmojiEventsIcon className="text-yellow-500" />
                <p className="text-gray-700">Top Brand</p>
              </div>
              <div className="flex items-center space-x-3">
                <LocalShippingIcon className="text-orange-500" />
                <p className="text-gray-700">Amazon Delivered</p>
              </div>
              <div className="flex items-center space-x-3">
                <LockIcon className="text-red-500" />
                <p className="text-gray-700">Secure transaction</p>
              </div>
            </div>
          </div>
        </div>

        {/* Vertical Border Line */}
        <div className="border-l border-gray-300 mx-5"></div>

        {/* Right Side: Video Placeholder */}
        <div className="w-1/2 ml-10">
          {/* Video Section */}
          <div className="relative">
            <video
              className="w-full h-[400px] rounded-lg border border-gray-300"
              controls
              src="/shop.mp4" // Update the path according to your structure
              alt="Product Video"
            />
          </div>
        </div>
      </div>

      <SeactionHeading title='Similar Products' />
      <div className='flex px-10'>
      
        {/* Similar Products Display */}
        <div className="pt-4 grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 gap-8 px-2 pb-10">
          {similarProducts?.map((item, index) => (
            <ProductCard key={index} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
