package com.furniture_store.shoppingcartservice.dto;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class ShoppingCartDtoResponse {
    private Long id;
    private Long userId;
    private LocalDateTime createdDate;
    private List<CartItemDto> items;
    private Double totalPrice;
}
