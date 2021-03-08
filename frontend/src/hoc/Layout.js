import React from "react";
import { Box } from "@material-ui/core";

import NavBar from "../components/Navbar/Navbar";
import Notification from "../components/Notification/Notification";

const Layout = (props) => {
  return (
    <div>
      <NavBar />

      <Box py={7}>
        <main>{props.children}</main>
      </Box>

      <Notification />
    </div>
  );
};

export default Layout;
