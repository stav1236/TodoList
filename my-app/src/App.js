import React from "react";
import { Provider } from "react-redux";

import { store } from "./redux";

import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import TodoInfo from "./components/TodoInfo";
import TodoSearch from "./components/TodoSearch";

import { StylesProvider, jssPreset } from "@material-ui/core/styles";

import { create } from "jss";
import rtl from "jss-rtl";

const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

const App = () => {
  return (
    <StylesProvider jss={jss}>
      <Provider store={store}>
        <div>
          <h1>TODO List</h1>
          <TodoInput />
          <TodoSearch />
          <TodoList />
          <TodoInfo />
        </div>
      </Provider>
    </StylesProvider>
  );
};

export default App;
