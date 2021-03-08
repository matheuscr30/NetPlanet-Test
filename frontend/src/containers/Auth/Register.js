import React from "react";
import Auth from "../../components/Auth/Auth";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const Register = () => {
  const accessToken = useSelector((state) => state.auth.accessToken);

  if (accessToken) {
    return <Redirect to="/dashboard" />;
  }

  return <Auth isLogin={false} />;
};

export default Register;
