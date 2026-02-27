package com.furniture_store.order_management_service.entity;

import com.furniture_store.order_management_service.entity.product.Product;
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
    @ManyToOne(cascade = CascadeType.ALL)
    private Product product;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id")
    private Order order;

}
