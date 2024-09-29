package com.furniture_store.product_catalog.controller;

import com.furniture_store.product_catalog.service.ProductManager;
import com.furniture_store.product_catalog.entity.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ProductController {

    @Autowired
    private ProductManager productManager;

    @GetMapping("/posts")
    public ResponseEntity<List<Product>> getProducts(@RequestParam(required = false) String[] filters, @RequestParam String sort){
        return ResponseEntity.ok().body(productManager.getProductList(filters, sort));
    }

    @GetMapping("/posts/search")
    public ResponseEntity<List<Product>> searchProducts(String keyword, @RequestParam String[] filters, @RequestParam String sort){
        return ResponseEntity.ok().body(productManager.searchProduct(keyword, filters, sort));
    }

}
