import React from "react";

import { createBrowserRouter } from "react-router-dom";
import ProductListPage from "./pages/Product;istPage/ProductListPage";
import Shop from "./Shop";
import ShopApplicationWrapper from "./pages/Product;istPage/ShopApplicationWrapper";
import ProductDetails from "./pages/Product;istPage/ProductDetailPage/ProductDetails";
import { loadProductById } from "./routes/products";


 export const router = createBrowserRouter(
    [
        {
            path:"/",
            element:<ShopApplicationWrapper/>,
       children:[
        {
            path:"/",
            element:<Shop/>
        },
        {
            path:"/women",
            element:<ProductListPage categoryType={'WOMEN'}/>,
        },
        {
            path:"/men",
            element:<ProductListPage categoryType={'MEN'}/>,
        },
        {
            path:"/product/:productId",
            loader:loadProductById,
            element:<ProductDetails/>
        }
       ]
    }
    ]);