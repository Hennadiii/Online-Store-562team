package com.furniture_store.order_management_service.dto;

import com.furniture_store.order_management_service.entity.DeliveryMode;
import jakarta.validation.constraints.AssertTrue;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DeliveryDto {

    private Long id;

    @NotNull(message = "Delivery mode is required")
    private DeliveryMode deliveryMode;

    private String city;
    private String region;
    private String street;
    private String build;
    private String apartament;
    private String floor;
    private Boolean elevator;

    // Валідація: при курʼєрській доставці — адреса обовʼязкова
    @AssertTrue(message = "City, street and build are required for courier delivery")
    public boolean isAddressValidForCourier() {
        if (deliveryMode != DeliveryMode.COURIER_DELIVERY) return true;
        return isNotBlank(city) && isNotBlank(street) && isNotBlank(build);
    }

    private boolean isNotBlank(String s) {
        return s != null && !s.trim().isEmpty();
    }
}