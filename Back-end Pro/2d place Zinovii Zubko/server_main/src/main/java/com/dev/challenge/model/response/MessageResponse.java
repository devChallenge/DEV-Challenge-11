package com.dev.challenge.model.response;

import com.dev.challenge.error.Error;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class MessageResponse <T extends ApiResponse> {

    private int status;
    private String message;
    private T response;

    public MessageResponse(Error error) {

        this.status = error.getErrorCode();
        this.message = error.getErrorMessage();
    }

    public MessageResponse(String message) {
        this.message = message;
    }

    @JsonCreator
    public MessageResponse(T response) {
        this.response = response;
    }
}
