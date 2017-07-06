package com.dev.challenge.service;

import com.dev.challenge.db.Employee;
import com.dev.challenge.model.response.EmployeesResponse;
import com.dev.challenge.model.response.EmployeesResponse.Assignment;
import com.dev.challenge.repository.EmployeeRepository;
import com.dev.challenge.util.Generator;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.Arrays;
import java.util.List;

@ActiveProfiles("test")
@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment= SpringBootTest.WebEnvironment.RANDOM_PORT)
public class EmployeeServiceTest {

    @Autowired private EmployeeService employeeService;
    @Autowired private EmployeeRepository employeeRepository;

    @Before
    public void resetBd() {
        employeeRepository.deleteAll();
    }

    @Test
    public void testRegister() {

        employeeService.registerEmployee("Zinoviy", Arrays.asList("frontend", "backend", "devOps"));
        List<Employee> employees = employeeRepository.findAll();
        Assert.assertEquals(employees.size(), 1);
        Employee employee = employees.get(0);
        Assert.assertEquals(employee.getName(), "Zinoviy");
        Assert.assertArrayEquals(employee.getAreas().toArray(), Arrays.asList("frontend", "backend", "devOps").toArray());
        employeeRepository.deleteAll();
    }

    @Test
    public void testCall() {

        employeeService.registerEmployee("Employee1", Arrays.asList("a", "b", "c"));
        employeeService.registerEmployee("Employee2", Arrays.asList("b", "c"));
        employeeService.registerEmployee("Employee3", Arrays.asList("a"));

        EmployeesResponse response = employeeService.call(Arrays.asList("a", "c", "v"));

        Assignment assignment1 = response.getAssignments().get(0);
        Assignment assignment2 = response.getAssignments().get(1);
        Assignment assignment3 = response.getAssignments().get(2);

        Assert.assertTrue(response.getTotalAssignments() == 2);
        Assert.assertEquals(assignment1.getEmployee(), "Employee3");
        Assert.assertEquals(assignment2.getEmployee(), "Employee2");
        Assert.assertTrue(assignment3.getEmployee().isEmpty());
        employeeRepository.deleteAll();
    }

    @Test
    public void testReset() {

        employeeService.registerEmployee("Employee1", Arrays.asList("a", "b", "c"));
        employeeService.registerEmployee("Employee2", Arrays.asList("b", "c"));
        employeeService.registerEmployee("Employee3", Arrays.asList("a"));
        employeeService.reset();
        List<Employee> employees = employeeRepository.findAll();
        Assert.assertTrue(employees.isEmpty());
    }
}
