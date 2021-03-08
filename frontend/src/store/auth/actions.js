import AuthActionTypes from "./types";
import axios from "../../config/axiosInstance";
import NotificationActionTypes from "../notification/types";
import { ACCESS_TOKEN } from "../../constants";

export const getUser = () => async (dispatch, getState) => {
  /* User is already loaded */
  if (getState().auth.loggedUser) return;

  try {
    const response = await axios.get("/user");
    const token = localStorage.getItem(ACCESS_TOKEN);

    dispatch({
      type: AuthActionTypes.UPDATE_AUTH,
      payload: {
        user: response.data,
        token,
      },
    });
  } catch (e) {
    dispatch({
      type: NotificationActionTypes.CREATE_NOTIFICATION,
      payload: {
        message: e.response.data.errors[0],
        error: true,
      },
    });
  }
};

export const login = ({ email, password }) => async (dispatch) => {
  try {
    const response = await axios.post("/auth/login", {
      email,
      password,
    });

    localStorage.setItem(ACCESS_TOKEN, response.data.token);

    dispatch({
      type: AuthActionTypes.UPDATE_AUTH,
      payload: response.data,
    });
  } catch (e) {
    dispatch({
      type: NotificationActionTypes.CREATE_NOTIFICATION,
      payload: {
        message: e.response.data.errors[0],
        error: true,
      },
    });
  }
};

export const register = ({ name, email, password }) => async (dispatch) => {
  try {
    const response = await axios.post("/auth/register", {
      name,
      email,
      password,
    });

    localStorage.setItem(ACCESS_TOKEN, response.data.token);

    dispatch({
      type: NotificationActionTypes.CREATE_NOTIFICATION,
      payload: {
        message: "User registered with success",
        error: false,
      },
    });

    dispatch({
      type: AuthActionTypes.UPDATE_AUTH,
      payload: response.data,
    });
  } catch (e) {
    dispatch({
      type: NotificationActionTypes.CREATE_NOTIFICATION,
      payload: {
        message: e.response.data.errors[0],
        error: true,
      },
    });
  }
};

export const logout = () => async (dispatch) => {
  try {
    await axios.post("/auth/logout", {});

    localStorage.removeItem(ACCESS_TOKEN);

    dispatch({
      type: AuthActionTypes.UPDATE_AUTH,
      payload: {
        user: null,
        token: "",
      },
    });
  } catch (e) {
    dispatch({
      type: NotificationActionTypes.CREATE_NOTIFICATION,
      payload: {
        message: e.response.data.errors[0],
        error: true,
      },
    });
  }
};
