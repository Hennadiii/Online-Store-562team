package com.furniture_store.order_management_service.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Entity
@Table
@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderItem {

    @Id
    @GeneratedValue
    private Long id;
    private Integer quantity;
    private Long productId;
    private BigDecimal pricePerUnit;

    public OrderItem(Integer quantity, Long productId, BigDecimal pricePerUnit) {
        this.quantity = quantity;
        this.productId = productId;
        this.pricePerUnit = pricePerUnit;
    }

    public BigDecimal getTotalAmount(){
        return pricePerUnit.multiply(new BigDecimal(quantity));
    }
}
