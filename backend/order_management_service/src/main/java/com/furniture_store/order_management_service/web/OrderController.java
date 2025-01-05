package com.furniture_store.order_management_service.web;

import com.furniture_store.order_management_service.entity.Order;
import com.furniture_store.order_management_service.entity.OrderItem;
import com.furniture_store.order_management_service.service.OrderManager;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class OrderController {

    private final SessionOrder sessionOrder;
    private final OrderManager orderManager;

    public OrderController(SessionOrder sessionOrder, OrderManager orderManager) {
        this.sessionOrder = sessionOrder;
        this.orderManager = orderManager;
    }

    @PostMapping("/orders/current")
    public void createOrder(@RequestBody List<OrderItem> orderItems) {
        sessionOrder.setOrderItems(orderItems);
    }

    @PostMapping("/orders/current/submit")
    public void submitOrder() {
        orderManager.saveSessionOrder(sessionOrder);
    }

    @GetMapping("/orders")
    public List<Order> getOrders() {
        return orderManager.getOrders();
    }

    @GetMapping("/orders/{id}")
    public ResponseEntity<Order> getOrder(@PathVariable long id) {
            return ResponseEntity.ok(orderManager.getOrder(id));
    }

    @PostMapping("/orders")
    public void addOrder(@RequestBody Order order) {
        orderManager.addOrder(order);
    }

    @PutMapping("/orders/{id}/status")
    public void updateOrderStatus(@PathVariable Long id, @RequestBody String status) {
        orderManager.setOrderStatus(id, status);
    }
}