import { combineReducers } from "redux";

import authReducer from "./auth/reducer";
import productReducer from "./product/reducer";
import notificationReducer from "./notification/reducer";

export default combineReducers({
  auth: authReducer,
  product: productReducer,
  notification: notificationReducer,
});
