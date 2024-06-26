import { useEffect } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import { useSelector, useDispatch } from "react-redux";
import { List, ListItem, IconButton, Checkbox } from "@material-ui/core";

import { toggleTodoComplete, deleteTodoAction, setTodos } from "../redux";

const { REACT_APP_SERVER_ADDRESS } = process.env;

const TodoList = () => {
  useEffect(() => {
    getAllTodoFromServer();
  });

  const todos = useSelector((state) => state.todos);
  const filterWord = useSelector((state) => state.filterWord);

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

  const filteredTodosList = () => {
    return todos.filter((todo) =>
      todo.name.toLowerCase().includes(filterWord.toLowerCase())
    );
  };

  return (
    <List>
      {filteredTodosList().map((todo) => (
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
