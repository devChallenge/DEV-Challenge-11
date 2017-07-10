<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        if (env('APP_ENV') === 'production') {
            die('Can\'t seed data on production!');
        }

        Model::unguard();

        $tables = [
            'areas',
            'employees',
            'customers',
            'area_employee',
            'calls',
        ];

        DB::statement('SET FOREIGN_KEY_CHECKS=0');

        foreach ($tables as $table) {
            DB::table($table)->truncate();
        }

        DB::statement('SET FOREIGN_KEY_CHECKS=1');

        Model::reguard();

        foreach ($tables as $table) {
            $table = preg_replace_callback('/_([a-z])/', function ($match) {
                return strtoupper($match[1]);
            }, ucfirst($table));

            $this->call($table . 'TableSeeder');
        }
    }
}
