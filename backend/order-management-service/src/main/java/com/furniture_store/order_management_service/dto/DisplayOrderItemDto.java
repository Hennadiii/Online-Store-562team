package com.furniture_store.order_management_service.dto;

import lombok.Data;

@Data
public class DisplayOrderItemDto {

    private Long id;
    private long productId;
    private int quantity;
    private double pricePerUnit;
    private double amount;
}
