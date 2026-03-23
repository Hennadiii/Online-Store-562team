package com.furniture_store.order_management_service.web.impl;

import com.furniture_store.order_management_service.dto.DisplayOrderDto;
import com.furniture_store.order_management_service.dto.PostOrderDto;
import com.furniture_store.order_management_service.dto.StatusRequest;
import com.furniture_store.order_management_service.service.OrderManager;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Validated
@CrossOrigin(origins = {
        "http://localhost:3000",
        "https://online-store-562team.vercel.app"
}, allowedHeaders = "*", methods = {
        RequestMethod.GET,
        RequestMethod.POST,
        RequestMethod.PUT,
        RequestMethod.DELETE,
        RequestMethod.OPTIONS
})
public class OrderControllerImpl {

    private final OrderManager orderManager;

    public OrderControllerImpl(OrderManager orderManager) {
        this.orderManager = orderManager;
    }

    @PostMapping("/orders")
    public ResponseEntity<DisplayOrderDto> createOrder(@RequestBody @Valid PostOrderDto order) {
        DisplayOrderDto created = orderManager.addOrder(order);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @GetMapping("/orders")
    public List<DisplayOrderDto> getOrders(
            @RequestParam @Min(value = 0, message = "Page must be >= 0") int page,
            @RequestParam @Min(value = 1, message = "PageSize must be >= 1")
            @Max(value = 100, message = "PageSize must be <= 100") int pageSize) {
        return orderManager.getOrders(page, pageSize);
    }

    @GetMapping("/orders/{id}")
    public ResponseEntity<DisplayOrderDto> getOrder(
            @PathVariable long id,
            @RequestParam(required = false) String token) {
        if (token != null && !token.isBlank()) {
            return ResponseEntity.ok(orderManager.getOrderByToken(id, token));
        }
        return ResponseEntity.ok(orderManager.getOrder(id));
    }

    @PutMapping("/orders/{id}")
    public void updateOrder(@PathVariable long id, @RequestBody @Valid PostOrderDto order) {
        order.setId(id);
        orderManager.updateOrder(order);
    }

    @PutMapping("/orders/{id}/status")
    public void updateOrderStatus(@PathVariable Long id, @RequestBody @Valid StatusRequest request) {
        orderManager.setOrderStatus(id, request.getStatus().name());
    }

    @GetMapping("/orders/user/{userId}")
public List<DisplayOrderDto> getOrdersByUser(
        @PathVariable String userId,
        @RequestParam @Min(value = 0) int page,
        @RequestParam @Min(value = 1) @Max(value = 100) int pageSize) {
    return orderManager.getOrdersByUserId(userId, page, pageSize);
}
}