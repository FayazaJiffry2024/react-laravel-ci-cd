<?php

namespace App\Http\Controllers;

use App\Models\Task; // Import Task model to use database table
use Illuminate\Http\Request; // Handle incoming HTTP requests

class TaskController extends Controller
{
    // Function to get all tasks
    public function index()
    {
        // Return all tasks as JSON data
        return response()->json(Task::all());
    }

    // Function to create a new task
    public function store(Request $request)
    {
        // Validate input before saving
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string'
        ]);

        // Create new task and store in database
        $task = Task::create([
            'title' => $request->title,
            'description' => $request->description,
        ]);

        // Return success message and the created task data
        return response()->json(['message' => 'Task created successfully!', 'task' => $task]);
    }

    // Function to show one specific task using ID
    public function show($id)
    {
        // Find by ID or show 404 error
        $task = Task::findOrFail($id);
        return response()->json($task);
    }

    // Function to update a task
    public function update(Request $request, $id)
    {
        // First find the task
        $task = Task::findOrFail($id);

        // Update the data using the request
        $task->update($request->all());

        return response()->json(['message' => 'Task updated successfully!', 'task' => $task]);
    }

    // Function to delete a task
    public function destroy($id)
    {
        // First find the task
        $task = Task::findOrFail($id);

        // Delete from database
        $task->delete();

        return response()->json(['message' => 'Task deleted successfully!']);
    }
}
