import { createStore } from "redux";

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_TODOS":
      return {
        ...state,
        todos: action.payload,
      };
    case "ADD_TODO":
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };
    case "TOGGLE_TODO":
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.name === action.payload
            ? { ...todo, complete: !todo.complete }
            : todo
        ),
      };
    case "DELETE_TODO":
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.name !== action.payload),
      };
    default:
      return state;
  }
}

export const addTodoAction = (todo) => ({
  type: "ADD_TODO",
  payload: todo,
});

export const toggleTodoComplete = (todoName) => ({
  type: "TOGGLE_TODO",
  payload: todoName,
});

export const deleteTodoAction = (todoName) => ({
  type: "DELETE_TODO",
  payload: todoName,
});

export const setTodos = (todoList) => ({
  type: "SET_TODOS",
  payload: todoList,
});

const initialState = {
  todos: []
};

export const store = createStore(
  reducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);