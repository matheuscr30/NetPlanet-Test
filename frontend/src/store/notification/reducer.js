import NotificationActionTypes from "./types";

const INITIAL_STATE = {
  message: "",
  error: false,
  active: false,
};

const notificationReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case NotificationActionTypes.CREATE_NOTIFICATION:
      return {
        ...state,
        message: action.payload.message,
        error: action.payload.error,
        active: true,
      };
    case NotificationActionTypes.DELETE_NOTIFICATION:
      return {
        ...state,
        message: "",
        active: false,
      };
    default:
      return state;
  }
};

export default notificationReducer;
