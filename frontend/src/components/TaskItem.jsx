import React from "react";

function TaskItem({ task }) {
  return (
    <div className="bg-white p-4 rounded shadow mb-3 flex justify-between items-center">
      <div>
        <h2 className="font-semibold text-lg">{task.title}</h2>
        <p className="text-gray-600">{task.description}</p>
      </div>
      <div>
        {task.completed ? (
          <span className="text-green-500 font-bold">✓ Completed</span>
        ) : (
          <span className="text-red-500 font-bold">✗ Pending</span>
        )}
      </div>
    </div>
  );
}

export default TaskItem;
