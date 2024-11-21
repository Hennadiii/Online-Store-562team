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
        Optional<ShoppingCart> userCart = shoppingCartRepository.findShoppingCartByUserId(userId);

        if (userCart.isEmpty()) {
            throw new RuntimeException("Shopping cart not found for user with ID: " + userId);
        }

        return userCart.get();
    }

    @Override
    public void clearCart(Long cartId) {
        ShoppingCart cart = shoppingCartRepository.findById(cartId)
                .orElseThrow(() -> new RuntimeException("Shopping cart not found with ID:" + cartId));

        cart.getItems().clear();
        cart.setTotalPrice(0.0);

        shoppingCartRepository.save(cart);
    }

    @Override
    public void deleteCart(Long cartId) {
        ShoppingCart cart = shoppingCartRepository.findById(cartId)
                .orElseThrow(() -> new RuntimeException("Shopping cart not found with ID:" + cartId));

        shoppingCartRepository.delete(cart);

    }

    @Override
    public void addItemToCart(Long cartId, Long productId, int quantity, double price) {
        ShoppingCart cart = shoppingCartRepository.findById(cartId)
                .orElseThrow(() -> new RuntimeException("Shopping cart not found with ID:" + cartId));

        CartItem existingItem = cart.getItems().stream()
                .filter(item -> item.getProductId().equals(productId))
                .findFirst()
                .orElse(null);

        if (existingItem != null) {
            existingItem.setQuantity(existingItem.getQuantity() + quantity);
            existingItem.setPrice(existingItem.getPrice() + (price * quantity));
        } else {
            CartItem newItem = new CartItem();
            newItem.setShoppingCart(cart);
            newItem.setProductId(productId);
            newItem.setQuantity(quantity);
            newItem.setPrice(price * quantity);
            cart.getItems().add(newItem);
        }

        double updateTotalPrice = cart.getItems().stream()
                .mapToDouble(CartItem::getPrice)
                .sum();
        cart.setTotalPrice(updateTotalPrice);

        shoppingCartRepository.save(cart);

    }

    @Override
    public void updateItemQuantity(Long cartId, Long productId, int newQuantity) {
        CartItem cartItem = cartItemRepository.findByShoppingCart_IdAndProductId(cartId, productId)
                .orElseThrow(() -> new RuntimeException("Cart item not found with product ID: " + productId));

        double unitPrice = cartItem.getPrice() / cartItem.getQuantity();
        cartItem.setQuantity(newQuantity);
        cartItem.setPrice(unitPrice * newQuantity);
        cartItemRepository.save(cartItem);

        ShoppingCart cart = shoppingCartRepository.findById(cartId)
                .orElseThrow(() -> new RuntimeException("Shopping cart not found with ID: " + cartId));
        double updatedTotalPrice = cartItemRepository.findByShoppingCart_Id(cartId).stream()
                .mapToDouble(CartItem::getPrice)
                .sum();
        cart.setTotalPrice(updatedTotalPrice);
        shoppingCartRepository.save(cart);
    }


    @Override
    public void removeItemFromCart(Long cartId, Long productId) {
        cartItemRepository.deleteByShoppingCart_Id(cartId);

        ShoppingCart cart = shoppingCartRepository.findById(cartId)
                .orElseThrow(() -> new RuntimeException("Shopping cart not found with ID: " + cartId));
        double updatedTotalPrice = cartItemRepository.findByShoppingCart_Id(cartId).stream()
                .mapToDouble(CartItem::getPrice)
                .sum();
        cart.setTotalPrice(updatedTotalPrice);
        shoppingCartRepository.save(cart);
    }


    @Override
    public double calculateTotalPrice(Long cartId) {
        ShoppingCart cart = shoppingCartRepository.findById(cartId)
                .orElseThrow(() -> new RuntimeException("Shopping cart not found with ID: " + cartId));

        return cart.getItems().stream()
                .mapToDouble(CartItem::getPrice)
                .sum();
    }


    @Override
    public List<CartItem> getCartItems(Long cartId) {
        return cartItemRepository.findByShoppingCart_Id(cartId);
    }

}
