package com.furniture_store.order_management_service.service;

import com.furniture_store.order_management_service.client.ProductCatalogClient;
import com.furniture_store.order_management_service.client.ProductCatalogResponse;
import com.furniture_store.order_management_service.dto.DisplayOrderItemDto;
import com.furniture_store.order_management_service.dto.PostOrderItemDto;
import com.furniture_store.order_management_service.entity.OrderItem;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
@RequiredArgsConstructor
public class OrderItemMapper {

    private final ProductCatalogClient productCatalogClient;

    public OrderItem toEntity(PostOrderItemDto dto) {
        OrderItem orderItem = new OrderItem();
        orderItem.setId(dto.getId());
        orderItem.setQuantity(dto.getQuantity());
        orderItem.setProductId(dto.getProductId());

        // п.4 — перевіряємо існування товару і отримуємо актуальну ціну
        try {
            ProductCatalogResponse product = productCatalogClient.getProductById(dto.getProductId());
            if (product == null) {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND,
                        "Product not found: " + dto.getProductId());
            }
            orderItem.setPricePerUnit(product.getPrice() != null ? product.getPrice() : 0.0);
        } catch (ResponseStatusException e) {
            throw e;
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,
                    "Product not found: " + dto.getProductId());
        }

        return orderItem;
    }

    public DisplayOrderItemDto toDto(OrderItem orderItem) {
        DisplayOrderItemDto dto = new DisplayOrderItemDto();
        dto.setId(orderItem.getId());
        dto.setQuantity(orderItem.getQuantity());
        dto.setProductId(orderItem.getProductId() != null ? orderItem.getProductId() : 0L);
        dto.setPricePerUnit(orderItem.getPricePerUnit() != null ? orderItem.getPricePerUnit() : 0.0);
        dto.setAmount(dto.getPricePerUnit() * orderItem.getQuantity());
        return dto;
    }
}