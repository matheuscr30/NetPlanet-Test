import axios from "../../config/axiosInstance";
import ProductActionTypes from "./types";
import NotificationActionTypes from "../notification/types";

export const getProducts = () => async (dispatch) => {
  try {
    const response = await axios.get("/products");
    dispatch({
      type: ProductActionTypes.FETCH_PRODUCTS,
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

export const createProduct = (data) => async (dispatch) => {
  const { name, description, brand, quantity, price } = data;

  try {
    const response = await axios.post("/products", {
      name,
      description,
      brand,
      quantity,
      price,
    });

    dispatch({
      type: NotificationActionTypes.CREATE_NOTIFICATION,
      payload: {
        message: "Product created with success",
        error: false,
      },
    });

    dispatch({
      type: ProductActionTypes.CREATE_PRODUCT,
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

export const updateProduct = (data) => async (dispatch) => {
  const { id, description, brand, quantity, price } = data;

  try {
    const response = await axios.put(`/products/${id}`, {
      description,
      brand,
      quantity,
      price,
    });

    dispatch({
      type: NotificationActionTypes.CREATE_NOTIFICATION,
      payload: {
        message: "Product updated with success",
        error: false,
      },
    });

    dispatch({
      type: ProductActionTypes.UPDATE_PRODUCT,
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

export const deleteProduct = (id) => async (dispatch) => {
  try {
    await axios.delete(`/products/${id}`);

    dispatch({
      type: NotificationActionTypes.CREATE_NOTIFICATION,
      payload: {
        message: "Product deleted with success",
        error: false,
      },
    });

    dispatch({
      type: ProductActionTypes.DELETE_PRODUCT,
      payload: id,
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
