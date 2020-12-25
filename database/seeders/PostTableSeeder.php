<?php

namespace Database\Seeders;

use Faker\Factory;
use App\Models\Post;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class PostTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Factory::create();

        foreach (range(1, 100) as $index) {
            $title = $faker->sentence;
            Post::create([
                "user_id"     => rand(1, 20),
                "category_id" => rand(1, 5),
                "title"       => $title,
                "slug"       => Str::slug($title),
                "content"     => $faker->paragraph,
                "thumbnail"   => $faker->imageUrl(),
                "status"      => $this->getRandomStatus(),
            ]);
        }
    }

    /**
     * @return mixed
     */
    public function getRandomStatus()
    {
        # Generate random status
        $statuses = array('draft', 'published');
        return $statuses[array_rand($statuses)];
    }
}
