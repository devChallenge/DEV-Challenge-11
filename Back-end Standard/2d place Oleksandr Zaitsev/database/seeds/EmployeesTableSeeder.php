<?php

use Illuminate\Database\Seeder;
use App\Employee;

/**
 * Class EmployeesTableSeeder
 */
class EmployeesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(Employee::class, 5)->create();
    }
}
