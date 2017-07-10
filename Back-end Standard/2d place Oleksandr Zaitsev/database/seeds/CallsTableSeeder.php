<?php

use Illuminate\Database\Seeder;
use App\{
    Area, Call, Customer, Employee
};

/**
 * Class EmployeesTableSeeder
 */
class CallsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(Call::class, 5)->make()->each(function ($call) {
            $call->area()->associate(Area::get()->random());
            $call->customer()->associate(Customer::get()->random());
            $call->employee()->associate(Employee::get()->random());
            $call->save();
        });
    }
}
