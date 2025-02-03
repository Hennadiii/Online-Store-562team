package com.furniture_store.order_management_service.dto;

import com.furniture_store.order_management_service.entity.DeliveryMode;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class DeliveryDto {

    private Long id;
    private String address;
    private DeliveryMode deliveryMode;
}
