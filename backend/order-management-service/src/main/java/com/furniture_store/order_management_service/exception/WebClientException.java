package com.furniture_store.order_management_service.exception;

public class WebClientException extends RuntimeException{

    public WebClientException(String message) {
        super(message);
    }

    public WebClientException(){

    }
}
