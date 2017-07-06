package com.dev.challenge;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.server.EnableEurekaServer;

@SpringBootApplication
@EnableEurekaServer
public class ServerRegister {

    public static void main(String[] args) {
        SpringApplication.run(ServerRegister.class, args);
    }
}
