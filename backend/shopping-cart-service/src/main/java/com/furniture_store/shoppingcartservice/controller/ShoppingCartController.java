package com.furniture_store.shoppingcartservice.controller;

import com.furniture_store.shoppingcartservice.dto.CartItemDtoRequest;
import com.furniture_store.shoppingcartservice.dto.ShoppingCartDtoResponse;
import com.furniture_store.shoppingcartservice.entity.ShoppingCart;
import com.furniture_store.shoppingcartservice.exception.CartNotFoundException;
import com.furniture_store.shoppingcartservice.service.ShoppingCartService;
import com.furniture_store.shoppingcartservice.service.mapper.ShoppingCartMapperResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/carts")
public class ShoppingCartController {

    private final ShoppingCartService shoppingCartService;
    private final ShoppingCartMapperResponse shoppingCartMapperResponse;

    @Operation(summary = "Create a new shopping cart", description = "Create a shopping cart for a specific user (if userId is provided).")
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "Cart created successfully."),
            @ApiResponse(responseCode = "400", description = "Invalid user ID."),
            @ApiResponse(responseCode = "500", description = "Unexpected server error.")
    })
    @PostMapping
    public ResponseEntity<?> createCart(@RequestParam(required = false) Long userId) {
        try {
            ShoppingCart shoppingCart = shoppingCartService.createCart(userId);
            ShoppingCartDtoResponse response = shoppingCartMapperResponse.toDto(shoppingCart);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (CartNotFoundException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid user ID: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An unexpected error occurred.");
        }
    }

    @Operation(summary = "Get shopping cart by ID", description = "Retrieve a shopping cart using its ID.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Cart found."),
            @ApiResponse(responseCode = "404", description = "Cart not found."),
            @ApiResponse(responseCode = "500", description = "Unexpected server error.")
    })
    @GetMapping("/{cartId}")
    public ResponseEntity<?> getCart(@PathVariable Long cartId) {
        try {
            ShoppingCart cart = shoppingCartService.getCartById(cartId);
            ShoppingCartDtoResponse response = shoppingCartMapperResponse.toDto(cart);
            return ResponseEntity.status(HttpStatus.OK).body(response);
        } catch (CartNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Cart with ID " + cartId + " not found.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An unexpected error occurred.");
        }
    }

    @Operation(summary = "Add item to cart", description = "Add a product item to the shopping cart.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Item added successfully."),
            @ApiResponse(responseCode = "404", description = "Cart or product not found."),
            @ApiResponse(responseCode = "500", description = "Unexpected server error.")
    })
    @PostMapping("/{cartId}/items")
    public ResponseEntity<?> addItemToCart(@PathVariable Long cartId, @RequestBody CartItemDtoRequest request) {
        try {
            ShoppingCart cart = shoppingCartService.addItemToCart(cartId, request.getProductId(), request.getQuantity(), request.getPrice());
            ShoppingCartDtoResponse response = shoppingCartMapperResponse.toDto(cart);
            return ResponseEntity.ok(response);
        } catch (CartNotFoundException | IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Cart or product not found.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An unexpected error occurred.");
        }
    }

    @Operation(summary = "Update item quantity", description = "Update the quantity of a specific product in the cart.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Item quantity updated successfully."),
            @ApiResponse(responseCode = "404", description = "Cart or product not found."),
            @ApiResponse(responseCode = "500", description = "Unexpected server error.")
    })
    @PutMapping("/{cartId}/items/{productId}")
    public ResponseEntity<?> updateItemQuantity(@PathVariable Long cartId, @PathVariable Long productId, @RequestBody CartItemDtoRequest request) {
        try {
            ShoppingCart cart = shoppingCartService.updateItemQuantity(cartId, productId, request.getQuantity());
            ShoppingCartDtoResponse response = shoppingCartMapperResponse.toDto(cart);
            return ResponseEntity.ok(response);
        } catch (CartNotFoundException | IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Cart or product not found.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An unexpected error occurred.");
        }
    }

    @Operation(summary = "Remove item from cart", description = "Remove a product item from the shopping cart.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Item removed successfully."),
            @ApiResponse(responseCode = "404", description = "Cart or product not found."),
            @ApiResponse(responseCode = "500", description = "Unexpected server error.")
    })
    @DeleteMapping("/{cartId}/items/{productId}")
    public ResponseEntity<?> removeItemFromCart(@PathVariable Long cartId, @PathVariable Long productId) {
        try {
            ShoppingCart cart = shoppingCartService.removeItemFromCart(cartId, productId);
            ShoppingCartDtoResponse response = shoppingCartMapperResponse.toDto(cart);
            return ResponseEntity.ok(response);
        } catch (CartNotFoundException | IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Cart or product not found.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An unexpected error occurred.");
        }
    }

    @Operation(summary = "Clear shopping cart", description = "Delete all items from the shopping cart.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Cart cleared successfully."),
            @ApiResponse(responseCode = "404", description = "Cart not found."),
            @ApiResponse(responseCode = "500", description = "Unexpected server error.")
    })
    @DeleteMapping("/{cartId}")
    public ResponseEntity<?> clearCart(@PathVariable Long cartId) {
        try {
            shoppingCartService.clearCart(cartId);
            return ResponseEntity.status(HttpStatus.OK).body("Cart with ID " + cartId + " has been deleted");
        } catch (CartNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Cart not found.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An unexpected error occurred.");
        }
    }
}
