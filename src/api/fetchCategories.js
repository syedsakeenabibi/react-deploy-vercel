
import axios from "axios";
import { API_BASE_URL, API_URLS } from "./constant"



export const fetchCategories = async () => {
    const url = API_BASE_URL + API_URLS.GET_CATEGORIES;
    console.log("Requesting URL:", url); // Log URL for debugging

    try {
        const result = await axios.get(url);
        return result?.data;
    } catch (e) {
        console.error("Axios error:", e); // Log detailed error
    }
};
