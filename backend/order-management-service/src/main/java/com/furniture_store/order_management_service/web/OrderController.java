package com.furniture_store.order_management_service.web;

import com.furniture_store.order_management_service.dto.DisplayOrderDto;
import com.furniture_store.order_management_service.dto.PostOrderDto;
import com.furniture_store.order_management_service.service.OrderManager;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class OrderController {

    private final OrderManager orderManager;

    public OrderController(OrderManager orderManager) {
        this.orderManager = orderManager;
    }

    @PostMapping("/orders")
    public void createOrder(@RequestBody @Validated PostOrderDto order) {
        orderManager.addOrder(order);
    }

    @GetMapping("/orders")
    public List<DisplayOrderDto> getOrders(@RequestParam int page, @RequestParam int pageSize) {
        return orderManager.getOrders(page, pageSize);
    }

    @GetMapping("/orders/{id}")
    public ResponseEntity<DisplayOrderDto> getOrder(@PathVariable long id) {
            return ResponseEntity.ok(orderManager.getOrder(id));
    }

    @PutMapping("/orders/{id}")
    public void updateOrder(@PathVariable long id, @RequestBody @Validated PostOrderDto order) {
        order.setId(id);
        orderManager.updateOrder(order);
    }

    @PutMapping("/orders/{id}/status")
    public void updateOrderStatus(@PathVariable Long id, @RequestBody String status) {
        orderManager.setOrderStatus(id, status);
    }
}