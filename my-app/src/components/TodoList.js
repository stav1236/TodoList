import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleTodoComplete, deleteTodoAction } from "../redux";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";

const TodoList = () => {
  const todos = useSelector((state) => state.todos);
  // Get dispatch
  const dispatch = useDispatch();
  // Set reference functions by wrapping action creators with dispatch
  // (using this instread of useActions since that's been removed)
  const toggleTodo = (todoName) => dispatch(toggleTodoComplete(todoName));
  const deleteTodo = (todoName) => dispatch(deleteTodoAction(todoName));

  return (
    <List className="todo-list">
      {todos.map((todo) => (
        <ListItem key={todo.name}>
          <input
            type="checkbox"
            checked={todo.complete}
            onChange={toggleTodo.bind(null, todo.name)}
          />
          <span className={todo.complete ? "complete" : null}>{todo.name}</span>
          <Tooltip title="מחק">
            <IconButton>
              <DeleteIcon
                className="delete-button"
                onClick={deleteTodo.bind(null, todo.name)}
              ></DeleteIcon>
            </IconButton>
          </Tooltip>
        </ListItem>
      ))}
    </List>
  );
};

export default TodoList;
