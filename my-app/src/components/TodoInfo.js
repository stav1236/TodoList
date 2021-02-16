import React from "react";
import { useSelector } from "react-redux";

const TodoInfo = () => {
  const todos = useSelector((state) => state.todos);
  const todosLength = todos.length;
  const completedTododsLen = todos.filter((todo) => todo.complete === true)
    .length;

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
