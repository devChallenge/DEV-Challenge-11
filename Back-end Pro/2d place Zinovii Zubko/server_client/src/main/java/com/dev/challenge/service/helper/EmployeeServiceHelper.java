package com.dev.challenge.service.helper;

import com.dev.challenge.db.Employee;
import com.dev.challenge.model.response.EmployeesResponse;
import com.dev.challenge.model.response.EmployeesResponse.Assignment;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class EmployeeServiceHelper {

    public EmployeesResponse initEmployeeResponse(List<String> areas) {

        EmployeesResponse response = new EmployeesResponse();
        response.setTotalAssignments(0);
        response.setAssignments(new ArrayList<>());
        for (String area : areas) {
            response.getAssignments().add(new Assignment(area, ""));
        }
        return response;
    }

    public void setToResponse(Employee employee, String area, EmployeesResponse response) {

        response.setTotalAssignments(response.getTotalAssignments() + 1);
        for (Assignment assignment : response.getAssignments()) {
            if (assignment.getEmployee().isEmpty() && assignment.getArea().equals(area))
                assignment.setEmployee(employee.getName());
        }
    }

    public Employee getEmployeeWithLessExpertiseAreas(List<Employee> employees) {

        Employee employeeWithLessExpertiseAreas = employees.get(0);
        for (Employee employee : employees) {
            if (employee.getAreas().size() < employeeWithLessExpertiseAreas.getAreas().size())
                employeeWithLessExpertiseAreas = employee;
        }
        return employeeWithLessExpertiseAreas;
    }
}
