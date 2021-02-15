import { Box } from "@material-ui/core";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <Box display="flex" justifyContent="center">
      <App />
    </Box>
  </React.StrictMode>,
  document.getElementById("root")
);
