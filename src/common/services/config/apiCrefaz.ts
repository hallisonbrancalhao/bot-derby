import axios from "axios";

export const apiGlpi = axios.create({
  baseURL: `${process.env.URL_API_GLPI}/`,
  headers: {
    Accept: "*/*",
    "Content-Type": "application/json;charset=UTF-8",
  },
});

export default apiGlpi;
