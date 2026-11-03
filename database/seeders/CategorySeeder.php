<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            'Beras',
            'Minyak Goreng',
            'Gula Pasir',
            'Telur',
            'Bumbu Dapur',
            'Mie & Pasta',
            'Kopi & Teh',
            'Susu & Olahan',
            'Air Minum / Galon',
            'Gas LPG',
            'Snack & Cemilan',
        ];

        foreach ($categories as $name) {
            Category::firstOrCreate(
                ['slug' => Str::slug($name)],
                ['name' => $name]
            );
        }
    }
}
