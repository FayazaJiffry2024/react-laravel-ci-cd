<?php

namespace App\Http\Controllers;

use App\Models\Task; // Import Task model
use Illuminate\Http\Request; // Handle incoming HTTP requests

class TaskController extends Controller
{
    // Get all tasks
    public function index()
    {
        return response()->json(Task::all());
    }

    // Create a new task
    public function store(Request $request)
    {
        $quest->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string'
        ]);

        $task = Task::create([
            'title' => $request->title,
            'description' => $request->description,
        ]);

        return response()->json(['message' => 'Task created successfully!', 'task' => $task]);
    }

    // Show a specific task by ID
    public function show($id)
    {
        $task = Task::findOrFail($id);
        return response()->json($task);
    }

    // Update a task (full or partial update)
    public function update(Request $request, $id)
    {
        $task = Task::findOrFail($id);
        $task->update($request->all());

        return response()->json(['message' => 'Task updated successfully!', 'task' => $task]);
    }

    // Delete a task
    public function destroy($id)
    {
        $task = Task::findOrFail($id);
        $task->delete();

        return response()->json(['message' => 'Task deleted successfully!']);
    }

    // Toggle completion status of a task
    public function toggleComplete($id)
    {
        $task = Task::findOrFail($id);

        // Toggle the completed field
        $task->completed = !$task->completed;
        $task->save();

        return response()->json([
            'message' => 'Task completion status updated!',
            'task' => $task
        ]);
    }
}
