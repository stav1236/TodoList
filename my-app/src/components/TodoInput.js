import React, { useState } from "react";
import { addTodoAction } from "../redux";
import { useDispatch, useSelector } from "react-redux";
import "alertifyjs/build/css/alertify.css";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { lightGreen, grey } from "@material-ui/core/colors";
import { withStyles } from "@material-ui/core/styles";
import Swal from "sweetalert2";

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

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 1500,
  timerProgressBar: true,
});

const {REACT_APP_SERVER_ADDRESS} = process.env;

const emptyMissionWarning = "יש להכניס שם משימה";
const existMissionWarning = "לא ניתן להוסיף משימה קיימת";
const newMissionAddingMsg = "נוספה משימה";
const WARNING_ICON = "warning";
const SUCCESS_ICON = "success";

const TodoInput = () => {
  console.log(process.env)

  const todosList = useSelector((state) => state.todos);
  const [newToDoText, setTodo] = useState("");
  const dispatch = useDispatch();

  const addTodo = async (newToDo) => {
    await fetch(`${REACT_APP_SERVER_ADDRESS}insertMission`, {
      method: "POST",
      body: JSON.stringify(newToDo),
    });
    dispatch(addTodoAction(newToDo));
    Toast.fire({
      icon: SUCCESS_ICON,
      title: newMissionAddingMsg,
    });
  };

  const onChange = (event) => {
    setTodo(event.target.value);
  };

  const isTodoWithTheSameName = () => {
    return [...todosList].find(
      (currentTodo) => currentTodo.name === newToDoText
    );
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (!newToDoText) {
      Toast.fire({
        icon: WARNING_ICON,
        title: emptyMissionWarning,
      });
    } else if (isTodoWithTheSameName()) {
      Toast.fire({
        icon: WARNING_ICON,
        title: existMissionWarning,
      });
    } else {
      addTodo({
        id: Date.now(),
        name: newToDoText,
        complete: false,
      });
    }
    setTodo("");
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <TextField
          id="newMissionNameInput"
          size="small"
          label="שם משימה"
          variant="outlined"
          type="text"
          value={newToDoText}
          onChange={onChange}
        />
        <AddButton type="submit">הוסף</AddButton>
      </form>
    </div>
  );
};

export default TodoInput;
