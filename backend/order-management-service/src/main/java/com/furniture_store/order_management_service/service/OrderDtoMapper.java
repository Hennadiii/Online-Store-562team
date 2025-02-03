package com.furniture_store.order_management_service.service;

import com.furniture_store.order_management_service.dto.DeliveryDto;
import com.furniture_store.order_management_service.dto.DisplayOrderDto;
import com.furniture_store.order_management_service.dto.DisplayOrderItemDto;
import com.furniture_store.order_management_service.dto.PostOrderDto;
import com.furniture_store.order_management_service.entity.Delivery;
import com.furniture_store.order_management_service.entity.Order;
import org.springframework.stereotype.Service;

@Service
public class OrderDtoMapper {

    private final OrderItemMapper orderItemMapper;

    public OrderDtoMapper(OrderItemMapper orderItemMapper) {
        this.orderItemMapper = orderItemMapper;
    }

    public DisplayOrderDto toDto(Order order){
        DisplayOrderDto orderDto = new DisplayOrderDto();
        orderDto.setId(order.getId());
        orderDto.setOrderItems(order.getItems().stream().map(orderItemMapper::toDto).toList());
        Delivery delivery = new Delivery();
        orderDto.setDelivery(new DeliveryDto(delivery.getId(), delivery.getAddress(), delivery.getDeliveryMode()));
        orderDto.setCustomerName(order.getCustomerName());
        orderDto.setCreatedAt(order.getCreatedAt());
        orderDto.setUpdatedAt(order.getUpdatedAt());
        orderDto.setStatus(order.getStatus().name());
        orderDto.setAmount(orderDto.getOrderItems().stream().map(DisplayOrderItemDto::getAmount).reduce(0d, Double::sum));
        return orderDto;
    }

    public Order toEntity(PostOrderDto orderDto){
        Order order = new Order();
        order.setId(orderDto.getId());
        order.setItems(orderDto.getOrderItems().stream().map(orderItemMapper::toEntity).toList());
        order.setCustomerName(orderDto.getCustomerName());
        DeliveryDto delivery = orderDto.getDelivery();
        order.setDelivery(new Delivery(delivery.getId(), delivery.getAddress(), delivery.getDeliveryMode()));
        return order;
    }

}
