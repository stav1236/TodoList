import rtl from "jss-rtl";
import { create } from "jss";
import { Provider } from "react-redux";
import { StylesProvider, jssPreset } from "@material-ui/core/styles";
import { Box, ThemeProvider, createMuiTheme } from "@material-ui/core";

import { store } from "./redux";
import TodoList from "./components/TodoList";
import TodoInfo from "./components/TodoInfo";
import TodoInput from "./components/TodoInput";
import TodoSearch from "./components/TodoSearch";

const jss = create({ plugins: [...jssPreset().plugins, rtl()] });
const rtlTheme = createMuiTheme({ direction: "rtl" });

const App = () => {
  return (
    <Box display="flex" justifyContent="center">
      <StylesProvider jss={jss}>
        <ThemeProvider theme={rtlTheme}>
          <Provider store={store}>
            <div>
              <h1>TODO List</h1>
              <TodoInput />
              <br />
              <TodoSearch />
              <TodoList />
              <TodoInfo />
            </div>
          </Provider>
        </ThemeProvider>
      </StylesProvider>
    </Box>
  );
};

export default App;
