package com.furniture_store.product_catalog.controller;

import com.furniture_store.product_catalog.dto.Filter;
import com.furniture_store.product_catalog.dto.PaginatedResponse;
import com.furniture_store.product_catalog.dto.ProductDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@Tag(name = "API товарів", description = "CRUD операції для керування товарами")
public interface ProductController {

    @Operation(summary = "Отримати всі товари",
            description = "Повертає список усіх доступних товарів. Підтримує фільтрацію за ціною, категорією і виробником")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Список успішно отримано")
    })
    @GetMapping("/products")
    PaginatedResponse<ProductDto> getProducts(
            Filter filter, @RequestParam(defaultValue = "addedAt") String sort,
            @RequestParam(defaultValue = "desc") String order, @RequestParam Integer page, @RequestParam Integer pageSize);

    @Operation(summary = "Пошук товарів",
            description = "Виконує пошук товару за ключовим словом. Повертає сторінку знайдених товарів." +
                    " Підтримує фільтрацію за ціною, категорією і виробником"
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Товари знайдено або повернуто порожній список")
    })
    @GetMapping("/products/search")
    PaginatedResponse<ProductDto> searchProducts(
            @RequestParam("q") String keyword, Filter filter, @RequestParam(defaultValue = "addedAt") String sort,
            @RequestParam(defaultValue = "desc") String order, @RequestParam Integer page, @RequestParam Integer pageSize);

    @Operation(summary = "Створити новий товар", description = "Додає новий товар до каталогу")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Товар успішно створено"),
            @ApiResponse(responseCode = "400", description = "Некоректні вхідні дані")
    })
    @PostMapping("/products")
    ResponseEntity<Void> addProduct(@RequestBody @Validated ProductDto product);

    @Operation(summary = "Отримати товар за ID", description = "Повертає один товар за вказаним ідентифікатором")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Товар знайдено"),
            @ApiResponse(responseCode = "404", description = "Товар не знайдено",
                    content = @Content(schema = @Schema(implementation = Void.class))
            )
    })
    @GetMapping("/products/{id}")
    ProductDto getProduct(@PathVariable Long id);

    @Operation(summary = "Видалити товар", description = "Видаляє товар за вказаним ID з каталогу")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Товар успішно видалено")
    })
    @DeleteMapping("/products/{id}")
    void deleteProduct(@PathVariable Long id);

    @Operation(summary = "Оновити існуючий товар", description = "Модифікує товар за вказаним ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Товар успішно оновлено")
    })
    @PutMapping("/products/{id}")
    void updateProduct(@PathVariable Long id, @RequestBody @Validated ProductDto product);
}
