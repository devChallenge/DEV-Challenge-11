package com.dev.challenge.error;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum Error {

    INTERNAL_SERVER_ERROR(1, "Internal server error"),
    ALL_EMPLOYEES_BUSY(10, "All employees are currently busy"),
    REGISTER_IS_UNABLE(20, "Employee register is unable now. Please try later."),
    REFRESH_SYSTEM_IS_UNABLE(100, "Refresh system is unable now. Please try later.");

    private Integer errorCode;
    private String errorMessage;
}
