package com.furniture_store.order_management_service.service;

import com.furniture_store.order_management_service.dto.DisplayOrderItemDto;
import com.furniture_store.order_management_service.dto.PostOrderItemDto;
import com.furniture_store.order_management_service.entity.OrderItem;
import org.springframework.stereotype.Service;

@Service
public class OrderItemMapper {

    public OrderItem toEntity(PostOrderItemDto dto){
        OrderItem orderItem = new OrderItem();
        orderItem.setId(dto.getId());
        orderItem.setProduct(null);
        orderItem.setQuantity(dto.getQuantity());
        return orderItem;
    }

    public DisplayOrderItemDto toDto(OrderItem orderItem){
        DisplayOrderItemDto dto = new DisplayOrderItemDto();
        dto.setId(orderItem.getId());
        dto.setQuantity(orderItem.getQuantity());
        dto.setProductId(orderItem.getProduct().getId());
        dto.setPricePerUnit(orderItem.getProduct().getPrice());
        dto.setAmount(orderItem.getProduct().getPrice()*orderItem.getQuantity());
        return dto;
    }
}