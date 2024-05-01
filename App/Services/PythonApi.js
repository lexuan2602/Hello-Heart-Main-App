import axios from "axios";

// const BASE_URL = "http://127.0.0.1:8000/info/";
const BASE_URL = "http://10.20.7.130:8000";

const AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const AxiosInstance2 = axios.create({
  baseURL: BASE_URL,
});

const getPrediction = async (userProfile) => {
  try {
    console.log(userProfile);
    const response = await AxiosInstance.post("/info/", userProfile);
    return response.data;
  } catch (error) {
    // Handle errors
    if (error.response) {
      // Strapi returns errors in `error.response.data`
      console.error("Error:", error.response.data);
      throw error.response.data; // Rethrow to handle elsewhere
    } else {
      console.error("Network or unknown error:", error);
      throw new Error("Network or unknown error occurred");
    }
  }
};

const getInfo = async () => {
  try {
    const response = await AxiosInstance.get("/endpoint/");
    return response.data;
  } catch (error) {
    // Handle errors
    if (error.response) {
      // Strapi returns errors in `error.response.data`
      console.error("Error:", error.response.data);
      throw error.response.data; // Rethrow to handle elsewhere
    } else {
      console.error("Network or unknown error:", error);
      throw new Error("Network or unknown error occurred");
    }
  }
};

const getSolutions = async (patientProfile) => {
  try {
    const response = await AxiosInstance.post(
      "/info/tabu_search_patient/",
      patientProfile
    );
    return response.data;
  } catch (error) {
    // Handle errors
    if (error.response) {
      // Strapi returns errors in `error.response.data`
      console.error("Error:", error.response.data);
      throw error.response.data; // Rethrow to handle elsewhere
    } else {
      console.error("Network or unknown error:", error);
      throw new Error("Network or unknown error occurred");
    }
  }
};

export default {
  getPrediction,
  getInfo,
  getSolutions,
};
