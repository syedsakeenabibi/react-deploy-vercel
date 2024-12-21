import axios from "axios";
import { API_BASE_URL } from "./constant"; // Assuming `getHeaders()` is not necessary here

export const fileUploadAPI = async (file, fileName) => {
  const url = `${API_BASE_URL}/api/file`;

  // Prepare the form data
  const formData = new FormData();
  formData.append("file", file); // Ensure this matches the @RequestParam name in the backend
  formData.append("fileName", fileName); // Append the file name

  try {
    // Sending the POST request
    const response = await axios.post(url, formData, {
      headers: {
        // If you need to add custom headers (like for Authorization), do it here
        "Content-Type": "multipart/form-data", // Ensure the correct content type
      },
    });
    console.log('File uploaded successfully', response?.data);
    return response?.data; // Return response data if successful
  } catch (err) {
    // Improved error handling
    console.error("Error during file upload:", err.response?.data || err.message);
    throw new Error(err.response?.data || err.message); // Throw error with detailed message
  }
};
