package com.furniture_store.order_management_service.web;

import com.furniture_store.order_management_service.exception.OrderNotFoundException;
import com.furniture_store.order_management_service.exception.PaymentInfoNotFoundException;
import com.furniture_store.order_management_service.exception.WebClientException;
import com.furniture_store.order_management_service.exception.WrongOrderStatusException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

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
    public ResponseEntity<Void> handlePaymentInfoNotFoundException(){
        return ResponseEntity.notFound().build();
    }

    @ExceptionHandler(WebClientException.class)
    public ResponseEntity<Void> handleWebClientException(){
        return ResponseEntity.internalServerError().build();
    }

}
