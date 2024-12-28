package com.furniture_store.shoppingcartservice.service.mapper;

import com.furniture_store.shoppingcartservice.dto.ShoppingCartDtoResponse;
import com.furniture_store.shoppingcartservice.entity.ShoppingCart;
import org.springframework.stereotype.Component;

@Component
public class ShoppingCartMapperResponse {

    public ShoppingCartDtoResponse toDto(ShoppingCart shoppingCart) {
        ShoppingCartDtoResponse response = new ShoppingCartDtoResponse();
        response.setCartId(shoppingCart.getId());
        response.setUserId(shoppingCart.getUserId());
        response.setCreatedDate(shoppingCart.getCreatedDate());
        response.setItems(shoppingCart.getItems());
        response.setTotalPrice(shoppingCart.getTotalPrice());
        return response;
    }
}
