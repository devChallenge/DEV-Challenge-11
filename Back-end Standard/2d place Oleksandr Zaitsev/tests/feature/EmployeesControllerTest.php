<?php

use Laravel\Lumen\Testing\DatabaseTransactions;
use App\Employee;

/**
 * Class EmployeesControllerTest
 */
class EmployeesControllerTest extends TestCase
{
    use DatabaseTransactions;

    public function setUp()
    {
        parent::setUp();

        $this->artisan('db:seed');
    }

    public function testItShouldHandleRegisterRequest()
    {
        $this->get('/register?name=EmployeeName&area=bills&area=contracts&area=special-offers');
        $this->seeStatusCode(200);
        $this->seeInDatabase('employees', ['name' => 'EmployeeName', 'at_work' => true]);
        $this->assertEquals('WELCOME', $this->response->getContent());
    }

    public function testItShouldHandleRegisterRequestIfAreaHasOneValue()
    {
        $this->get('/register?name=EmployeeName&area=bills');
        $this->seeStatusCode(200);
        $this->seeInDatabase('employees', ['name' => 'EmployeeName', 'at_work' => true]);
        $this->assertEquals('WELCOME', $this->response->getContent());
    }

    public function testItShouldFailIfNameIsNotProvided()
    {
        $this->get('/register?area=bills&area=contracts&area=special-offers');
        $this->seeStatusCode(400);
    }

    public function testItShouldFailIfAreaIsNotProvided()
    {
        $this->get('/register?name=EmployeeName1');
        $this->seeStatusCode(400);
    }

    public function testItShouldHandleResetRequest()
    {
        $this->get('/reset');
        $this->seeStatusCode(200);
    }

    public function testItShouldResetAllEmployees()
    {
        Employee::get()->each(function ($employee) {
            $employee->update(['at_work' => true]);
        });

        $this->seeInDatabase('employees' , ['at_work' => true]);
        $this->get('/reset');
        $this->seeStatusCode(200);
        $this->notSeeInDatabase('employees' , ['at_work' => true]);
    }
}
