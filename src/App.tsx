import React from "react";
import Container from "@material-ui/core/Container";

import ListsTodos from "./components/ListsTodos";
import AddTodo from "./components/AddTodo";

const App: React.FC = () => {
  return (
    <Container maxWidth="xs">
      <h1 style={{ textAlign: "center", margin: "1rem" }}>Todo List App</h1>
      <AddTodo />
      <ListsTodos />
    </Container>
  );
};

export default App;
