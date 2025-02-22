package com.furniture_store.order_management_service.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class PostOrderDto {

    private Long id;
    @NotEmpty
    private List<PostOrderItemDto> orderItems = new ArrayList<>();
    @Size(min = 2, max = 50, message = "Customer name is invalid")
    private String customerName;
    @Valid @NotNull
    private DeliveryDto delivery;
}
