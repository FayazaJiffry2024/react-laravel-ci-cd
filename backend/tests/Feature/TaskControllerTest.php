<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\Task;
use Illuminate\Foundation\Testing\RefreshDatabase;

class TaskControllerTest extends TestCase
{
    use RefreshDatabase; // This will refresh the DB for each test

    /** @test */
    public function it_can_list_all_tasks()
    {
        // Arrange: create some tasks
        Task::factory()->count(3)->create();

        // Act: call the index API
        $response = $this->getJson('/api/tasks');

        // Assert: check status and JSON count
        $response->assertStatus(200)
                 ->assertJsonCount(3);
    }

    /** @test */
    public function it_can_create_a_task()
    {
        $data = [
            'title' => 'Test Task',
            'description' => 'Task description'
        ];

        $response = $this->postJson('/api/tasks', $data);

        $response->assertStatus(200)
                 ->assertJson(['message' => 'Task created successfully!'])
                 ->assertJsonFragment(['title' => 'Test Task']);

        $this->assertDatabaseHas('tasks', ['title' => 'Test Task']);
    }

    /** @test */
    public function it_can_show_a_task()
    {
        $task = Task::factory()->create();

        $response = $this->getJson("/api/tasks/{$task->id}");

        $response->assertStatus(200)
                 ->assertJson(['id' => $task->id]);
    }

    /** @test */
    public function it_can_update_a_task()
    {
        $task = Task::factory()->create();

        $data = ['title' => 'Updated Task'];

        $response = $this->putJson("/api/tasks/{$task->id}", $data);

        $response->assertStatus(200)
                 ->assertJsonFragment(['title' => 'Updated Task']);

        $this->assertDatabaseHas('tasks', ['id' => $task->id, 'title' => 'Updated Task']);
    }

    /** @test */
    public function it_can_delete_a_task()
    {
        $task = Task::factory()->create();

        $response = $this->deleteJson("/api/tasks/{$task->id}");

        $response->assertStatus(200)
                 ->assertJson(['message' => 'Task deleted successfully!']);

        $this->assertDatabaseMissing('tasks', ['id' => $task->id]);
    }

    /** @test */
    public function it_can_toggle_task_completion()
    {
        $task = Task::factory()->create(['completed' => false]);

        $response = $this->patchJson("/api/tasks/{$task->id}/toggle");

        $response->assertStatus(200)
                 ->assertJsonFragment(['completed' => true]);

        $this->assertDatabaseHas('tasks', ['id' => $task->id, 'completed' => true]);
    }
}
