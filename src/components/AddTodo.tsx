import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../app/store";
import { addTodo } from "../features/todoSlice";

const AddTodo: React.FC = () => {
  const [todoTitle, setTodoTitle] = useState<string>("");
  const [todoDescription, setTodoDescription] = useState<string>("");
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
    <div>
      <TextField
        style={{ marginBottom: "1rem" }}
        variant="outlined"
        placeholder="To Do Title"
        fullWidth
        onChange={(e) => setTodoTitle(e.target.value)}
        value={todoTitle}
      />
      <TextField
        style={{ marginBottom: "1rem" }}
        variant="outlined"
        fullWidth
        placeholder="To Do Description"
        onChange={(e) => setTodoDescription(e.target.value)}
        value={todoDescription}
      />
      <Button
        name="Add Item"
        variant="contained"
        color="primary"
        fullWidth
        onClick={handelAddTodo}
      >
        Add Item
      </Button>
    </div>
  );
};

export default AddTodo;
