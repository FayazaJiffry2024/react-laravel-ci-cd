import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from "sweetalert2"; // import SweetAlert2
import "./App.css";

function App() {
  // ------------------------------
  // React State variables
  // ------------------------------
  const [tasks, setTasks] = useState([]); // store all tasks
  const [taskName, setTaskName] = useState(""); // store task name
  const [taskDate, setTaskDate] = useState(""); // store task date
  const [editingTaskId, setEditingTaskId] = useState(null); // store task id if editing

  // ------------------------------
  // Validation Functions
  // ------------------------------
  const isValidTaskName = (name) => /^[A-Za-z\s]+$/.test(name); // only letters and spaces allowed
  const isValidDate = (date) => {
    const today = new Date();
    const selectedDate = new Date(date);
    today.setHours(0, 0, 0, 0);
    selectedDate.setHours(0, 0, 0, 0);
    return selectedDate >= today; // date should not be in the past
  };

  // ------------------------------
  // SweetAlert Toast Notification
  // ------------------------------
  const notify = (title, icon = "success") => {
    Swal.fire({
      title,
      icon,
      timer: 1500,
      showConfirmButton: false,
      toast: true,
      position: "top-end",
    });
  };

  // ------------------------------
  // Add or Update Task
  // ------------------------------
  const handleAddOrUpdateTask = (e) => {
    e.preventDefault();

    if (!taskName) return notify("Please enter a task name", "error");
    if (!isValidTaskName(taskName))
      return notify("Task name can only contain letters and spaces", "error");
    if (!taskDate) return notify("Please select a date", "error");
    if (!isValidDate(taskDate))
      return notify("You cannot select a past date", "error");

    if (editingTaskId) {
      // update existing task
      setTasks(
        tasks.map((task) =>
          task.id === editingTaskId
            ? { ...task, name: taskName, date: taskDate }
            : task
        )
      );
      setEditingTaskId(null);
      notify("Task updated successfully");
    } else {
      // add new task
      const newTask = {
        id: Date.now(),
        name: taskName,
        date: taskDate,
        status: "Pending",
      };
      setTasks([...tasks, newTask]);
      notify("Task added successfully");
    }

    setTaskName("");
    setTaskDate("");
  };

  // ------------------------------
  // Edit, Delete, Toggle Status
  // ------------------------------
  const handleEdit = (task) => {
    setTaskName(task.name);
    setTaskDate(task.date);
    setEditingTaskId(task.id);
  };

  const handleDelete = (taskId) => {
    const task = tasks.find((t) => t.id === taskId);
    if (task.status !== "Completed") {
      return notify("You can delete only completed tasks!", "error");
    }
    setTasks(tasks.filter((t) => t.id !== taskId));
    notify("Task deleted successfully");
  };

  const toggleStatus = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId
          ? { ...task, status: task.status === "Pending" ? "Completed" : "Pending" }
          : task
      )
    );
  };

  // ------------------------------
  // UI Design
  // ------------------------------
  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Task Manager</h1>

      <form className="mb-4" onSubmit={handleAddOrUpdateTask}>
        <div className="row g-2">
          {/* Task Name Input */}
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Task Name"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
            />
          </div>

          {/* Date Input with Label */}
          <div className="col-md-3">
            <label htmlFor="taskDate" className="form-label">
              Select Date:
            </label>
            <input
              id="taskDate"
              type="date"
              className="form-control"
              value={taskDate}
              onChange={(e) => setTaskDate(e.target.value)}
              min={new Date().toISOString().split("T")[0]} // block past dates
            />
          </div>

          {/* Add / Update Button */}
          <div className="col-md-2 align-self-end">
            <button type="submit" className="btn btn-primary w-100">
              {editingTaskId ? "Update Task" : "Add Task"}
            </button>
          </div>
        </div>
      </form>

      {/* Task Table */}
      {tasks.length > 0 && (
        <table className="table table-bordered table-striped">
          <thead className="table-dark">
            <tr>
              <th>Name</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.id}>
                <td>{task.name}</td>
                <td>{task.date}</td>
                <td>
                  <span
                    className={
                      task.status === "Completed" ? "text-success" : "text-warning"
                    }
                    style={{ cursor: "pointer" }}
                    onClick={() => toggleStatus(task.id)}
                  >
                    {task.status}
                  </span>
                </td>
                <td>
                  <button
                    className="btn btn-sm btn-info me-2"
                    onClick={() => handleEdit(task)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(task.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;
