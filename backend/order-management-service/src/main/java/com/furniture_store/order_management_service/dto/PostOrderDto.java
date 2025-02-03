package com.furniture_store.order_management_service.dto;

import lombok.Data;

import java.util.List;

@Data
public class PostOrderDto {

    private Long id;
    private List<PostOrderItemDto> orderItems;
    private String customerName;
    private DeliveryDto delivery;
}
