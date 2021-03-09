import React from "react";
import { useSelector } from "react-redux";

const TodoInfo = () => {
  const todos = useSelector((state) => state.todos);
  const filterWord = useSelector((state) => state.filterWord);

  const filteredTodosList = () => {
    return todos.filter((todo) =>
      todo.name.toLowerCase().includes(filterWord.toLowerCase())
    );
  };

  const todosLength = filteredTodosList().length;
  const completedTododsLen = filteredTodosList().filter(
    (todo) => todo.complete === true
  ).length;

  return (
    <div>
      <h3>
        קיימות {todosLength} משימות, {completedTododsLen} הושלמו,{" "}
        {todosLength - completedTododsLen} בהשלמה{" "}
      </h3>
    </div>
  );
};

export default TodoInfo;
