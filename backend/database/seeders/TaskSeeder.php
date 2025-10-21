<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Task;

class TaskSeeder extends Seeder
{
    public function run()
    {
        // Create 5 sample tasks
        Task::create(['title' => 'Buy groceries', 'completed' => false]);
        Task::create(['title' => 'Finish Laravel project', 'completed' => false]);
        Task::create(['title' => 'Call mom', 'completed' => true]);
        Task::create(['title' => 'Read a book', 'completed' => false]);
        Task::create(['title' => 'Workout', 'completed' => true]);
    }
}
