import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css"; // Import the CSS file

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/tasks");
      setTasks(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1 className="title">📋 Task List</h1>
      {loading ? (
        <p className="loading">Loading tasks...</p>
      ) : tasks.length === 0 ? (
        <p className="no-tasks">No tasks found.</p>
      ) : (
        <ul className="task-list">
          {tasks.map((task) => (
            <li key={task.id} className="task-item">
              <strong>{task.title}</strong>
              <p>{task.description}</p>
              <span className={task.completed ? "completed" : "pending"}>
                {task.completed ? "Completed ✅" : "Pending ⏳"}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
