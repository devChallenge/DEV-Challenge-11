<?php

use Illuminate\Database\Seeder;
use App\{
    Area, Employee
};

/**
 * Class AreasTableSeeder
 */
class AreaEmployeeTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Employee::get()->each(function ($employee) {
            $areas = Area::get();
            $areas->shuffle()->take(rand(1, $areas->count()))->each(function ($area) use ($employee) {
                $employee->areas()->save($area);
            });
        });
    }
}
