import React from "react";
import { useDispatch, useSelector } from "react-redux";
import AppBar from "@material-ui/core/AppBar";
import PagesIcon from "@material-ui/icons/Pages";
import {
  Box,
  Toolbar,
  Button,
  IconButton,
  Typography,
} from "@material-ui/core";

import styles from "./Navbar.module.scss";
import { logout } from "../../store/auth/actions";

const NavBar = () => {
  const loggedUser = useSelector((state) => state.auth.loggedUser);
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <div>
      <AppBar position="static" className={styles.Toolbar}>
        <Toolbar>
          <IconButton
            color="primary"
            aria-label="menu"
            className={styles.ToolbarIcon}
          >
            <PagesIcon />
          </IconButton>

          <Box flexGrow={1} align="center">
            <Typography variant="h5">NetPlanet</Typography>
          </Box>

          {loggedUser ? (
            <Button color="inherit" onClick={logoutHandler}>
              Logout
            </Button>
          ) : (
            ""
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavBar;
