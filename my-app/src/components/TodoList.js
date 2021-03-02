import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleTodoComplete, deleteTodoAction, setTodos } from "../redux";
import {
  List,
  ListItem,
  Tooltip,
  IconButton,
  Checkbox,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

const SERVER_ADDRESS = "http://localhost:4567/";

const TodoList = () => {
  useEffect(() => {
    getAllTodoFromServer();
  });

  const todos = useSelector((state) => state.todos);

  const dispatch = useDispatch();

  const getAllTodoFromServer = async () => {
    const response = await fetch(`${SERVER_ADDRESS}allMissions`);
    const allMissionsData = await response.json();
    dispatch(setTodos(allMissionsData));
  };

  const toggleTodo = async (todoId) => {
    await fetch(`${SERVER_ADDRESS}checkMission`, {
      method: "POST",
      body: JSON.stringify(todoId),
    });
    dispatch(toggleTodoComplete(todoId));
  };

  const deleteTodo = async (todo) => {
    await fetch(`${SERVER_ADDRESS}removeMission`, {
      method: "POST",
      body: JSON.stringify(todo.id),
    });
    dispatch(deleteTodoAction(todo.id));
  };

  return (
    <List className="todo-list">
      {todos.map((todo) => (
        <ListItem key={todo.id}>
          <Checkbox
            checked={todo.complete}
            onChange={toggleTodo.bind(null, todo.id)}
          />
          <span>{todo.name}</span>
          <Tooltip title="מחק">
            <IconButton>
              <DeleteIcon
                className="delete-button"
                onClick={deleteTodo.bind(null, todo)}
              ></DeleteIcon>
            </IconButton>
          </Tooltip>
        </ListItem>
      ))}
    </List>
  );
};

export default TodoList;
