<?php

use Illuminate\Database\Seeder;
use App\Customer;

/**
 * Class CustomersTableSeeder
 */
class CustomersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(Customer::class, 5)->create();
    }
}
