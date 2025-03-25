package com.furniture_store.order_management_service.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@Table
@Entity
@NoArgsConstructor
public class Order {

    @Setter
    @Id
    @GeneratedValue
    private Long id;
    @OneToMany(cascade = CascadeType.ALL)
    private List<OrderItem> items = new ArrayList<>();
    @ManyToOne
    private PaymentInfo paymentInfo;
    @OneToOne
    private Delivery delivery;
    @Setter
    private LocalDateTime createdAt = LocalDateTime.now();
    @Setter
    private LocalDateTime updatedAt;
    @Enumerated
    private OrderStatus status;

    public Order(List<OrderItem> items, PaymentInfo paymentInfo, Delivery delivery) {
        this.items = items;
        this.paymentInfo = paymentInfo;
        this.delivery = delivery;
    }

    public BigDecimal getTotalAmount() {
        BigDecimal totalAmount = BigDecimal.ZERO;
        for (OrderItem item : items) {
            totalAmount = totalAmount.add(item.getTotalAmount());
        }
        return totalAmount;
    }

    public void addItem(OrderItem item) {
        items.add(item);
        updatedAt = LocalDateTime.now();
    }

    public void removeItem(OrderItem item){
        items.remove(item);
        updatedAt = LocalDateTime.now();
    }

    public void setItems(List<OrderItem> items) {
        this.items = items;
        updatedAt = LocalDateTime.now();
    }

    public void setPaymentInfo(PaymentInfo paymentInfo) {
        this.paymentInfo = paymentInfo;
        updatedAt = LocalDateTime.now();
    }

    public void setDelivery(Delivery delivery) {
        this.delivery = delivery;
        updatedAt = LocalDateTime.now();
    }

    public void setStatus(OrderStatus status) {
        this.status = status;
        updatedAt = LocalDateTime.now();
    }
}
