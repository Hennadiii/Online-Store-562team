package com.furniture_store.order_management_service.service;

import com.furniture_store.order_management_service.dto.DisplayOrderDto;
import com.furniture_store.order_management_service.dto.PostOrderDto;
import com.furniture_store.order_management_service.entity.Order;
import com.furniture_store.order_management_service.entity.OrderStatus;
import com.furniture_store.order_management_service.exception.OrderAlreadyExistsException;
import com.furniture_store.order_management_service.exception.OrderNotFoundException;
import com.furniture_store.order_management_service.exception.WrongOrderStatusException;
import com.furniture_store.order_management_service.repository.OrderRepository;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@Transactional
public class OrderManager {

    private final OrderRepository orderRepository;
    private final OrderDtoMapper orderDtoMapper;

    public OrderManager(OrderRepository orderRepository, OrderDtoMapper orderDtoMapper) {
        this.orderRepository = orderRepository;
        this.orderDtoMapper = orderDtoMapper;
    }

    public DisplayOrderDto addOrder(PostOrderDto orderDto) {
        return addOrder(orderDtoMapper.toEntity(orderDto));
    }

    public DisplayOrderDto addOrder(Order order) {
        if (order.getId() != null && orderRepository.existsById(order.getId())) {
            throw new OrderAlreadyExistsException();
        }
        order.setId(null);
        order.getDelivery().setId(null);
        order.getItems().forEach(x -> x.setId(null));
        Order saved = orderRepository.save(order);
        return orderDtoMapper.toDto(saved);
    }

    public DisplayOrderDto getOrder(Long id) {
        return orderDtoMapper.toDto(
                orderRepository.findById(id)
                        .orElseThrow(() -> new OrderNotFoundException(""))
        );
    }

    public List<DisplayOrderDto> getOrders(int page, int size) {
        Pageable pageable = Pageable.ofSize(size).withPage(page);
        return orderRepository.findAll(pageable).stream()
                .map(orderDtoMapper::toDto)
                .toList();
    }

    public void updateOrder(PostOrderDto orderDto) {
        updateOrder(orderDtoMapper.toEntity(orderDto));
    }

    public void updateOrder(Order order) {
        Order entity = orderRepository.findById(order.getId())
                .orElseThrow(() -> new OrderNotFoundException(""));
        entity.setStatus(order.getStatus());
        entity.setItems(order.getItems());
        entity.setDelivery(order.getDelivery());
        entity.setCustomerName(order.getCustomerName());
        entity.setUpdatedAt(LocalDateTime.now());
        orderRepository.save(entity);
    }

    public void setOrderStatus(Long id, String status) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new OrderNotFoundException(""));
        try {
            order.setStatus(OrderStatus.valueOf(status.toUpperCase()));
        } catch (IllegalArgumentException e) {
            throw new WrongOrderStatusException("A wrong order status specified.");
        }
    }
}