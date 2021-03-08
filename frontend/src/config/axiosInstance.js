import axios from "axios";
import { ACCESS_TOKEN } from "../constants";
import AuthActionTypes from "../store/auth/types";
import { getUser } from "../store/auth/actions";

export const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export const configureInterceptors = (store) => {
  instance.interceptors.request.use(
    (request) => {
      const accessToken = localStorage.getItem(ACCESS_TOKEN);
      if (accessToken) {
        if (!request.url.includes("user")) {
          store.dispatch(getUser());
        }
        request.headers.Authorization = `Bearer ${accessToken}`;
      }

      return request;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      /* Logout the user when the tokens expires */
      if (error.response.status === 401) {
        store.dispatch({
          type: AuthActionTypes.UPDATE_AUTH,
          payload: {
            user: null,
            token: "",
          },
        });
        localStorage.removeItem(ACCESS_TOKEN);
      }

      return Promise.reject(error);
    }
  );
};

export default instance;
