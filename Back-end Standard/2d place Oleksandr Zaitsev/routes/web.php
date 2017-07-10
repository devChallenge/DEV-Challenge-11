<?php

$app->get('/register', [
    'as' => 'employees.register',
    'uses' => 'EmployeesController@register'
]);

$app->get('/reset', [
    'as' => 'employees.reset',
    'uses' => 'EmployeesController@reset'
]);

$app->get('/call', [
    'as' => 'calls.receive',
    'uses' => 'CallsController@receive'
]);