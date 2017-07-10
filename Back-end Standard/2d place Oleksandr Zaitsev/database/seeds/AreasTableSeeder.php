<?php

use Illuminate\Database\Seeder;
use App\Area;

/**
 * Class AreasTableSeeder
 */
class AreasTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(Area::class, 3)->create();
    }
}
