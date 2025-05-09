package com.furniture_store.order_management_service.dto;

import com.furniture_store.order_management_service.entity.DeliveryMode;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class DeliveryDto {

    private Long id;
    @NotBlank
    private String address;
    @NotNull
    private DeliveryMode deliveryMode;
}
