package com.furniture_store.order_management_service.exception;

public class WrongOrderStatusException extends IllegalArgumentException{

    public WrongOrderStatusException(String message) {
        super(message);
    }

}
