package com.dev.challenge.util;

import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
public class Generator {

    public String generateId() {
        String shortId = UUID.randomUUID().toString().split("-")[0];
        return shortId;
    }
}
