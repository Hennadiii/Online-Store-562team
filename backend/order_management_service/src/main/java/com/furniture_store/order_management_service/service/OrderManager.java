package com.furniture_store.order_management_service.service;

import com.furniture_store.order_management_service.web.SessionOrder;
import com.furniture_store.order_management_service.entity.Order;
import com.furniture_store.order_management_service.entity.OrderStatus;
import com.furniture_store.order_management_service.exception.OrderNotFoundException;
import com.furniture_store.order_management_service.exception.WrongOrderStatusException;
import com.furniture_store.order_management_service.repository.OrderRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderManager {

    private final OrderRepository orderRepository;

    public OrderManager(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    public void saveSessionOrder(SessionOrder sessionOrder) {
        addOrder(new Order(sessionOrder.getOrderItems(), sessionOrder.getPaymentInfo(), sessionOrder.getDelivery()));
    }

    public Order getOrder(Long id) {
        return orderRepository.findById(id).orElseThrow(() -> new OrderNotFoundException(""));
    }

    public List<Order> getOrders() {
        return orderRepository.findAll();
    }

    public void addOrder(Order order) {orderRepository.save(order);
    }

    public void setOrderStatus(Long id, String status) {
        Order order = getOrder(id);
        try {
            order.setStatus(OrderStatus.valueOf(status.toUpperCase()));
        }catch(IllegalArgumentException e){
            throw new WrongOrderStatusException("A wrong order status specified.");
        }
    }
}
