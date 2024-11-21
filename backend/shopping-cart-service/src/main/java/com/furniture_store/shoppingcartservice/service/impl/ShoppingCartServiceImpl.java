package com.furniture_store.shoppingcartservice.service.impl;

import com.furniture_store.shoppingcartservice.entity.CartItem;
import com.furniture_store.shoppingcartservice.entity.ShoppingCart;
import com.furniture_store.shoppingcartservice.service.ShoppingCartService;

import java.util.List;

public class ShoppingCartServiceImpl implements ShoppingCartService {
    @Override
    public ShoppingCart createCart(Long userId) {
        return null;
    }

    @Override
    public ShoppingCart getCartByUserId(Long userId) {
        return null;
    }

    @Override
    public void clearCart(Long cartId) {

    }

    @Override
    public void deleteCart(Long cartId) {

    }

    @Override
    public void addItemToCart(Long cartId, Long productId, int quantity, double price) {

    }

    @Override
    public void updateItemQuantity(Long cartId, Long productId, int newQuantity) {

    }

    @Override
    public void removeItemFromCart(Long cartId, Long productId) {

    }

    @Override
    public double calculateTotalPrice(Long cartId) {
        return 0;
    }

    @Override
    public List<CartItem> getCartItems(Long cartId) {
        return null;
    }
}
