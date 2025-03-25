package com.furniture_store.order_management_service.web;

import com.furniture_store.order_management_service.entity.Delivery;
import com.furniture_store.order_management_service.entity.OrderItem;
import com.furniture_store.order_management_service.entity.PaymentInfo;
import lombok.*;
import org.springframework.stereotype.Component;
import org.springframework.web.context.annotation.SessionScope;

import java.util.List;

@Data
@Component
@SessionScope
@NoArgsConstructor
@AllArgsConstructor
public class SessionOrder {

    private List<OrderItem> orderItems;
    private PaymentInfo paymentInfo;
    private Delivery delivery;

    public void addItem(OrderItem item) {
        orderItems.add(item);
    }

    public void removeItem(OrderItem item) {
        orderItems.remove(item);
    }
}
