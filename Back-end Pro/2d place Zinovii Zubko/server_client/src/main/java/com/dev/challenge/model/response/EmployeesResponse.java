package com.dev.challenge.model.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
public class EmployeesResponse {

    private int totalAssignments;
    private List<Assignment> assignments;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Assignment {

        private String area;
        private String employee;
    }
}
