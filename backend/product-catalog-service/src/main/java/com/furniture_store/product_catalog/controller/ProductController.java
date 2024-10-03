package com.furniture_store.product_catalog.controller;

import com.furniture_store.product_catalog.service.ProductManager;
import com.furniture_store.product_catalog.entity.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
public class ProductController {

    @Autowired
    private ProductManager productManager;

    @GetMapping("/products")
    public ResponseEntity<List<Product>> getProducts(
            @RequestParam String[] filters, @RequestParam String sort, @RequestParam Integer page, @RequestParam Integer pageSize){
        return ResponseEntity.ok().body(productManager.getProductList(filters, sort, page, pageSize));
    }

    @GetMapping("/products/search")
    public ResponseEntity<List<Product>> searchProducts(String keyword, @RequestParam String[] filters, @RequestParam String sort){
        return ResponseEntity.ok().body(productManager.searchProduct(keyword, filters, sort));
    }

    @PostMapping("/products")
    public ResponseEntity<Void> addProduct(@RequestBody Product product){
        Long id = productManager.addProduct(product);
        URI uri = ServletUriComponentsBuilder
                .fromCurrentRequestUri()
                .path("/{productId}")
                .buildAndExpand(id)
                .toUri();
        return ResponseEntity.created(uri).build();
    }
}
