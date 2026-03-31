package com.furniture.authentication_service.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Data
public class AddressRequest {

    @NotBlank(message = "First name is required")
    private String firstName;

    @NotBlank(message = "Last name is required")
    private String lastName;

    @NotBlank(message = "Phone is required")
    @Pattern(regexp = "^\\+?[0-9]{10,15}$", message = "Invalid phone format")
    private String phone;

    @NotBlank(message = "City is required")
    private String city;

    private String region;

    @NotBlank(message = "Street is required")
    private String street;

    @NotBlank(message = "House is required")
    private String house;

    private String apartment;
    private String floor;

    private boolean hasElevator = false; // ← просто default value, без @Builder.Default
}