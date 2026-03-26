package com.furniture_store.order_management_service.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class PostOrderDto {

    private Long id;

    @NotEmpty(message = "Order must contain at least one item")
    @Valid
    private List<PostOrderItemDto> orderItems = new ArrayList<>();

    // Було: один рядок customerName
    // Стало: окремі поля з валідацією
    @NotBlank(message = "Customer first name is required")
    @Size(min = 2, max = 100, message = "Customer first name must be between 2 and 100 characters")
    private String customerFirstName;

    @NotBlank(message = "Customer last name is required")
    @Size(min = 2, max = 100, message = "Customer last name must be between 2 and 100 characters")
    private String customerLastName;

    @NotBlank(message = "Customer phone is required")
    @Pattern(regexp = "^\\+?[0-9]{10,15}$", message = "Invalid phone number format")
    private String customerPhone;

    @NotBlank(message = "Customer email is required")
    @Email(message = "Invalid email format")
    private String customerEmail;

    private String recipientName;
    private String recipientPhone;
    private boolean guest;

    // UUID користувача — null для гостя
    private String userId;

    @Valid
    @NotNull(message = "Delivery info is required")
    private DeliveryDto delivery;
}