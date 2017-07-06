package com.dev.challenge.error;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class MainException extends Exception {

    private Error error;
}
