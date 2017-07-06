package com.dev.challenge.rest;

import com.dev.challenge.model.response.EmployeesResponse;
import com.dev.challenge.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;

import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

@RestController
public class EmployeeController {

    @Autowired private EmployeeService employeeService;

    @RequestMapping(value = "/register", method = POST)
    public void registerEmployee(@RequestParam String name, @RequestParam String areas[]) {

        employeeService.registerEmployee(name, Arrays.asList(areas));
    }

    @RequestMapping(value = "/call", method = GET)
    public EmployeesResponse callEmployees(@RequestParam String areas[]) {
        return employeeService.call(Arrays.asList(areas));
    }

    @RequestMapping(value = "/reset", method = GET)
    public void reset() {
        employeeService.reset();
    }

}
