import { createStore } from 'redux';

const initialState = {
  todos: [
    {
      name: 'לקרוא ספר',
      complete: false
    },
    {
      name: 'לסיים לחפיפה',
      complete: false
    }
  ]
};

export const store = createStore(
  reducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
// Reducer
function reducer(state, action) {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        todos: [...state.todos, action.payload]
      };
    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.name === action.payload
            ? { ...todo, complete: !todo.complete }
            : todo
        )
      };
    case 'DELETE_TODO':
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.name !== action.payload)
      };
    default:
      return state;
  }
}
// Actions
export const addTodoAction = (todo) => ({
  type: 'ADD_TODO',
  payload: todo
});

export const toggleTodoComplete = (todoName) => ({
  type: 'TOGGLE_TODO',
  payload: todoName
});

export const deleteTodoAction = (todoName) => ({
  type: 'DELETE_TODO',
  payload: todoName
});