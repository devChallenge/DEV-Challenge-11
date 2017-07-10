<?php

use Laravel\Lumen\Testing\DatabaseTransactions;
use App\Employee;

/**
 * Class EmployeeTest
 */
class EmployeeTest extends TestCase
{
    use DatabaseTransactions;

    public function testEmployeeCanBeRegistered()
    {
        $employee = factory(Employee::class)->create(['at_work' => false]);
        $this->assertFalse($employee->isAtWork());
        $this->assertTrue($employee->register());
        $this->assertTrue($employee->isAtWork());
    }

    public function testEmployeeCanBeUnRegistered()
    {
        $employee = factory(Employee::class)->create(['at_work' => true]);
        $this->assertTrue($employee->isAtWork());
        $this->assertTrue($employee->unRegister());
        $this->assertFalse($employee->isAtWork());
    }

    public function testEmployeeCanGetCalled()
    {
        $employee = factory(Employee::class)->create(['at_work' => true, 'in_talk' => false]);
        $this->assertTrue($employee->isAvailable());
        $this->assertTrue($employee->getInTalk());
        $this->assertFalse($employee->isAvailable());
    }
}
