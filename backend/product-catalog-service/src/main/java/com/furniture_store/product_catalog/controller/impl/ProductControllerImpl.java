package com.furniture_store.product_catalog.controller.impl;

import com.furniture_store.product_catalog.controller.ProductController;
import com.furniture_store.product_catalog.dto.Filter;
import com.furniture_store.product_catalog.dto.PaginatedResponse;
import com.furniture_store.product_catalog.dto.ProductDto;
import com.furniture_store.product_catalog.service.ProductManager;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;

/**
 * Контролер для керування операціями з продуктами.
 */
@CrossOrigin(origins = "*") /*CORS */
@RestController
public class ProductControllerImpl implements ProductController {

    private final ProductManager productManager;

    public ProductControllerImpl(ProductManager productManager) {
        this.productManager = productManager;
    }

    /**
     * Отримує список продуктів з можливістю фільтрації, сортування та пагінації.
     *
     * @param filter   фільтр для відбору продуктів за категорією, ціною тощо
     * @param sort     параметр для сортування (за замовчуванням "addedAt")
     * @param order    порядок сортування (за замовчуванням "desc")
     * @param page     номер сторінки результатів
     * @param pageSize розмір сторінки
     * @return об'єкт {@link PaginatedResponse} зі списком продуктів {@link ProductDto}
     */
    @Override
    @GetMapping("/products")
    public PaginatedResponse<ProductDto> getProducts(
            Filter filter, @RequestParam(defaultValue = "addedAt") String sort,
            @RequestParam(defaultValue = "desc") String order, @RequestParam Integer page, @RequestParam Integer pageSize) {

        return productManager.getProductList(filter, sort, order, page, pageSize);
    }

    /**
     * Виконує пошук продуктів за ключовим словом з можливістю фільтрації, сортування та пагінації.
     *
     * @param keyword  ключове слово для пошуку
     * @param filter   фільтр для відбору продуктів за категорією, ціною тощо
     * @param sort     параметр для сортування (за замовчуванням "addedAt")
     * @param order    порядок сортування (за замовчуванням "desc")
     * @param page     номер сторінки результатів
     * @param pageSize розмір сторінки
     * @return об'єкт {@link PaginatedResponse} зі списком продуктів {@link ProductDto}
     */
    @Override
    @GetMapping("/products/search")
    public PaginatedResponse<ProductDto> searchProducts(
            @RequestParam("q") String keyword, Filter filter, @RequestParam(defaultValue = "addedAt") String sort,
            @RequestParam(defaultValue = "desc") String order, @RequestParam Integer page, @RequestParam Integer pageSize) {
        return productManager.searchProduct(keyword, filter, sort, order, page, pageSize);
    }

    /**
     * Додає новий продукт.
     *
     * @param product об'єкт {@link ProductDto}, що містить інформацію про продукт
     * @return відповідь {@link ResponseEntity} з кодом 201 Created та URI нового продукту в заголовку Location
     */
    @Override
    @PostMapping("/products")
    public ResponseEntity<Void> addProduct(@RequestBody @Validated ProductDto product) {
        Long id = productManager.addProduct(product);
        URI uri = ServletUriComponentsBuilder
                .fromCurrentRequestUri()
                .path("/{productId}")
                .buildAndExpand(id)
                .toUri();
        return ResponseEntity.created(uri).build();
    }

    /**
     * Отримує інформацію про продукт за його ідентифікатором.
     *
     * @param id ідентифікатор продукту
     * @return об'єкт {@link ProductDto}, що містить детальну інформацію про продукт
     */
    @Override
    @GetMapping("/products/{id}")
    public ProductDto getProduct(@PathVariable Long id) {
        return productManager.getProduct(id);
    }

    /**
     * Видаляє продукт за його ідентифікатором.
     * Цей метод видаляє продукт із бази даних за переданим ідентифікатором, якщо він існує.
     *
     * @param id Ідентифікатор продукту, який потрібно видалити
     */
    @Override
    @DeleteMapping("/products/{id}")
    public void deleteProduct(@PathVariable Long id) {
        productManager.deleteProduct(id);
    }

    /**
     * Оновлює дані існуючого продукту за його ідентифікатором.
     * Якщо продукт із заданим ідентифікатором існує, його дані оновлюються відповідно до переданих значень.
     * Якщо продукт не існує, створюється новий запис.
     *
     * @param id      Ідентифікатор продукту, який потрібно оновити
     * @param product об'єкт DTO продукту з оновленими даними
     */
    @Override
    @PutMapping("/products/{id}")
    public void updateProduct(@PathVariable Long id, @RequestBody @Validated ProductDto product) {
        product.setId(id);
        productManager.updateProduct(product);
    }

}

