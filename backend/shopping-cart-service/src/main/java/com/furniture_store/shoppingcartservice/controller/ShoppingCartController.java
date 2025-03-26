package com.furniture_store.shoppingcartservice.controller;

import com.furniture_store.shoppingcartservice.dto.CartItemDtoRequest;
import com.furniture_store.shoppingcartservice.dto.ShoppingCartDtoResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

public interface ShoppingCartController {

    @Operation(summary = "Створити новий кошик", description = "Створює кошик для конкретного користувача (якщо вказано userId).")
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "Кошик успішно створено."),
            @ApiResponse(responseCode = "400", description = "Невірний ідентифікатор користувача.",
                    content = {@Content(schema = @Schema)}),
            @ApiResponse(responseCode = "500", description = "Неочікувана помилка сервера.",
                    content = {@Content(schema = @Schema)})
    })
    @PostMapping
    ResponseEntity<ShoppingCartDtoResponse> createCart(@RequestParam(required = false) Long userId);

    @Operation(summary = "Отримати кошик за ID", description = "Отримання кошика за його ідентифікатором.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Кошик знайдено."),
            @ApiResponse(responseCode = "404", description = "Кошик не знайдено.",
                    content = {@Content(schema = @Schema)}),
            @ApiResponse(responseCode = "500", description = "Неочікувана помилка сервера.",
                    content = {@Content(schema = @Schema)})
    })
    @GetMapping("/{cartId}")
    ResponseEntity<ShoppingCartDtoResponse> getCart(@PathVariable Long cartId);

    @Operation(summary = "Додати товар до кошика", description = "Додає товар до кошика.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Товар успішно додано."),
            @ApiResponse(responseCode = "404", description = "Кошик або товар не знайдено.",
                    content = {@Content(schema = @Schema)}),
            @ApiResponse(responseCode = "500", description = "Неочікувана помилка сервера.",
                    content = {@Content(schema = @Schema)})
    })
    @PostMapping("/{cartId}/items")
    ResponseEntity<ShoppingCartDtoResponse> addItemToCart(@PathVariable Long cartId, @RequestBody CartItemDtoRequest request);

    @Operation(summary = "Оновити кількість товару", description = "Оновлює кількість конкретного товару в кошику.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Кількість товару успішно оновлено."),
            @ApiResponse(responseCode = "404", description = "Кошик або товар не знайдено.",
                    content = {@Content(schema = @Schema)}),
            @ApiResponse(responseCode = "500", description = "Неочікувана помилка сервера.",
                    content = {@Content(schema = @Schema)})
    })
    @PutMapping("/{cartId}/items/{productId}")
    ResponseEntity<ShoppingCartDtoResponse> updateItemQuantity(@PathVariable Long cartId, @PathVariable Long productId, @RequestBody CartItemDtoRequest request);

    @Operation(summary = "Видалити товар з кошика", description = "Видаляє товар із кошика.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Товар успішно видалено."),
            @ApiResponse(responseCode = "404", description = "Кошик або товар не знайдено.",
                    content = {@Content(schema = @Schema)}),
            @ApiResponse(responseCode = "500", description = "Неочікувана помилка сервера.",
                    content = {@Content(schema = @Schema)})
    })
    @DeleteMapping("/{cartId}/items/{productId}")
    ResponseEntity<ShoppingCartDtoResponse> removeItemFromCart(@PathVariable Long cartId, @PathVariable Long productId);

    @Operation(summary = "Очистити кошик", description = "Видаляє всі товари з кошика.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Кошик успішно очищено."),
            @ApiResponse(responseCode = "404", description = "Кошик не знайдено.",
                    content = {@Content(schema = @Schema)}),
            @ApiResponse(responseCode = "500", description = "Неочікувана помилка сервера.",
                    content = {@Content(schema = @Schema)})
    })
    @DeleteMapping("/{cartId}")
    ResponseEntity<String> clearCart(@PathVariable Long cartId);

}
