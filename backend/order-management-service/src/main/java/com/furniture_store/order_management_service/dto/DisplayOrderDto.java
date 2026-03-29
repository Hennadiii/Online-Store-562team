package com.furniture_store.order_management_service.dto;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class DisplayOrderDto {

    private Long id;
    private List<DisplayOrderItemDto> orderItems;
    private String customerName;
    private DeliveryDto delivery;
    private LocalDateTime createdAt = LocalDateTime.now();
    private LocalDateTime updatedAt;
    private String status;
    private Double amount;
}
