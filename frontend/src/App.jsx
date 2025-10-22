import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const API_BASE = "http://127.0.0.1:8000/api";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState(""); // you can use this for notes or date text
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  async function fetchTasks() {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE}/tasks`);
      setTasks(res.data);
    } catch (err) {
      console.error("fetchTasks error:", err);
    } finally {
      setLoading(false);
    }
  }

  async function handleAdd(e) {
    e.preventDefault();
    setError("");

    if (!title.trim()) {
      setError("Title is required.");
      return;
    }

    // backend expects 'title' and 'description' fields
    const payload = {
      title: title.trim(),
      description: description.trim(),
      // completed will default to false in DB if not provided; you can include completed: false
    };

    try {
      const res = await axios.post(`${API_BASE}/tasks`, payload);
      // Important: your controller returns ['message','task'], so created task is res.data.task
      const created = res.data.task ?? res.data; // fallback if controller changed
      if (!created) {
        console.warn("Unexpected create response:", res.data);
      } else {
        setTasks((prev) => [...prev, created]);
      }
      setTitle("");
      setDescription("");
    } catch (err) {
      console.error("Add task failed:", err.response ?? err);
      setError("Failed to add task. See console for details.");
    }
  }

  async function handleToggle(task) {
    try {
      // you added Route::patch('tasks/{id}/toggle', ...) — use PATCH
      const res = await axios.patch(`${API_BASE}/tasks/${task.id}/toggle`);
      const updated = res.data.task ?? res.data;
      setTasks((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
    } catch (err) {
      console.error("Toggle failed:", err.response ?? err);
    }
  }

  async function handleEdit(task) {
    // simple UI: prompt for new title & description
    const newTitle = prompt("New title:", task.title);
    if (newTitle === null) return; // cancelled
    const newDesc = prompt("New description:", task.description ?? "");

    try {
      const res = await axios.put(`${API_BASE}/tasks/${task.id}`, {
        title: newTitle,
        description: newDesc,
        completed: task.completed, // keep current completed value
      });
      const updated = res.data.task ?? res.data;
      setTasks((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
    } catch (err) {
      console.error("Update failed:", err.response ?? err);
      alert("Update failed. Check console.");
    }
  }

  async function handleDelete(task) {
    if (!task.completed) {
      alert("Only completed tasks can be deleted.");
      return;
    }
    if (!confirm("Delete this completed task?")) return;

    try {
      await axios.delete(`${API_BASE}/tasks/${task.id}`);
      setTasks((prev) => prev.filter((t) => t.id !== task.id));
    } catch (err) {
      console.error("Delete failed:", err.response ?? err);
    }
  }

  return (
    <div className="container">
      <h1>📋 Tasks</h1>

      <form onSubmit={handleAdd} className="form">
        <input
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">Add Task</button>
      </form>

      {error && <div className="error">{error}</div>}

      {loading ? (
        <div>Loading tasks...</div>
      ) : (
        <table className="task-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Completed</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.length === 0 ? (
              <tr>
                <td colSpan="4">No tasks found.</td>
              </tr>
            ) : (
              tasks.map((t) => (
                <tr key={t.id}>
                  <td>{t.title}</td>
                  <td>{t.description}</td>
                  <td>{t.completed ? "Yes" : "No"}</td>
                  <td>
                    <button onClick={() => handleToggle(t)}>
                      {t.completed ? "Mark Pending" : "Mark Done"}
                    </button>
                    <button onClick={() => handleEdit(t)}>Edit</button>
                    <button onClick={() => handleDelete(t)} disabled={!t.completed}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
      <p className="hint">Tip: open browser devtools → Network / Console to inspect requests & errors.</p>
    </div>
  );
}

export default App;
