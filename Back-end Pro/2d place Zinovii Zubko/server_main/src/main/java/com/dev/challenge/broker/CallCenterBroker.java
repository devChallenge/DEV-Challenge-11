package com.dev.challenge.broker;

import com.dev.challenge.model.response.EmployeesResponse;
import org.springframework.cloud.netflix.feign.FeignClient;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

@FeignClient("CALLCENTER")
public interface CallCenterBroker {

    @RequestMapping(value = "/register", method = POST)
    public void register(@RequestParam("name") String name, @RequestParam("areas") List<String> areas);

    @RequestMapping(value = "/call", method = GET)
    public EmployeesResponse getEmployees(@RequestParam("areas") List<String> areas);

    @RequestMapping(value = "/reset", method = GET)
    public void reset();
}
