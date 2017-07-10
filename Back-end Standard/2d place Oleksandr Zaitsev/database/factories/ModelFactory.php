<?php

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| Here you may define all of your model factories. Model factories give
| you a convenient way to create models for testing and seeding your
| database. Just tell the factory how a default model should look.
|
*/

$factory->define(App\Customer::class, function (Faker\Generator $faker) {
    return [
        // no additional fields :(
    ];
});

$factory->define(App\Employee::class, function (Faker\Generator $faker) {
    return [
        'name' => str_slug($faker->name),
        'at_work' => (bool) rand(0, 1),
        'in_talk' => (bool) rand(0, 1)
    ];
});

$factory->define(App\Area::class, function (Faker\Generator $faker) {
    static $i = 0;

    $names = [
        'bills',
        'contracts',
        'special-offers',
        'leases'
    ];

    if ($i > count($names) + 1) {
        throw new \Exception('All available names are set');
    }

    return [
        'name' => $names[$i++]
    ];
});

$factory->define(App\Call::class, function (Faker\Generator $faker) {
    $statuses = [
        'pending',
        'denied',
        'processed'
    ];

    return [
        'status' => $statuses[array_rand($statuses)]
    ];
});
