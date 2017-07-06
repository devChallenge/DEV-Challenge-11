package com.dev.challenge.repository;

import com.dev.challenge.db.Employee;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EmployeeRepository extends MongoRepository<Employee, String> {

//    List<Employee> findByAreasContaining(String area);
    List<Employee> findByIdNotInAndAreas(List<String> ids, String area);
}
