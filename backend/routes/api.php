<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TaskController;

// Create automatic REST API routes for tasks

/*  Route::get('/tasks', [TaskController::class, 'index']);
    Route::get('/tasks/{id}', [TaskController::class, 'show']);
    Route::post('/tasks', [TaskController::class, 'store']);
    Route::put('/tasks/{id}', [TaskController::class, 'update']);
    Route::delete('/tasks/{id}', [TaskController::class, 'destroy']); */

Route::patch('tasks/{id}/toggle', [TaskController::class, 'toggleComplete']);
Route::apiResource('tasks', App\Http\Controllers\TaskController::class);

