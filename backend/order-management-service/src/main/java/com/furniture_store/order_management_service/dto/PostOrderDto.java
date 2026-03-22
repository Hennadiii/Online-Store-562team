package com.furniture_store.order_management_service.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
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

    @NotBlank(message = "Customer name is required")
    @Size(min = 2, max = 255, message = "Customer name must be between 2 and 255 characters")
    private String customerName;

    private String recipientName;
    private String recipientPhone;
    private boolean guest;

    @Valid
    @NotNull(message = "Delivery info is required")
    private DeliveryDto delivery;
}