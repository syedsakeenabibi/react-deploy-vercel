import React, { useEffect, useMemo, useState } from "react";
import FilterIcon from "../../components/common/FilterIcon";
import content from "../../data/content.json";
import Categories from "../../components/Filter/Categories";
import PriceFilter from "../../components/Filter/PriceFilter";
import ColorsFilter from "../../components/Filter/ColorsFilter";
import SizeFilter from "../../components/Filter/SizeFilter";
import ProductCard from "./ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from '../../store/features/common';
import { getAllProducts } from "../../api/fetchProducts";

const ProductListPage = ({ categoryType }) => {
  const categoryData = useSelector((state) => state?.categoryState?.categories);
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);

  // Initialize categories first for filter use
  const categories = content?.categories;

  // Memoized categoryContent based on categoryType
  const categoryContent = useMemo(() => {
    return categories?.find((category) => category.code === categoryType);
  }, [categories, categoryType]);

  // Memoized category from Redux based on categoryType
  const category = useMemo(() => {
    return categoryData?.find((element) => element?.code === categoryType);
  }, [categoryData, categoryType]);

  // Fetch products when category ID or categoryData changes
  useEffect(() => {
    if (category?.id) {  // Ensure category is available before fetching
      fetchProducts();
    }
  }, [category?.id, categoryData, dispatch]);

  const fetchProducts = () => {
    dispatch(setLoading(true));
    getAllProducts(category?.id)
      .then((res) => {
        setProducts(res);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex p-5">
        {/* Sidebar Filters */}
        <div className="w-[20%] p-6 border border-gray-200 rounded-lg shadow-lg bg-white hover:shadow-xl transition duration-300 ease-in-out">
          <div className="flex justify-between items-center mb-4">
            <p className="text-lg text-gray-800">Filter</p>
            <FilterIcon />
          </div>
          {/* Category Filter */}
          <div>
            <p className="text-md text-gray-700 mt-5">Categories</p>
            <Categories types={categoryContent?.types} />
            <hr className="my-4 border-gray-300" />
          </div>
          <PriceFilter />
          <hr className="my-4 border-gray-300" />
          <ColorsFilter colors={categoryContent?.meta_data?.colors} />
          <hr className="my-4 border-gray-300" />
          <SizeFilter sizes={categoryContent?.meta_data?.sizes} />
        </div>

        {/* Products Display */}
        <div className="flex-1 p-6 ml-6 bg-white border border-gray-200 rounded-lg shadow-lg">
          <p className="text-lg text-gray-800">{category?.description}</p>
          <div className="pt-4 grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-8 px-2">
            {products?.map((item, index) => (
              <ProductCard key={item?.id + "_" + index} {...item} title={item?.name} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductListPage;
