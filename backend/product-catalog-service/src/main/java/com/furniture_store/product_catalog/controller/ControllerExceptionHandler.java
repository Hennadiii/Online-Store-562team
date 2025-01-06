package com.furniture_store.product_catalog.controller;

import com.furniture_store.product_catalog.exception.ProductAlreadyExistsException;
import com.furniture_store.product_catalog.exception.ProductNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class ControllerExceptionHandler {

    @ExceptionHandler(ProductNotFoundException.class)
    public ResponseEntity<String> handleProductNotFound(Exception ex){
        return ResponseEntity.notFound().build();
    }

    @ExceptionHandler(ProductAlreadyExistsException.class)
    public ResponseEntity<String> handleProductAlreadyExists(Exception ex){
        return ResponseEntity.badRequest().build();
    }
}
