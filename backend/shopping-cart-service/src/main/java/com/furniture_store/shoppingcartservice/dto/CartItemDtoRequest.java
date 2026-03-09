package com.furniture_store.shoppingcartservice.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CartItemDtoRequest {

    @NotNull(message = "productId is required")
    private Long productId;

    @NotNull(message = "quantity is required")
    @Min(value = 1, message = "quantity must be at least 1")
    @Max(value = 50, message = "quantity must not exceed 50")
    private Integer quantity;

    private Double price; // игнорируется — цена берётся из product-catalog
}