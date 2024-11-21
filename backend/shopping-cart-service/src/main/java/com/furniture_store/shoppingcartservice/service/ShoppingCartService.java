package com.furniture_store.shoppingcartservice.service;

import com.furniture_store.shoppingcartservice.entity.CartItem;
import com.furniture_store.shoppingcartservice.entity.ShoppingCart;

import java.util.List;

public interface ShoppingCartService {
    ShoppingCart createCart(Long userId);

    ShoppingCart getCartByUserId(Long userId);

    void clearCart(Long cartId);

    void deleteCart(Long cartId);

    void addItemToCart(Long cartId, Long productId, int quantity, double price);

    void updateItemQuantity(Long cartId, Long productId, int newQuantity);

    void removeItemFromCart(Long cartId, Long productId);

    double calculateTotalPrice(Long cartId);

    List<CartItem> getCartItems(Long cartId);
}
