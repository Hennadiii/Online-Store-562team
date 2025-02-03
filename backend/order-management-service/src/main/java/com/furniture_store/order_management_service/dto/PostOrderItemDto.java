package com.furniture_store.order_management_service.dto;

import lombok.Data;

@Data
public class PostOrderItemDto {

    private Long id;
    private long productId;
    private int quantity;
}
