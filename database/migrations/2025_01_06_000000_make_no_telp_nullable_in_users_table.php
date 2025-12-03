<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Use raw SQL to alter the column to be nullable
        // This works for MySQL/MariaDB
        DB::statement('ALTER TABLE users MODIFY COLUMN no_telp VARCHAR(255) NULL');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Revert to NOT NULL (you may want to set a default value first)
        DB::statement('ALTER TABLE users MODIFY COLUMN no_telp VARCHAR(255) NOT NULL');
    }
};

