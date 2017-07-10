<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\{
    Area, Customer, Employee, Call
};
use App\Jobs\ProcessCallJob;

/**
 * Class CallsController
 * @package App\Http\Controllers
 */
class CallsController extends Controller
{
    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function receive(Request $request)
    {
        $areas = $this->validateInput($request)['area'];

        $answer = [
            'totalAssignments' => 0,
            'assignments' => []
        ];

        foreach ($areas as $index => $area) {
            $employee = Employee::getRandomForArea($area);

            $answer['assignments'][$index] = [
                'area' => $area,
                'employee' => ''
            ];

            if (!is_null($employee)) {
                $employee->getInTalk();

                $call = Call::createWithRelations(
                    $employee,
                    Area::firstOrCreate(['name' => $area]),
                    Customer::create()
                );

                dispatch(new ProcessCallJob($call));

                $answer['totalAssignments'] += 1;
                $answer['assignments'][$index]['employee'] = $employee->name;
            }
        }

        return response()->json($answer);
    }
}
