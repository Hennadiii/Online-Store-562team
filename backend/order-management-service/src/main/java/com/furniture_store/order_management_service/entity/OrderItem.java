package com.furniture_store.order_management_service.entity;

import jakarta.persistence.*;
import lombok.*;

@Table
@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class OrderItem {

    @Id
    @GeneratedValue
    private Long id;
    private Integer quantity;
    private Long productId;
    private Double pricePerUnit;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id")
    private Order order;
}