import React, { useRef, useState } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import BorderColorIcon from "@material-ui/icons/BorderColor";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../app/store";
import { editTodo, removeTodo, setTodoStatus } from "../features/todoSlice";

const ListsTodos: React.FC = () => {
  const todoList = useSelector((state: RootState) => state.todos);
  const dispatch = useDispatch<AppDispatch>();
  const [titleVlaue, setTitleVlaue] = useState("");
  const [descriptionVlaue, setDescriptionVlaue] = useState("");
  const textFieldTitle: any | boolean = useRef<HTMLInputElement | boolean>(
    true
  );
  const textFieldDescription: any | boolean = useRef<
    HTMLInputElement | boolean
  >(true);
  const handelEditTodo = () => {
    (textFieldTitle.current as HTMLInputElement).disabled = false;
    (textFieldDescription.current as HTMLInputElement).disabled = false;
    console.log(textFieldTitle, textFieldDescription);
  };
  const updateTodo = (id: string, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.which === 13) {
      dispatch(
        editTodo({ id, title: titleVlaue, description: descriptionVlaue })
      );
      (textFieldTitle.current as HTMLInputElement).disabled = true;
      (textFieldDescription.current as HTMLInputElement).disabled = true;
    }
  };
  return (
    <div>
      <List>
        {todoList.map((todo) => (
          <ListItem key={todo.id}>
            <ListItemText
              style={{
                textDecoration: todo.completed ? "line-through" : "none",
              }}
            >
              <input
                disabled={textFieldTitle}
                ref={textFieldTitle}
                defaultValue={todo.title}
                onKeyPress={(e) => {
                  setTitleVlaue(textFieldTitle.current.value);
                  updateTodo(todo.id, e);
                }}
              />
              <input
                disabled={textFieldDescription}
                ref={textFieldDescription}
                defaultValue={todo.description}
                onKeyPress={(e) => {
                  setDescriptionVlaue(textFieldDescription.current.value);
                  updateTodo(todo.id, e);
                }}
              />
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
                  dispatch(editTodo(todo));
                  handelEditTodo();
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
    </div>
  );
};

export default ListsTodos;
