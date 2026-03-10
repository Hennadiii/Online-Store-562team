package com.furniture_store.order_management_service.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.*;

@Getter
@Setter
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Delivery {

    @Id
    @GeneratedValue
    private Long id;

    @Enumerated
    private DeliveryMode deliveryMode;

    // Адреса розбита по полях як на фронтенді
    private String city;
    private String region;
    private String street;
    private String build;
    private String apartament;
    private String floor;
    private Boolean elevator;
}