<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\{
    Area, Employee
};

/**
 * Class EmployeesController
 * @package App\Http\Controllers
 */
class EmployeesController extends Controller
{
    /**
     * Register employee with specified areas
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(Request $request)
    {
        $query = $this->validateInput($request);

        $employee = Employee::firstOrCreate(['name' => $query['name']]);
        $employee->areas()->detach();

        array_walk($query['area'], function ($area) use ($employee) {
            $area = Area::firstOrCreate(['name' => $area]);
            $area->employees()->save($employee);
        });

        $employee->register();

        return response('WELCOME');
    }

    /**
     * Reset all employees
     * @return \Illuminate\Http\JsonResponse
     */
    public function reset()
    {
        Employee::get()->each(function ($employee) {
           $employee->unRegister();
        });

        return response()->json(['status' => 'success']);
    }

    /**
     * @param Request $request
     * @return array
     */
    public function validateInput(Request $request): array
    {
        $query = parent::validateInput($request);

        if (!isset($query['name']) || !is_scalar($query['name']) || empty($query['name'])) {
            abort(400, "'name' param is necessary");
        }

        return $query;
    }
}