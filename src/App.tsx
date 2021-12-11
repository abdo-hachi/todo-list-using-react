import React from "react";
import Container from "@material-ui/core/Container";
import { AppBar, Button, Toolbar } from "@material-ui/core";
import ListsTodos from "./components/ListsTodos";
import AddTodo from "./components/AddTodo";
import LoginButton from "./components/LoginButton";
import LogoutButton from "./components/LogoutButton";
import { useAuth0 } from "@auth0/auth0-react";
import Box from "@material-ui/core/Box";

const App: React.FC = () => {
  const { isAuthenticated } = useAuth0();
  return (
    <Container maxWidth="xs">
      <AppBar>
        <Toolbar>
          <Box display="flex" flexDirection="row">
            <Box p={1}>
              <LoginButton />
            </Box>
            <Box p={1}>
              <LogoutButton />
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      {isAuthenticated ? (
        <div style={{ marginTop: "5rem" }}>
          <h1 style={{ textAlign: "center", margin: "1rem" }}>Todo List App</h1>
          <AddTodo />
          <ListsTodos />
        </div>
      ) : (
        <h2 style={{ textAlign: "center", marginTop: "5rem" }}>
          Please login in order to add your Todos!{" "}
        </h2>
      )}
    </Container>
  );
};

export default App;
