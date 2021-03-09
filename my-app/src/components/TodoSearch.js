import React from "react";
import { useDispatch } from "react-redux";
import { setFilterWord } from "../redux";

import {
  TextField,
  CssBaseline,
  ThemeProvider,
  createMuiTheme,
  IconButton,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

const rtlTheme = createMuiTheme({ direction: "rtl" });

const TodoSearch = () => {
  const dispatch = useDispatch();

  const changeFilterText = (event) => {
    dispatch(setFilterWord(event.target.value));
  };

  return (
    <ThemeProvider theme={rtlTheme}>
      <CssBaseline />
      <form>
        <TextField
          dir="rtl"
          id="searchMission"
          size="small"
          label="חיפוש"
          onChange={changeFilterText}
        />
        <IconButton>
          <SearchIcon />
        </IconButton>
      </form>
    </ThemeProvider>
  );
};

export default TodoSearch;
