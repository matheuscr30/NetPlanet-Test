import NotificationActionTypes from "./types";

export const createNotification = (data) => {
  return {
    type: NotificationActionTypes.CREATE_NOTIFICATION,
    payload: data,
  };
};

export const deleteNotification = () => {
  return {
    type: NotificationActionTypes.DELETE_NOTIFICATION,
  };
};
