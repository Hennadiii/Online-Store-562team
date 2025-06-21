package com.furniture.authentication_service.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;

@Getter
public class TokenRequest {

    @NotBlank(message = "Token is required")
    private String token;

    public TokenRequest() {}

    public TokenRequest(String token) {
        this.token = token;
    }
}