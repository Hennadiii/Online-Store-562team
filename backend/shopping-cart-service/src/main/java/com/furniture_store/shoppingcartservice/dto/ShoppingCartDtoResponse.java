package com.furniture_store.shoppingcartservice.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ShoppingCartDtoResponse {
    private Long cartId;
    private Long userId;
    private LocalDateTime createdDate;
    private List<CartItemDtoResponse> items;
    private double totalPrice;
}
