package com.furniture_store.order_management_service.web;

import com.furniture_store.order_management_service.exception.OrderNotFoundException;
import com.furniture_store.order_management_service.exception.PaymentInfoNotFoundException;
import com.furniture_store.order_management_service.exception.WebClientException;
import com.furniture_store.order_management_service.exception.WrongOrderStatusException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(OrderNotFoundException.class)
    public ResponseEntity<Void> handleOrderNotFoundException() {
        return ResponseEntity.notFound().build();
    }

    @ExceptionHandler(WrongOrderStatusException.class)
    public ResponseEntity<Void> handleWrongOrderStatusException() {
        return ResponseEntity.badRequest().build();
    }

    @ExceptionHandler(PaymentInfoNotFoundException.class)
    public ResponseEntity<Void> handlePaymentInfoNotFoundException() {
        return ResponseEntity.notFound().build();
    }

    @ExceptionHandler(WebClientException.class)
    public ResponseEntity<Void> handleWebClientException() {
        return ResponseEntity.internalServerError().build();
    }

    // Валідація @Valid — повертає 400 з описом помилок
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>> handleValidationException(
            MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getFieldErrors().forEach(error ->
                errors.put(error.getField(), error.getDefaultMessage())
        );
        ex.getBindingResult().getGlobalErrors().forEach(error ->
                errors.put(error.getObjectName(), error.getDefaultMessage())
        );
        return ResponseEntity.badRequest().body(errors);
    }

    // Загальний fallback — 400 замість 500 для некоректних запитів
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<Map<String, String>> handleIllegalArgument(IllegalArgumentException ex) {
        return ResponseEntity.badRequest().body(Map.of("error", ex.getMessage()));
    }
}