import { render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import App from "./App";

// Mock axios
jest.mock("axios");

describe("App Component", () => {
  test("renders loading initially", () => {
    render(<App />);
    expect(screen.getByText(/loading tasks/i)).toBeInTheDocument();
  });

  test("renders tasks from backend", async () => {
    // Mock API response
    axios.get.mockResolvedValueOnce({
      data: [
        { id: 1, title: "Task 1", description: "Desc 1", completed: false },
        { id: 2, title: "Task 2", description: "Desc 2", completed: true },
      ],
    });

    render(<App />);

    // Wait for tasks to appear
    await waitFor(() => {
      expect(screen.getByText("Task 1")).toBeInTheDocument();
      expect(screen.getByText("Task 2")).toBeInTheDocument();
      expect(screen.getByText(/pending/i)).toBeInTheDocument();
      expect(screen.getByText(/completed/i)).toBeInTheDocument();
    });
  });
});
