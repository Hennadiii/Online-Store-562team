package com.furniture_store.shoppingcartservice.service;

import com.furniture_store.shoppingcartservice.dto.CartItemDtoRequest;
import com.furniture_store.shoppingcartservice.entity.ShoppingCart;


public interface ShoppingCartService {
    ShoppingCart createCart(Long userId);

    void clearCart(Long cartId);

    ShoppingCart addItemToCart(Long cartId, CartItemDtoRequest cartItem);

    ShoppingCart updateItemQuantity(Long cartId, Long productId, int newQuantity);

    ShoppingCart removeItemFromCart(Long cartId, Long productId);

    ShoppingCart getCartById(Long cartId);

}
