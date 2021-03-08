import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ component: Component, ...attributes }) => {
  const accessToken = useSelector((state) => state.auth.accessToken);

  return (
    <Route
      {...attributes}
      render={(props) =>
        accessToken ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default PrivateRoute;
