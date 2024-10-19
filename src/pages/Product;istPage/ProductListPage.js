import React, { useMemo } from "react";
import FilterIcon from "../../components/common/FilterIcon";
import content from "../../data/content.json";
import Categories from "../../components/Filter/Categories";
import PriceFilter from "../../components/Filter/PriceFilter";
import ColorsFilter from "../../components/Filter/ColorsFilter";
import SizeFilter from "../../components/Filter/SizeFilter";
import ProductCard from "./ProductCard";

const ProductListPage = ({ categoryType }) => {
  // Initialize categories first
  const categories = content?.categories;

  // Memoized categoryContent based on the categoryType
  const categoryContent = useMemo(() => {
    return categories?.find((category) => category.code === categoryType);
  }, [categories, categoryType]);

  // Memoized product list based on categoryContent
  const ProductListItems = useMemo(() => {
    return content?.products?.filter((product) => product?.category_id === categoryContent?.id);
  }, [categoryContent]);

  return (
    <div className="min-h-screen bg-gray-50"> {/* Background color for the page */}
      <div className="flex p-5"> {/* Added padding to the main container */}
        <div className="w-[20%] p-6 border border-gray-200 rounded-lg shadow-lg bg-white hover:shadow-xl transition duration-300 ease-in-out"> {/* Filters Container */}
          {/* Filters Header */}
          <div className="flex justify-between items-center mb-4">
            <p className="text-lg text-gray-800">Filter</p>
            <FilterIcon />
          </div>
          <div>
            {/* Products types */}
            <p className="text-md text-gray-700 mt-5">Categories</p>
            <Categories types={categoryContent?.types} />
            <hr className="my-4 border-gray-300" />
          </div>
          {/* Price Filter */}
          <PriceFilter />
          <hr className="my-4 border-gray-300" />
          {/* Colors Filter */}
          <ColorsFilter colors={categoryContent?.meta_data?.colors} />
          <hr className="my-4 border-gray-300" />
          {/* Sizes Filter */}
          <SizeFilter sizes={categoryContent?.meta_data?.sizes} />
        </div>

        <div className="flex-1 p-6 ml-6 bg-white border border-gray-200 rounded-lg shadow-lg"> {/* Products Container */}
          <p className="text-lg text-gray-800">{categoryContent?.description}</p>
          {/* Products should be displayed here */}
          <div className="pt-4 grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-8 px-2">
            {ProductListItems?.map((item, index) => (
              <ProductCard key={index} {...item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductListPage;
