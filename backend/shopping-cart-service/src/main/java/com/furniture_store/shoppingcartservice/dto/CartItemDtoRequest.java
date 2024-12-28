package com.furniture_store.shoppingcartservice.dto;

import lombok.Data;

@Data
public class CartItemDtoRequest {
    private Long productId;
    private Integer quantity;
    private Double price;
}
