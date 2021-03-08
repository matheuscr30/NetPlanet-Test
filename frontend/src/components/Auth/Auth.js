import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Grid,
  Button,
  Link,
} from "@material-ui/core";

import { login, register } from "../../store/auth/actions";
import { createNotification } from "../../store/notification/actions";
import styles from "./Auth.module.scss";

const Auth = ({ isLogin }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const history = useHistory();
  const dispatch = useDispatch();

  const handleSignIn = () => {
    history.push("/login");
  };

  const handleSignUp = () => {
    history.push("/register");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (validateFields()) {
      const data = {
        name,
        email,
        password,
      };

      isLogin ? dispatch(login(data)) : dispatch(register(data));
    }
  };

  const validateFields = () => {
    const errors = [];

    if (!isLogin && (!name || name.length === 0))
      errors.push("Name is a required field");
    if (!email || email.length === 0) errors.push("Email is a required field");
    if (!password || password.length < 6)
      errors.push("Password must be at least 6 characters");
    if (!isLogin && password !== passwordConfirm)
      errors.push("Passwords do not match");

    if (errors.length) {
      dispatch(
        createNotification({
          message: errors[0],
          error: true,
        })
      );
      return false;
    }

    return true;
  };

  return (
    <Container maxWidth="sm">
      <Box justifyContent="center" mx="auto">
        <form onSubmit={handleSubmit}>
          <Grid container spacing={0}>
            <Grid item xs={12}>
              <Typography
                variant="h4"
                className={styles.Title}
                color="textPrimary"
              >
                {isLogin ? "Sign In" : "Create new account"}
              </Typography>
            </Grid>

            {!isLogin ? (
              <Grid item xs={12}>
                <Box mt={2.5}>
                  <TextField
                    id="name"
                    label="Name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    variant="outlined"
                    fullWidth
                  />
                </Box>
              </Grid>
            ) : (
              ""
            )}

            <Grid item xs={12}>
              <Box mt={2.5}>
                <TextField
                  id="email"
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  variant="outlined"
                  fullWidth
                />
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Box mt={2.5}>
                <TextField
                  id="password"
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  variant="outlined"
                  fullWidth
                />
              </Box>
            </Grid>

            {!isLogin ? (
              <Grid item xs={12}>
                <Box mt={2.5}>
                  <TextField
                    id="passwordConfirm"
                    label="Confirm Password"
                    type="password"
                    value={passwordConfirm}
                    onChange={(e) => setPasswordConfirm(e.target.value)}
                    variant="outlined"
                    fullWidth
                  />
                </Box>
              </Grid>
            ) : (
              ""
            )}

            <Grid item xs={12}>
              <Box mt={2.5}>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  type="submit"
                  fullWidth
                >
                  {isLogin ? "Sign In Now" : "Sign Up Now"}
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box mt={1.5}>
                <Typography variant="subtitle1" color="textSecondary">
                  {isLogin ? "Don't have an account?" : "Have an account?"}

                  <Box component="span" ml={1}>
                    {isLogin ? (
                      <Link href="#" color="primary" onClick={handleSignUp}>
                        Sign Up
                      </Link>
                    ) : (
                      <Link href="#" color="primary" onClick={handleSignIn}>
                        Sign In
                      </Link>
                    )}
                  </Box>
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

export default Auth;
