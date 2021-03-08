import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import { useSelector, useDispatch } from "react-redux";
import { deleteNotification } from "../../store/notification/actions";

const Notification = () => {
  const dispatch = useDispatch();

  const message = useSelector((state) => state.notification.message);
  const error = useSelector((state) => state.notification.error);
  const active = useSelector((state) => state.notification.active);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") return;
    dispatch(deleteNotification());
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      open={active}
      autoHideDuration={3000}
      onClose={handleClose}
    >
      <Alert
        elevation={6}
        variant="filled"
        onClose={handleClose}
        severity={error ? "error" : "success"}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Notification;
