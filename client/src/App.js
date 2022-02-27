import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Login from "./components/Login";
import Register from "./components/Register";
import NoteBoard from "./components/NoteBoard";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from '@mui/material/Box';
import Typography from "@mui/material/Typography";

import "./App.css";

const App = () => {

  const toolbarStyle = {
    "@media (min-width: 0px)": {
      minHeight: "50px"
    }
  }

  const brandingStyle = {
    fontSize: "1rem",
    mr: 4,
  }
  
  const linkBoxStyle = {
    flexGrow: 1, 
    display: { xs: "flex" },
  }

  const linkTextStyle = {
    mr: 2,
    color: "white"
  }

  return (
    <Box>
      <AppBar>
        <Toolbar sx={toolbarStyle}>
          <Typography sx={brandingStyle}>Notes+</Typography>
          <Box sx={linkBoxStyle}>
            <Link to="/login">
                <Typography sx={linkTextStyle}>Login</Typography>
            </Link>
              <Link to="/register"><Typography sx={linkTextStyle}>Sign Up</Typography>
              </Link>
          </Box>
        </Toolbar>
      </AppBar>
      <Box>
        <Switch>
          <Route path="/notes"><NoteBoard /></Route>
          <Route path="/register"><Register /></Route>
          <Route path="/login"><Login /></Route>
          <Route path="/"><Login /></Route>
        </Switch>
      </Box>
    </Box>
  );
};

export default App;