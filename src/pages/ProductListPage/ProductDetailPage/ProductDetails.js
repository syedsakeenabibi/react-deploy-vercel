import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useLoaderData } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Breadcrumb from '../../../components/Breadcrumb/Breadcrumb';
import Rating from '../../../components/Rating/Rating';
import SizeFilter from '../../../components/Filter/SizeFilter';
import ProductColors from '../../../components/Filter/ColorsFilter';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SeactionHeading from '../../../components/Sections/SectionsHeading/SeactionHeading';
import ProductCard from '../ProductCard';
import AutoModeIcon from '@mui/icons-material/AutoMode';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import LockIcon from '@mui/icons-material/Lock';
import _  from 'lodash';
import {getAllProducts} from "../../../api/fetchProducts";
import { addItemToCartAction } from '../../../store/actions/cartAction'


const ProductDetails = () => {
  const { product } = useLoaderData();
  const categories = useSelector((state) => state?.categoryState?.categories);
  const dispatch = useDispatch();
  const [error,setError] = useState('');
//size 
const [selecteSize,setSelectedSize] = useState('');


  // Set the initial image safely
  const [image, setImage] = useState(
    product?.images?.[0]?.url || product?.thumbnail || ''
  );
  const [showSizeChart, setShowSizeChart] = useState(false);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [breadcrumbLinks, setBreadCrumbLink] = useState([]);

  // Memoized product category lookup
  const productCategory = useMemo(() => {
    return categories?.find((category) => category?.id === product?.categoryId);
  }, [product, categories]);

  useEffect(()=>{
    getAllProducts(product?.categoryId,product?.categoryId).then(res=>{
      const excludeProduct = res?.filter((item)=> item.id !== product?.id);
      setSimilarProducts(res);
    }).catch(()=>{

    })
  },[product?.categoryId,product?.categoryTypeId]);


  // Effect for setting breadcrumb links and resetting the image
  useEffect(() => {
    // Reset the image to the thumbnail or first image URL
    const newImage = product?.thumbnail || product?.images?.[0]?.url || '';
    setImage(newImage);

    const arrayLinks = [
      { title: 'Shop', path: '/' },
      {
        title: productCategory?.name,
        path: productCategory?.name,
      },
    ];

    const productType = productCategory?.categoryTypes?.find(
      (item) => item?.id === product?.categoryTypeId
    );

    if (productType) {
      arrayLinks.push({
        title: productType?.name,
        path: productType?.name,
      });
    }

    setBreadCrumbLink(arrayLinks);
  }, [productCategory, product]);

  const addItemToCart = useCallback(()=>{
    console.log("size",selecteSize);
  if(!selecteSize){
    setError('please select size');
  }
  else{
    const selectedVariant = product?.variants?.find((variant)=>variant?.size === selecteSize);
    console.log("selected",selectedVariant);
  
    if(selectedVariant?.stockQuantity > 0){
dispatch(addItemToCartAction({
  productId:product?.id,
  thumbnail:product?.thumbnail,
  name:product?.name,
  variant:selectedVariant,
  quantity:20,
  price:product?.price,
}))
  }
  else{
    setError('Out of Stock');
  }
  }
  },[dispatch,product,product,selecteSize]);

  useEffect(()=>{
    if(selecteSize){
      setError('');
    }
  },[selecteSize]);

  // Function to handle image click
  const handleImageClick = (newImage) => {
    if (newImage) {
      setImage(newImage);
    }
  };

  // Toggle size chart display
  const toggleSizeChart = () => {
    setShowSizeChart((prev) => !prev);
  };

//loadash
const colors = useMemo(()=>{
  const colorSet = _.uniq(_.map(product?.variants,'color'));
  return colorSet
},[product]);

const sizes = useMemo(()=>{
  const sizeSet = _.uniq(_.map(product?.variants,'size'));
  return sizeSet
},[product]);  
 
  return (
    <div className="flex flex-col p-5 bg-gray-100 rounded-lg shadow-lg">
      <div className="flex flex-col md:flex-row">
        {/* Image Section */}
        <div className="w-full lg:w-1/2 md:w-1/2 flex">
          {/* Thumbnail Images */}
          <div className="flex flex-col space-y-2 mr-5">
            {product?.productResources?.length > 0 ? (
              product?.productResources.map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleImageClick(item?.url)}
                  className={`border rounded-lg p-2 hover:scale-110 transition-transform duration-300 ease-in-out ${
                    image === item?.url ? 'border-2 border-black' : ''
                  }`}
                >
                  <img
                    src={item?.url || ''}
                    className="h-[80px] w-[80px] object-cover rounded-lg"
                    alt={`sample-${index}`}
                  />
                </button>
              ))
            ) : (
              <p>No images available</p>
            )}
          </div>

          {/* Main Image Display */}
          <div className="relative overflow-hidden ml-5">
            {image ? (
              <img
                src={image}
                className="h-[500px] w-[400px] border rounded-lg cursor-pointer object-cover transform transition-transform duration-300 ease-in-out hover:scale-110"
                alt={product?.name || 'Product Image'}
              />
            ) : (
              <p className="text-gray-500">No image available</p>
            )}
          </div>
        </div>

        {/* Product Details Section */}
        <div className="w-full mb-1 mt-10 ml-10">
          <Breadcrumb links={breadcrumbLinks} />
          <div className="w-full lg:w-1/2 md:w-1/2 pl-5 flex flex-col justify-start mt-10">
            <h2 className="text-xl font-semibold">{product?.name || 'Product Name'}</h2>
            <p className="mt-2">{product?.description || 'No description available.'}</p>
            <p className="mt-2 font-bold">${product?.price ?? 'N/A'}</p>
            <Rating rating={product?.rating || 0} />
            <SizeFilter  onChange={(values)=>{
          setSelectedSize(values?.[0] ?? '')
        }} sizes={sizes|| []} />
            <button onClick={toggleSizeChart} className="text-blue-600 underline cursor-pointer">
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
            <ProductColors colors={colors || []} />
            <button  onClick={addItemToCart} className="bg-black text-gray-300 rounded-lg flex items-center p-2 hover:bg-gray-800 transition duration-300">
              <ShoppingCartIcon />
              <span className="ml-2">Add to Cart</span>
              {error && <p className="text-red-500 font-medium mt-12 ">{error}</p>}
            </button>
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
              <p className="text-gray-700">{product?.name}</p>
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



      {/* Similar Products Section */}
      <SeactionHeading title="Similar Products" />
      <div className="flex px-10">
        <div className="pt-4 grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 gap-8 px-2 pb-10">
          {similarProducts.length > 0 ? (
            similarProducts.map((item, index) => <ProductCard key={index} {...item} />)
          ) : (
            <p>No similar products available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

