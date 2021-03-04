import React from "react";
import { useSelector } from "react-redux";
import { Autocomplete } from "@material-ui/lab";
import { Box, TextField } from "@material-ui/core";

const TodoSearch = () => {
  const todos = useSelector((state) => state.todos);

  return (
    <Box width="20vw" justifyContent="center">
      <TextField
        fullWidth="true"
        dir="rtl"
        id="newMissionNameInput"
        size="small"
        label="שם משימה"
        variant="outlined"
      />
    </Box>
  );
};

export default TodoSearch;
