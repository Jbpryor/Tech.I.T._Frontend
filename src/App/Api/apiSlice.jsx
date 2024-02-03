import axios from "axios";
import { selectCurrentToken } from "../../components/Auth/authSlice";
import store from "../store";

const apiSlice = axios.create({
  baseURL: 'http://localhost:3500',
  withCredentials: true,
});

apiSlice.interceptors.request.use(async (config) => {
  const token = selectCurrentToken(store.getState());

  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  return config;
});

export default apiSlice;
