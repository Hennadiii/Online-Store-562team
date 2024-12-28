package com.furniture_store.shoppingcartservice.dto;

import lombok.Data;

@Data
public class CartItemDtoResponse {
    private Long id;
    private Long productId;
    private Integer quantity;
    private Double price;
}
