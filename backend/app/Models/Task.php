<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory; // Imports a Laravel feature that helps to create fake/sample data

class Task extends Model
{
    use HasFactory;

    // List of columns that can be filled directly
    protected $fillable = ['title', 'description', 'completed'];
}
