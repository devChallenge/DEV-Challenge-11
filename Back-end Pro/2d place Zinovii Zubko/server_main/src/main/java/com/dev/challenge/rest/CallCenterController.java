package com.dev.challenge.rest;

import com.dev.challenge.error.MainException;
import com.dev.challenge.model.response.EmployeesResponse;
import com.dev.challenge.model.response.MessageResponse;
import com.dev.challenge.service.CallCenterService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;

import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

@CrossOrigin
@RestController
@Api(value = "API for working with system.",
        description = "This API provides the capability to register/get employees and reset system", produces = "application/json")
public class CallCenterController {

    @Autowired private CallCenterService clientService;

    @ApiOperation(value = "Register employee", produces = "application/json")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "name", value = "Employee's name",
                    dataType = "String", paramType = "query", required = true),
            @ApiImplicitParam(name = "areas", value = "Employee's areas. Arrays type: [value1],[value2],[value3]",
                    dataType = "array", paramType = "query", required = true)})
    @RequestMapping(value = "/register", method = POST)
    public MessageResponse registerEmployee(@RequestParam String name, @RequestParam String areas[]) throws MainException {
        return clientService.registerEmployee(name, Arrays.asList(areas));
    }

    @ApiOperation(value = "Register employee", produces = "application/json")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "areas", value = "Employee's areas. Arrays type: [value1],[value2],[value3]",
                    dataType = "String", paramType = "query", required = true)})
    @RequestMapping(value = "/call", method = GET)
    public MessageResponse<EmployeesResponse> callEmployees(@RequestParam String areas[]) throws MainException {
        return clientService.getEmployees(Arrays.asList(areas));
    }

    @ApiOperation(value = "Reset system", produces = "application/json")
    @RequestMapping(value = "/reset", method = GET)
    public MessageResponse reset() throws MainException {
        return clientService.resetSystem();
    }
}
