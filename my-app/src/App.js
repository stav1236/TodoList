import React, { Component } from "react";
import { Provider } from "react-redux";
import { store } from "./redux";
// Components
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="main">
          <h1>TODO List</h1>
          <TodoInput />
          <TodoList />
        </div>
      </Provider>
    );
  }
}

export default App;
