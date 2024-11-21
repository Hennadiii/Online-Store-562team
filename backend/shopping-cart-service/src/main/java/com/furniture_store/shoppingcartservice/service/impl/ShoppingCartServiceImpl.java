package com.furniture_store.shoppingcartservice.service.impl;

import com.furniture_store.shoppingcartservice.entity.CartItem;
import com.furniture_store.shoppingcartservice.entity.ShoppingCart;
import com.furniture_store.shoppingcartservice.repository.CartItemRepository;
import com.furniture_store.shoppingcartservice.repository.ShoppingCartRepository;
import com.furniture_store.shoppingcartservice.service.ShoppingCartService;
import jdk.dynalink.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class ShoppingCartServiceImpl implements ShoppingCartService {

    private final ShoppingCartRepository shoppingCartRepository;
    private final CartItemRepository cartItemRepository;

    @Override
    public ShoppingCart createCart(Long userId) {
        Optional<ShoppingCart> existingCart = shoppingCartRepository.findShoppingCartByUserId(userId);
        if (existingCart.isPresent()) {
            throw new RuntimeException("Shopping cart already exists for user with ID: " + userId);
        }

        ShoppingCart newCart = new ShoppingCart();
        newCart.setUserId(userId);
        newCart.setCreatedDate(LocalDateTime.now());
        newCart.setItems(new ArrayList<>());
        newCart.setTotalPrice(0.0);

        return shoppingCartRepository.save(newCart);


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
