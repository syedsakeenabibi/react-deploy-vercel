import { getToken } from "../utils/jwt-helper";

export const API_URLS = {
    GET_PRODUCTS: '/api/products',
    GET_PRODUCT: (id) => `/api/product/${id}`,
    GET_CATEGORIES: '/api/category',
    GET_CATEGORY: (id) => `/api/category/${id}`,
  };
  
  export const API_BASE_URL = 'https://sakishop-backened-production.up.railway.app';
  
  export const getHeaders = ()=>{
    return {
        'Authorization':`Bearer ${getToken()}`
    } 
}
  