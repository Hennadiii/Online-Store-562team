package com.furniture_store.product_catalog.controller;

import com.furniture_store.product_catalog.dto.PaginatedResponse;
import com.furniture_store.product_catalog.dto.ProductDto;
import com.furniture_store.product_catalog.service.ProductManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;

@RestController
public class ProductController {

    @Autowired
    private ProductManager productManager;

    @GetMapping("/products")
    public ResponseEntity<PaginatedResponse<ProductDto>> getProducts(
            @RequestParam(defaultValue = "T") String[] filters, @RequestParam(defaultValue = "addedAt") String sort,
            @RequestParam(defaultValue = "desc") String order, @RequestParam Integer page, @RequestParam Integer pageSize) {
        return ResponseEntity.ok().body(productManager.getProductList(filters, sort, order, page, pageSize));
    }

    @GetMapping("/products/search")
    public ResponseEntity<PaginatedResponse<ProductDto>> searchProducts(
            @RequestParam("q") String keyword, @RequestParam(defaultValue = "T") String[] filters,
            @RequestParam(defaultValue = "addedAt") String sort, @RequestParam(defaultValue = "desc") String order,
            @RequestParam Integer page, @RequestParam Integer pageSize){
        return ResponseEntity.ok().body(productManager.searchProduct(keyword, filters, sort, order, page, pageSize));
    }

    @PostMapping("/products")
    public ResponseEntity<Void> addProduct(@RequestBody ProductDto product){
        Long id = productManager.addProduct(product);
        URI uri = ServletUriComponentsBuilder
                .fromCurrentRequestUri()
                .path("/{productId}")
                .buildAndExpand(id)
                .toUri();
        return ResponseEntity.created(uri).build();
    }

    @GetMapping("/products/{id}")
    public ResponseEntity<ProductDto> getProduct(@PathVariable Long id){
        return ResponseEntity.ok().body(productManager.getProduct(id));
    }
}
