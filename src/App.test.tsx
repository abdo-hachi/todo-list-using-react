import React from "react";
import {
  render,
  screen,
  fireEvent,
  findByPlaceholderText,
} from "@testing-library/react";
import App from "./App";
import AddTodo from "./components/AddTodo";
import { Provider } from "react-redux";
import { store } from "./app/store";

describe("Todo", () => {
  it("should render the same text heading in app component ", async () => {
    const { getByText } = render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(getByText("Todo List App")).toBeInTheDocument();
  });
  it("should Add a todo  ", async () => {
    const { findByRole, findByPlaceholderText, getByRole, getByTestId } =
      render(
        <Provider store={store}>
          <App />
        </Provider>
      );
    const inputTitleElemnt = await findByPlaceholderText(/To Do Title/i);
    const inputDescriptionElemnt = await findByPlaceholderText(
      /To Do Description/i
    );
    const buttonElement = await findByRole("button", { name: /Add Item/i });
    fireEvent.change(inputTitleElemnt, { target: { value: "test add todo" } });
    fireEvent.change(inputDescriptionElemnt, {
      target: { value: "bla bla bla" },
    });
    fireEvent.click(buttonElement);
    const title = getByTestId("title");
    const description = getByTestId("description");
    expect(title).toBeInTheDocument();
    expect(description).toBeInTheDocument();
  });
});
