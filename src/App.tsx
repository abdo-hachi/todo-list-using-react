import React from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import ListsTodos from "./components/ListsTodos";
import AddTodo from "./components/AddTodo";

const App: React.FC = () => {
  return (
    <Container maxWidth="xs">
      <Typography style={{ textAlign: "center", margin: "1rem" }} variant="h4">
        Todo List App
      </Typography>
      <AddTodo />
      <ListsTodos />
    </Container>
  );
};

export default App;
