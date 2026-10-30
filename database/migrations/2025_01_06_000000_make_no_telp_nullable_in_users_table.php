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
        if (Schema::hasColumn('users', 'no_telp')) {
            DB::statement('ALTER TABLE users MODIFY COLUMN no_telp VARCHAR(255) NULL');
        } else {
            Schema::table('users', function (Blueprint $table) {
                $table->string('no_telp')->nullable();
            });
        }
    }

    public function down(): void
    {
        if (Schema::hasColumn('users', 'no_telp')) {
            Schema::table('users', function (Blueprint $table) {
                $table->dropColumn('no_telp');
            });
        }
    }
};

