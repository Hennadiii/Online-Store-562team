package com.furniture_store.order_management_service.dto;

import com.furniture_store.order_management_service.entity.DeliveryMode;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DeliveryDto {

    private Long id;

    @NotNull
    private DeliveryMode deliveryMode; // SELF_PICKUP або COURIER_DELIVERY

    private String city;
    private String region;
    private String street;
    private String build;
    private String apartament;
    private String floor;
    private Boolean elevator;
}