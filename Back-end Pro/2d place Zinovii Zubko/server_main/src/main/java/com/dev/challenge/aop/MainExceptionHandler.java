package com.dev.challenge.aop;

import com.dev.challenge.error.MainException;
import com.dev.challenge.model.response.MessageResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import javax.servlet.http.HttpServletRequest;

import static com.dev.challenge.error.Error.INTERNAL_SERVER_ERROR;

@RestControllerAdvice
public class MainExceptionHandler {

    private final Logger LOGGER = LoggerFactory.getLogger(this.getClass());

    @ResponseStatus(HttpStatus.OK)
    @ExceptionHandler(Exception.class)
    public MessageResponse handleGeneralException(HttpServletRequest req, Exception ex) {
        LOGGER.error("internal error: ", ex);
        return new MessageResponse(INTERNAL_SERVER_ERROR);
    }

    @ResponseStatus(HttpStatus.OK)
    @ExceptionHandler(MainException.class)
    public MessageResponse handleMainException(HttpServletRequest req, MainException ex) {
        LOGGER.error("main error: ", ex);
        return new MessageResponse(ex.getError());
    }
}