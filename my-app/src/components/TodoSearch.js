import { useDispatch } from "react-redux";
import SearchIcon from "@material-ui/icons/Search";
import { TextField, IconButton } from "@material-ui/core";

import { setFilterWord } from "../redux";

const TodoSearch = () => {
  const dispatch = useDispatch();

  const changeFilterText = (event) => {
    dispatch(setFilterWord(event.target.value));
  };

  return (
    <form>
      <TextField
        dir="rtl"
        size="small"
        label="חיפוש"
        onChange={changeFilterText}
      />
      <IconButton>
        <SearchIcon />
      </IconButton>
    </form>
  );
};

export default TodoSearch;
