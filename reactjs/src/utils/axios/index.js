import axios from "axios";

export const getToken = () => localStorage.getItem("accessToken");

const customAxios = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

customAxios.interceptors.request.use(
  request => {
    request.headers.Authorization = `${getToken()}`;
    return request;
  },
  err => {
    return Promise.reject(err);
  },
);

export default customAxios;

