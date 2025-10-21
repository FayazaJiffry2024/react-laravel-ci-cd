<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{

    //Run the migrations (php artisan migrate)
    public function up(): void
    {
         Schema::create('tasks', function (Blueprint $table) {

            // Creates an auto increment 'id' column
            $table->id();

            // Creates a 'title' column for task name
            $table->string('title');

            // Task details (optional)
            $table->text('description')->nullable();

            // true/false column to mark task done or not
            $table->boolean('completed')->default(false);

            // Creates 'created_at' and 'updated_at' columns automatically
            $table->timestamps();
        });
    }

    // Reverse the migrations
    public function down(): void
    {
        // Deletes the 'tasks' table if we rollback
         Schema::dropIfExists('tasks');
    }
};
