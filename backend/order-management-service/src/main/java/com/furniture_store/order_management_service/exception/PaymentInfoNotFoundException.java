package com.furniture_store.order_management_service.exception;

public class PaymentInfoNotFoundException extends RuntimeException {

    public PaymentInfoNotFoundException(String message) {
        super(message);
    }

    public PaymentInfoNotFoundException() {

    }
}
