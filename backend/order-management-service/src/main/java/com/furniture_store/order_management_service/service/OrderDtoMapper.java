package com.furniture_store.order_management_service.service;

import com.furniture_store.order_management_service.dto.DeliveryDto;
import com.furniture_store.order_management_service.dto.DisplayOrderDto;
import com.furniture_store.order_management_service.dto.DisplayOrderItemDto;
import com.furniture_store.order_management_service.dto.PostOrderDto;
import com.furniture_store.order_management_service.entity.Delivery;
import com.furniture_store.order_management_service.entity.Order;
import com.furniture_store.order_management_service.entity.OrderStatus;
import org.springframework.stereotype.Service;

@Service
public class OrderDtoMapper {

    private final OrderItemMapper orderItemMapper;

    public OrderDtoMapper(OrderItemMapper orderItemMapper) {
        this.orderItemMapper = orderItemMapper;
    }

    public DisplayOrderDto toDto(Order order) {
        DisplayOrderDto orderDto = new DisplayOrderDto();
        orderDto.setId(order.getId());
        orderDto.setOrderItems(order.getItems().stream().map(orderItemMapper::toDto).toList());
        orderDto.setCustomerName(order.getCustomerName());
        orderDto.setCreatedAt(order.getCreatedAt());
        orderDto.setUpdatedAt(order.getUpdatedAt());
        orderDto.setStatus(order.getStatus().name());
        orderDto.setAmount(orderDto.getOrderItems().stream()
                .map(DisplayOrderItemDto::getAmount)
                .reduce(0d, Double::sum));

        // Маппінг delivery з entity
        Delivery delivery = order.getDelivery();
        if (delivery != null) {
            DeliveryDto deliveryDto = new DeliveryDto();
            deliveryDto.setId(delivery.getId());
            deliveryDto.setDeliveryMode(delivery.getDeliveryMode());
            deliveryDto.setCity(delivery.getCity());
            deliveryDto.setRegion(delivery.getRegion());
            deliveryDto.setStreet(delivery.getStreet());
            deliveryDto.setBuild(delivery.getBuild());
            deliveryDto.setApartament(delivery.getApartament());
            deliveryDto.setFloor(delivery.getFloor());
            deliveryDto.setElevator(delivery.getElevator());
            orderDto.setDelivery(deliveryDto);
        }

        return orderDto;
    }

    public Order toEntity(PostOrderDto orderDto) {
        Order order = new Order();
        order.setId(orderDto.getId());
        order.setItems(orderDto.getOrderItems().stream().map(orderItemMapper::toEntity).toList());
        order.setCustomerName(orderDto.getCustomerName());
        order.setStatus(OrderStatus.UNPAID);

        // Маппінг delivery з DTO в entity
        DeliveryDto dto = orderDto.getDelivery();
        if (dto != null) {
            Delivery delivery = new Delivery();
            delivery.setId(dto.getId());
            delivery.setDeliveryMode(dto.getDeliveryMode());
            delivery.setCity(dto.getCity());
            delivery.setRegion(dto.getRegion());
            delivery.setStreet(dto.getStreet());
            delivery.setBuild(dto.getBuild());
            delivery.setApartament(dto.getApartament());
            delivery.setFloor(dto.getFloor());
            delivery.setElevator(dto.getElevator());
            order.setDelivery(delivery);
        }

        return order;
    }
}