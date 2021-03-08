import AuthActionTypes from "./types";

const INITIAL_STATE = {
  loggedUser: null,
  accessToken: "",
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AuthActionTypes.UPDATE_AUTH:
      return {
        ...state,
        loggedUser: action.payload.user,
        accessToken: action.payload.token,
      };
    case AuthActionTypes.UPDATE_ACCESS_TOKEN:
      return {
        ...state,
        accessToken: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
