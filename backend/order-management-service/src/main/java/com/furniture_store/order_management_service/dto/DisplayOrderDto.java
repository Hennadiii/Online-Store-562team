package com.furniture_store.order_management_service.dto;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class DisplayOrderDto {

    private Long id;
    private List<DisplayOrderItemDto> orderItems;

    // Окремі поля клієнта — потрібні для коректного відображення на фронті
    private String customerFirstName;
    private String customerLastName;
    private String customerPhone;
    private String customerEmail;

    private String recipientName;
    private String recipientPhone;
    private String guestToken;
    private String userId;
    private DeliveryDto delivery;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private String status;
    private Double amount;
}