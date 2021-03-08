import ProductActionTypes from "./types";

const INITIAL_STATE = {
  products: [],
};

const productReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ProductActionTypes.FETCH_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      };
    case ProductActionTypes.CREATE_PRODUCT:
      return {
        ...state,
        products: [...state.products, action.payload],
      };
    case ProductActionTypes.UPDATE_PRODUCT:
      return {
        ...state,
        products: state.products.map((prod) => {
          if (prod.id !== action.payload.id) return prod;
          return { ...action.payload };
        }),
      };
    case ProductActionTypes.DELETE_PRODUCT:
      return {
        ...state,
        products: state.products.filter((prod) => prod.id !== action.payload),
      };
    default:
      return state;
  }
};

export default productReducer;
