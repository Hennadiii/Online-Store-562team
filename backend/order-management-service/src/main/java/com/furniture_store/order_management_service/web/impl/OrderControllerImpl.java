package com.furniture_store.order_management_service.web.impl;

import com.furniture_store.order_management_service.dto.DisplayOrderDto;
import com.furniture_store.order_management_service.dto.PostOrderDto;
import com.furniture_store.order_management_service.service.OrderManager;
import com.furniture_store.order_management_service.web.OrderController;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class OrderControllerImpl implements OrderController {

    private final OrderManager orderManager;

    public OrderControllerImpl(OrderManager orderManager) {
        this.orderManager = orderManager;
    }

    @Override
    @PostMapping("/orders")
    public void createOrder(@RequestBody @Validated PostOrderDto order) {
        orderManager.addOrder(order);
    }

    @Override
    @GetMapping("/orders")
    public List<DisplayOrderDto> getOrders(@RequestParam int page, @RequestParam int pageSize) {
        return orderManager.getOrders(page, pageSize);
    }

    @Override
    @GetMapping("/orders/{id}")
    public ResponseEntity<DisplayOrderDto> getOrder(@PathVariable long id) {
            return ResponseEntity.ok(orderManager.getOrder(id));
    }

    @Override
    @PutMapping("/orders/{id}")
    public void updateOrder(@PathVariable long id, @RequestBody @Validated PostOrderDto order) {
        order.setId(id);
        orderManager.updateOrder(order);
    }

    @Override
    @PutMapping("/orders/{id}/status")
    public void updateOrderStatus(@PathVariable Long id, @RequestBody String status) {
        orderManager.setOrderStatus(id, status);
    }
}