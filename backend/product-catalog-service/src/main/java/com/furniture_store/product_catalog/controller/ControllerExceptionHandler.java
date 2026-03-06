package com.furniture_store.product_catalog.controller;

import com.furniture_store.product_catalog.exception.ProductAlreadyExistsException;
import com.furniture_store.product_catalog.exception.ProductNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@ControllerAdvice
public class ControllerExceptionHandler {

    @ExceptionHandler(ProductNotFoundException.class)
    public ResponseEntity<String> handleProductNotFound(Exception ex) {
        return ResponseEntity.notFound().build();
    }

    @ExceptionHandler(ProductAlreadyExistsException.class)
    public ResponseEntity<String> handleProductAlreadyExists(Exception ex) {
        return ResponseEntity.badRequest().body(ex.getMessage());
    }

    // Обробка помилок валідації @NotBlank, @Positive тощо
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, List<String>>> handleValidationErrors(MethodArgumentNotValidException ex) {
        List<String> errors = ex.getBindingResult()
                .getFieldErrors()
                .stream()
                .map(e -> e.getField() + ": " + e.getDefaultMessage())
                .collect(Collectors.toList());

        return ResponseEntity.badRequest().body(Map.of("errors", errors));
    }
}