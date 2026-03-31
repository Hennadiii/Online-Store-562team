package com.furniture.authentication_service.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Builder
public class AddressResponse {
    private UUID id;
    private String firstName;
    private String lastName;
    private String phone;
    private String city;
    private String region;
    private String street;
    private String house;
    private String apartment;
    private String floor;
    private boolean hasElevator;
    private boolean isDefault;
    private LocalDateTime createdAt;
}