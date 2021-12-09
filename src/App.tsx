import { useState } from "react";

import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import BorderColorIcon from "@material-ui/icons/BorderColor";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./app/store";
import {
  addTodo,
  editTodo,
  removeTodo,
  setTodoStatus,
} from "./features/todoSlice";

function App() {
  const [todoTitle, setTodoTitle] = useState("");
  const [todoDescription, setTodoDescription] = useState("");

  const todoList = useSelector((state: RootState) => state);
  const dispatch = useDispatch<AppDispatch>();
  const handelAddTodo = () => {
    if (todoDescription.trim() !== "" && todoTitle.trim() !== "") {
      dispatch(addTodo(todoTitle, todoDescription));
    } else {
      alert("Text field must not be empty");
    }
    setTodoTitle("");
    setTodoDescription("");
  };
  return (
    <Container maxWidth="xs">
      <Typography style={{ textAlign: "center" }} variant="h3">
        Todo List App
      </Typography>
      <TextField
        variant="outlined"
        label="To Do Title"
        fullWidth
        onChange={(e) => setTodoTitle(e.target.value)}
        value={todoTitle}
      />
      <TextField
        variant="outlined"
        label="To Do Description"
        fullWidth
        onChange={(e) => setTodoDescription(e.target.value)}
        value={todoDescription}
      />
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handelAddTodo}
      >
        Add Item
      </Button>
      <List>
        {todoList.map((todo) => (
          <ListItem key={todo.id}>
            <ListItemText
              style={{
                textDecoration: todo.completed ? "line-through" : "none",
              }}
            >
              <h3>{todo.title}</h3>
              <p>{todo.description}</p>
            </ListItemText>
            <ListItemSecondaryAction>
              <IconButton
                onClick={() => {
                  dispatch(removeTodo(todo.id));
                }}
              >
                <DeleteIcon />
              </IconButton>
              <IconButton
                onClick={() => {
                  dispatch(editTodo(todo.id));
                }}
              >
                <BorderColorIcon />
              </IconButton>
              <Checkbox
                edge="end"
                value={todo.completed}
                onChange={() => {
                  dispatch(
                    setTodoStatus({ completed: !todo.completed, id: todo.id })
                  );
                }}
              />
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Container>
  );
}

export default App;
