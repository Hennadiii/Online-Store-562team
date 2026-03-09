package com.furniture_store.shoppingcartservice.controller.impl;

import com.furniture_store.shoppingcartservice.controller.ShoppingCartController;
import com.furniture_store.shoppingcartservice.dto.CartItemDtoRequest;
import com.furniture_store.shoppingcartservice.dto.ShoppingCartDtoResponse;
import com.furniture_store.shoppingcartservice.entity.ShoppingCart;
import com.furniture_store.shoppingcartservice.service.ShoppingCartService;
import com.furniture_store.shoppingcartservice.service.mapper.ShoppingCartMapperResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/carts")
public class ShoppingCartControllerImpl implements ShoppingCartController {

    private final ShoppingCartService shoppingCartService;
    private final ShoppingCartMapperResponse shoppingCartMapperResponse;

    @Override
    @PostMapping
    public ResponseEntity<ShoppingCartDtoResponse> createCart(@RequestParam(required = false) Long userId) {
        ShoppingCart shoppingCart = shoppingCartService.createCart(userId);
        ShoppingCartDtoResponse response = shoppingCartMapperResponse.toDto(shoppingCart);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @Override
    @GetMapping("/{cartId}")
    public ResponseEntity<ShoppingCartDtoResponse> getCart(@PathVariable Long cartId) {
        ShoppingCart cart = shoppingCartService.getCartById(cartId);
        ShoppingCartDtoResponse response = shoppingCartMapperResponse.toDto(cart);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @Override
    @PostMapping("/{cartId}/items")
    public ResponseEntity<ShoppingCartDtoResponse> addItemToCart(
            @PathVariable Long cartId,
            @Valid @RequestBody CartItemDtoRequest request) {
        ShoppingCart cart = shoppingCartService.addItemToCart(cartId, request);
        ShoppingCartDtoResponse response = shoppingCartMapperResponse.toDto(cart);
        return ResponseEntity.ok(response);
    }

    @Override
    @PutMapping("/{cartId}/items/{productId}")
    public ResponseEntity<ShoppingCartDtoResponse> updateItemQuantity(
            @PathVariable Long cartId,
            @PathVariable Long productId,
            @Valid @RequestBody CartItemDtoRequest request) {
        ShoppingCart cart = shoppingCartService.updateItemQuantity(cartId, productId, request.getQuantity());
        ShoppingCartDtoResponse response = shoppingCartMapperResponse.toDto(cart);
        return ResponseEntity.ok(response);
    }

    @Override
    @DeleteMapping("/{cartId}/items/{productId}")
    public ResponseEntity<ShoppingCartDtoResponse> removeItemFromCart(
            @PathVariable Long cartId,
            @PathVariable Long productId) {
        ShoppingCart cart = shoppingCartService.removeItemFromCart(cartId, productId);
        ShoppingCartDtoResponse response = shoppingCartMapperResponse.toDto(cart);
        return ResponseEntity.ok(response);
    }

    @Override
    @DeleteMapping("/{cartId}")
    public ResponseEntity<String> clearCart(@PathVariable Long cartId) {
        shoppingCartService.clearCart(cartId);
        return ResponseEntity.status(HttpStatus.OK).body("Cart with ID " + cartId + " has been deleted");
    }
}