import React, { useState } from "react";
import { addTodoAction } from "../redux";
import { useDispatch, useSelector } from "react-redux";
import alertify from "alertifyjs";
import "alertifyjs/build/css/alertify.css";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { lightGreen, grey } from "@material-ui/core/colors";
import { withStyles } from "@material-ui/core/styles";

const AddButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(lightGreen.A400),
    backgroundColor: lightGreen.A400,
    "&:hover": {
      backgroundColor: lightGreen.A700,
    },
    border: "0.1vw solid",
    borderColor: grey[900],
  },
}))(Button);

const SERVER_ADDRESS = "http://localhost:4567/";

const TodoInput = () => {
  const emptyMissionWarning = "יש להכניס שם משימה";
  const existMissionWarning = "לא ניתן להוסיף משימה קיימת";
  const hebrewLettersnWarning = "שם משימה יכול להכיל רק אותיות בעברית";

  const todosList = useSelector((state) => state.todos);
  const [currentTodo, setTodo] = useState("");
  const dispatch = useDispatch();
  const addTodo = async (currentTodo) => {
    const response = await fetch(`${SERVER_ADDRESS}insertMission`, {
      method: "POST",
      body: JSON.stringify(currentTodo),
    });
    const responseText = await response.text();
    console.log(responseText);

    dispatch(addTodoAction(currentTodo));
  };
  const onChange = (event) => {
    setTodo(event.target.value);
  };
  const onSubmit = (event) => {
    const HebrewChars = new RegExp("^[\u0590-\u05FF ]+$");
    event.preventDefault();
    if (!currentTodo) {
      alertify.warning(emptyMissionWarning);
    } else if ([...todosList].find((myTodo) => myTodo.name === currentTodo)) {
      alertify.warning(existMissionWarning);
    } else if (!HebrewChars.test(currentTodo)) {
      alertify.warning(hebrewLettersnWarning);
    } else {
      addTodo({
        id: Date.now(),
        name: currentTodo,
        complete: false,
      });
    }
    setTodo("");
  };

  return (
    <form onSubmit={onSubmit}>
      <TextField
        id="newMissionNameInput"
        size="small"
        label="שם משימה"
        variant="outlined"
        type="text"
        value={currentTodo}
        onChange={onChange}
      />
      <AddButton type="submit">הוסף</AddButton>
    </form>
  );
};

export default TodoInput;
