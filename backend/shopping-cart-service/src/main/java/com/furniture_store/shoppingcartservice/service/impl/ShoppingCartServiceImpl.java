package com.furniture_store.shoppingcartservice.service.impl;

import com.furniture_store.shoppingcartservice.dto.CartItemDtoRequest;
import com.furniture_store.shoppingcartservice.entity.CartItem;
import com.furniture_store.shoppingcartservice.entity.ShoppingCart;
import com.furniture_store.shoppingcartservice.repository.CartItemRepository;
import com.furniture_store.shoppingcartservice.repository.ShoppingCartRepository;
import com.furniture_store.shoppingcartservice.service.ShoppingCartService;
import com.furniture_store.shoppingcartservice.exception.CartNotFoundException;
import com.furniture_store.shoppingcartservice.service.mapper.CartItemMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class ShoppingCartServiceImpl implements ShoppingCartService {

    private final ShoppingCartRepository shoppingCartRepository;
    private final CartItemRepository cartItemRepository;
    private final CartItemMapper cartItemMapper;

    @Override
    public ShoppingCart createCart(Long userId) {
        ShoppingCart cart = new ShoppingCart();
        cart.setUserId(userId);
        cart.setCreatedDate(LocalDateTime.now());
        cart.setItems(List.of());
        cart.setTotalPrice(0.0);
        return shoppingCartRepository.save(cart);
    }

    @Override
    public ShoppingCart getCartById(Long cartId) {
        return shoppingCartRepository.findById(cartId)
                .orElseThrow(() -> new CartNotFoundException("Cart not found with ID: " + cartId));
    }

    @Override
    public ShoppingCart addItemToCart(Long cartId, CartItemDtoRequest cartItem) {
        ShoppingCart cart = getCartById(cartId);

        Optional<CartItem> existingItem = cartItemRepository.findByShoppingCart_IdAndProductId(cartId, cartItem.getProductId());
        if (existingItem.isPresent()) {
            CartItem item = existingItem.get();
            item.setQuantity(item.getQuantity() + cartItem.getQuantity());
            cart.setTotalPrice(cart.getItems().stream().mapToDouble(i -> i.getPrice() * i.getQuantity()).sum());
            shoppingCartRepository.save(cart);
            return cart;
        }
        CartItem newItem = cartItemMapper.toEntity(cartItem);
        newItem.setShoppingCart(cart);

        cart.getItems().add(newItem);
        cart.setTotalPrice(cart.getItems().stream().mapToDouble(i -> i.getPrice() * i.getQuantity()).sum());

        shoppingCartRepository.save(cart);

        return cart;
    }

    @Override
    public ShoppingCart updateItemQuantity(Long cartId, Long productId, int quantity) {
        ShoppingCart cart = getCartById(cartId);
        CartItem item = cart.getItems().stream()
                .filter(i -> i.getProductId().equals(productId))
                .findFirst()
                .orElseThrow(() -> new CartNotFoundException("Product not found in cart"));

        if (quantity == 0) {
            cart.getItems().remove(item);
        } else {
            item.setQuantity(quantity);
        }

        cart.setTotalPrice(cart.getItems().stream().mapToDouble(i -> i.getPrice() * i.getQuantity()).sum());
        return shoppingCartRepository.save(cart);
    }

    @Override
    public ShoppingCart removeItemFromCart(Long cartId, Long productId) {
        ShoppingCart cart = getCartById(cartId);
        CartItem item = cart.getItems().stream()
                .filter(i -> i.getProductId().equals(productId))
                .findFirst()
                .orElseThrow(() -> new CartNotFoundException("Product not found in cart"));

        cart.getItems().remove(item);
        cart.setTotalPrice(cart.getItems().stream().mapToDouble(i -> i.getPrice() * i.getQuantity()).sum());
        return shoppingCartRepository.save(cart);
    }

    @Override
    public void clearCart(Long cartId) {
        ShoppingCart cart = getCartById(cartId);
        cart.getItems().clear();
        cart.setTotalPrice(0.0);
        shoppingCartRepository.save(cart);
    }
}
