package com.dev.challenge.service;

import com.dev.challenge.db.Employee;
import com.dev.challenge.model.response.EmployeesResponse;
import com.dev.challenge.repository.EmployeeRepository;
import com.dev.challenge.service.helper.EmployeeServiceHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class EmployeeService extends ParentService {

    @Autowired private EmployeeRepository employeeRepository;
    @Autowired private EmployeeServiceHelper employeeServiceHelper;

    public void registerEmployee(String name, List<String> areas) {

        String employeeId = generator.generateId();
        Employee employee = new Employee(employeeId, name, areas);
        employeeRepository.save(employee);
    }
    public EmployeesResponse call(List<String> areas) {

        EmployeesResponse response = employeeServiceHelper.initEmployeeResponse(areas);

        List<String> chosenEmployeeIds = new ArrayList<>();
        List<Employee> chosenEmployees = new ArrayList<>();
        for (String area : areas) {
            List<Employee> employees = employeeRepository.findByIdNotInAndAreas(chosenEmployeeIds, area);
            if (employees == null || employees.isEmpty()) continue;
            Employee employee = employeeServiceHelper.getEmployeeWithLessExpertiseAreas(employees);
            employeeServiceHelper.setToResponse(employee, area, response);
            chosenEmployeeIds.add(employee.getId());
            chosenEmployees.add(employee);
        }
        employeeRepository.delete(chosenEmployees);
        return response;
    }

    public void reset() {
        employeeRepository.deleteAll();
    }
}
