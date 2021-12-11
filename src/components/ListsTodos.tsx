import React, { useRef, useState } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import BorderColorIcon from "@material-ui/icons/BorderColor";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../app/store";
import { editTodo, removeTodo, setTodoStatus } from "../features/todoSlice";

const ListsTodos: React.FC = () => {
  const todoList = useSelector((state: RootState) => state.todos);
  const dispatch = useDispatch<AppDispatch>();
  const [titleValue, setTitleValue] = useState("");
  const [descriptionValue, setDescriptionValue] = useState("");
  const textFieldTitle: any | boolean = useRef<HTMLInputElement | boolean>(
    true
  );
  const textFieldDescription: any | boolean = useRef<
    HTMLInputElement | boolean
  >(true);
  const handelEditTodo = () => {
    (textFieldTitle.current as HTMLInputElement).disabled = false;
    (textFieldDescription.current as HTMLInputElement).disabled = false;
  };
  const updateTodo = (id: string, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.which === 13) {
      dispatch(
        editTodo({ id, title: titleValue, description: descriptionValue })
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
            <ListItemText>
              <input
                style={{
                  textDecoration: todo.completed ? "line-through" : "none",
                }}
                data-testid="title"
                disabled={textFieldTitle}
                ref={textFieldTitle}
                defaultValue={todo.title}
                onKeyPress={(e) => {
                  setTitleValue(textFieldTitle.current.value);
                  updateTodo(todo.id, e);
                }}
              />
              <input
                style={{
                  textDecoration: todo.completed ? "line-through" : "none",
                }}
                data-testid="description"
                disabled={textFieldDescription}
                ref={textFieldDescription}
                defaultValue={todo.description}
                onKeyPress={(e) => {
                  setDescriptionValue(textFieldDescription.current.value);
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
