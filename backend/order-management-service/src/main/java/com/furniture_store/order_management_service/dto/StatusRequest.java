package com.furniture_store.order_management_service.dto;

import com.furniture_store.order_management_service.entity.OrderStatus;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class StatusRequest {

    @NotNull(message = "Status is required")
    private OrderStatus status;
}