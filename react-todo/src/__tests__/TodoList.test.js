import { render, screen, fireEvent } from "@testing-library/react";
import TodoList from "../components/TodoList";

describe("TodoList Component", () => {

  test("renders initial todos", () => {
    render(<TodoList />);

    expect(screen.getByText("Learn React")).toBeInTheDocument();
    expect(screen.getByText("Write Tests")).toBeInTheDocument();
    expect(screen.getByText("Build Project")).toBeInTheDocument();
  });

  test("adds new todo", () => {
    render(<TodoList />);

    const input = screen.getByTestId("todo-input");
    const addButton = screen.getByText("Add");

    fireEvent.change(input, { target: { value: "New Todo" } });
    fireEvent.click(addButton);

    expect(screen.getByText("New Todo")).toBeInTheDocument();
  });

  test("toggles todo completion", () => {
    render(<TodoList />);

    const todo = screen.getByText("Learn React");

    fireEvent.click(todo);

    expect(todo).toHaveStyle("text-decoration: line-through");
  });

  test("deletes todo", () => {
    render(<TodoList />);

    const deleteBtn = screen.getAllByText("Delete")[0];

    fireEvent.click(deleteBtn);

    expect(screen.queryByText("Learn React")).not.toBeInTheDocument();
  });

});