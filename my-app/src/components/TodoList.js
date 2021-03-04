import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { toggleTodoComplete, deleteTodoAction, setTodos } from "../redux";

import { List, ListItem, IconButton, Checkbox } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

const { REACT_APP_SERVER_ADDRESS } = process.env;

const TodoList = () => {
  useEffect(() => {
    getAllTodoFromServer();
  });

  const todos = useSelector((state) => state.todos);

  const dispatch = useDispatch();

  const getAllTodoFromServer = async () => {
    if ([...todos].length === 0) {
      const response = await fetch(`${REACT_APP_SERVER_ADDRESS}allMissions`);
      const allMissionsData = await response.json();
      dispatch(setTodos(allMissionsData));
    }
  };

  const toggleTodo = async (todoId) => {
    await fetch(`${REACT_APP_SERVER_ADDRESS}checkMission`, {
      method: "POST",
      body: JSON.stringify(todoId),
    });
    dispatch(toggleTodoComplete(todoId));
  };

  const deleteTodo = async (todoId) => {
    await fetch(`${REACT_APP_SERVER_ADDRESS}removeMission`, {
      method: "POST",
      body: JSON.stringify(todoId),
    });
    dispatch(deleteTodoAction(todoId));
  };

  return (
    <List>
      {todos.map((todo) => (
        <ListItem key={todo.id}>
          <Checkbox
            color="primary"
            checked={todo.complete}
            onClick={() => toggleTodo(todo.id)}
          />
          <span>{todo.name}</span>
          <IconButton>
            <DeleteIcon onClick={() => deleteTodo(todo.id)}></DeleteIcon>
          </IconButton>
        </ListItem>
      ))}
    </List>
  );
};

export default TodoList;
