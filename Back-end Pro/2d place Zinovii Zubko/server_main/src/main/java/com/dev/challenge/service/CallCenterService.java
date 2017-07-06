package com.dev.challenge.service;

import com.dev.challenge.broker.CallCenterBroker;
import com.dev.challenge.error.Error;
import com.dev.challenge.error.MainException;
import com.dev.challenge.model.response.EmployeesResponse;
import com.dev.challenge.model.response.MessageResponse;
import com.netflix.hystrix.contrib.javanica.annotation.HystrixCommand;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CallCenterService {

    @Autowired private CallCenterBroker callcenterBroker;

    @HystrixCommand(fallbackMethod="registerFallback")
    public MessageResponse registerEmployee(String name, List<String> areas) throws MainException {
        callcenterBroker.register(name, areas);
        MessageResponse response = new MessageResponse("WELCOME");
        return response;
    }

    @HystrixCommand(fallbackMethod="getEmployeesFallback")
    public MessageResponse getEmployees(List<String> areas) throws MainException {

        EmployeesResponse response = callcenterBroker.getEmployees(areas);
        return new MessageResponse(response);
    }

    @HystrixCommand(fallbackMethod="resetSystemFallback")
    public MessageResponse resetSystem() throws MainException {
        callcenterBroker.reset();
        MessageResponse response = new MessageResponse("RESET IS SUCCESSFUL");
        return response;
    }

    public MessageResponse registerFallback(String name, List<String> areas) throws MainException {
        throw new MainException(Error.REGISTER_IS_UNABLE);
    }

    public MessageResponse getEmployeesFallback(List<String> areas) throws MainException {
        throw new MainException(Error.ALL_EMPLOYEES_BUSY);
    }

    public MessageResponse resetSystemFallback() throws MainException {
        throw new MainException(Error.REFRESH_SYSTEM_IS_UNABLE);
    }
}
