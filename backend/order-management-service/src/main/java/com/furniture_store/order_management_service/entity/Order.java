package com.furniture_store.order_management_service.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Table(name = "orders")
@Entity
@Getter
@Setter
@NoArgsConstructor
public class Order {

    @Id
    @GeneratedValue
    private Long id;

    @OneToMany(cascade = CascadeType.ALL)
    private List<OrderItem> items = new ArrayList<>();

    @ManyToOne(cascade = CascadeType.ALL)
    private Delivery delivery;

    private String customerName;
    private String recipientName;
    private String recipientPhone;
    private String guestToken;

    // null для guest, UUID користувача для авторизованих
    private String userId;

    private LocalDateTime createdAt = LocalDateTime.now();
    private LocalDateTime updatedAt;

    @Enumerated
    private OrderStatus status;

    public Order(List<OrderItem> items, String customerName, Delivery delivery) {
        this.delivery = delivery;
        this.customerName = customerName;
        setItems(items);
    }

    public void addItem(OrderItem item) {
        items.add(item);
    }

    public void removeItem(OrderItem item) {
        items.remove(item);
    }

    public void setItems(List<OrderItem> items) {
        items.forEach(x -> x.setOrder(this));
        this.items = items;
    }
}