import React from "react";
import { useDispatch } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";

import Layout from "./hoc/Layout";
import Login from "./containers/Auth/Login";
import Register from "./containers/Auth/Register";
import Dashboard from "./containers/Dashboard/Dashboard";
import PrivateRoute from "./hoc/PrivateRoute";

import { getUser } from "./store/auth/actions";
import AuthActionTypes from "./store/auth/types";
import { ACCESS_TOKEN } from "./constants";

const App = () => {
  const dispatch = useDispatch();

  /* Load user when he is logged in */
  const accessToken = localStorage.getItem(ACCESS_TOKEN);
  if (accessToken) {
    dispatch({
      type: AuthActionTypes.UPDATE_ACCESS_TOKEN,
      payload: accessToken,
    });
    dispatch(getUser());
  }

  return (
    <div>
      <Layout>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <PrivateRoute path="/dashboard" component={Dashboard} />
          <Route render={() => <Redirect to="/dashboard" />} />
        </Switch>
      </Layout>
    </div>
  );
};

export default App;
