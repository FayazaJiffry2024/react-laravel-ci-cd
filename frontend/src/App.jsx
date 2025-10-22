import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newTask, setNewTask] = useState({ title: "", description: "" });

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/tasks");
      setTasks(res.data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    } finally {
      setLoading(false);
    }
  };

  const addTask = async () => {
    if (!newTask.title) return alert("Title is required");
    try {
      const res = await axios.post("http://127.0.0.1:8000/api/tasks", newTask);
      setTasks([...tasks, res.data.task]);
      setNewTask({ title: "", description: "" });
    } catch (err) {
      console.error("Error creating task:", err);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/tasks/${id}`);
      setTasks(tasks.filter((t) => t.id !== id));
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  const toggleComplete = async (id) => {
    try {
      const res = await axios.patch(`http://127.0.0.1:8000/api/tasks/${id}/toggle`);
      setTasks(tasks.map((t) => (t.id === id ? res.data.task : t)));
    } catch (err) {
      console.error("Error toggling task:", err);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Poppins, sans-serif", maxWidth: "600px", margin: "auto" }}>
      <h1 style={{ color: "#007bff", textAlign: "center" }}>📋 Task Manager</h1>

      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Title"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          style={{ padding: "8px", width: "60%", marginRight: "10px" }}
        />
        <input
          type="text"
          placeholder="Description"
          value={newTask.description}
          onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
          style={{ padding: "8px", width: "30%", marginRight: "10px" }}
        />
        <button onClick={addTask} style={{ padding: "8px 12px", backgroundColor: "#28a745", color: "#fff", border: "none" }}>
          Add Task
        </button>
      </div>

      {loading ? (
        <p>Loading tasks...</p>
      ) : tasks.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {tasks.map((task) => (
            <li
              key={task.id}
              style={{
                backgroundColor: task.completed ? "#d4edda" : "#f8f9fa",
                marginBottom: "10px",
                padding: "10px",
                borderRadius: "8px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                boxShadow: "0px 2px 5px rgba(0,0,0,0.1)"
              }}
            >
              <div>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleComplete(task.id)}
                  style={{ marginRight: "10px" }}
                />
                <strong>{task.title}</strong> — {task.description}
              </div>
              <button
                onClick={() => deleteTask(task.id)}
                style={{ backgroundColor: "#dc3545", color: "#fff", border: "none", padding: "5px 10px", borderRadius: "5px" }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
