import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
jest.mock('sweetalert2');


describe("Task Manager App", () => {
  test("renders input fields and add button", () => {
    render(<App />);
    expect(screen.getByPlaceholderText("Task Name")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /add task/i })).toBeInTheDocument();
  });

  test("adds a new task", async () => {
    render(<App />);
    const nameInput = screen.getByPlaceholderText("Task Name");
    const dateInput = screen.getByLabelText(/date/i) || screen.getByRole("textbox", { name: "" });
    const addButton = screen.getByRole("button", { name: /add task/i });

    await userEvent.type(nameInput, "Test Task");
    const today = new Date().toISOString().split("T")[0];
    await userEvent.type(dateInput, today);

    fireEvent.click(addButton);

    expect(await screen.findByText("Test Task")).toBeInTheDocument();
    expect(await screen.findByText(today)).toBeInTheDocument();
  });

  test("does not delete pending task", async () => {
    render(<App />);
    const nameInput = screen.getByPlaceholderText("Task Name");
    const dateInput = screen.getByLabelText(/date/i) || screen.getByRole("textbox", { name: "" });
    const addButton = screen.getByRole("button", { name: /add task/i });

    await userEvent.type(nameInput, "Pending Task");
    const today = new Date().toISOString().split("T")[0];
    await userEvent.type(dateInput, today);
    fireEvent.click(addButton);

    const deleteButton = screen.getByRole("button", { name: /delete/i });
    fireEvent.click(deleteButton);

    expect(screen.getByText("Pending Task")).toBeInTheDocument(); // still there
  });

  test("edits a task", async () => {
    render(<App />);
    const nameInput = screen.getByPlaceholderText("Task Name");
    const dateInput = screen.getByLabelText(/date/i) || screen.getByRole("textbox", { name: "" });
    const addButton = screen.getByRole("button", { name: /add task/i });

    await userEvent.type(nameInput, "Task To Edit");
    const today = new Date().toISOString().split("T")[0];
    await userEvent.type(dateInput, today);
    fireEvent.click(addButton);

    const editButton = screen.getByRole("button", { name: /edit/i });
    fireEvent.click(editButton);

    await userEvent.clear(nameInput);
    await userEvent.type(nameInput, "Edited Task");
    fireEvent.click(screen.getByRole("button", { name: /update task/i }));

    expect(screen.getByText("Edited Task")).toBeInTheDocument();
  });
});
