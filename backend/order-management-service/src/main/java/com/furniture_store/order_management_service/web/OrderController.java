package com.furniture_store.order_management_service.web;

import com.furniture_store.order_management_service.dto.DisplayOrderDto;
import com.furniture_store.order_management_service.dto.PostOrderDto;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;

@Tag(name = "API замовлень", description = "CRUD операції для керування замовленнями")
@RestController
public interface OrderController {

    @Operation(summary = "Створити замовлення")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Замовлення успішно створено"),
            @ApiResponse(responseCode = "400", description = "Невірні вхідні дані")
    })
    @PostMapping("/orders")
    ResponseEntity<DisplayOrderDto> createOrder(
            @Parameter(description = "Дані нового замовлення")
            @RequestBody @Validated PostOrderDto order
    );

    @Operation(summary = "Отримати список замовлень")
    @ApiResponse(responseCode = "200", description = "Список замовлень успішно отримано")
    @GetMapping("/orders")
    List<DisplayOrderDto> getOrders(
            @Parameter(description = "Номер сторінки") @RequestParam int page,
            @Parameter(description = "Кількість елементів на сторінці") @RequestParam int pageSize
    );

    @Operation(summary = "Отримати замовлення за ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Замовлення знайдено"),
            @ApiResponse(responseCode = "404", description = "Замовлення не знайдено",
                    content = @Content(schema = @Schema(implementation = Void.class)))
    })
    @GetMapping("/orders/{id}")
    ResponseEntity<DisplayOrderDto> getOrder(
            @Parameter(description = "Ідентифікатор замовлення") @PathVariable long id
    );

    @Operation(summary = "Оновити замовлення")
    @PutMapping("/orders/{id}")
    void updateOrder(
            @Parameter(description = "Ідентифікатор замовлення") @PathVariable long id,
            @Parameter(description = "Оновлені дані замовлення") @RequestBody @Validated PostOrderDto order
    );

    @Operation(summary = "Оновити статус замовлення")
    @PutMapping("/orders/{id}/status")
    void updateOrderStatus(
            @Parameter(description = "Ідентифікатор замовлення") @PathVariable Long id,
            @Parameter(description = "Новий статус замовлення") @RequestBody String status
    );
}