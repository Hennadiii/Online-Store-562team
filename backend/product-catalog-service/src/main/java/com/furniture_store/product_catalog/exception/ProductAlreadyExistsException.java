package com.furniture_store.product_catalog.exception;

public class ProductAlreadyExistsException extends IllegalArgumentException{

    public ProductAlreadyExistsException(String message){
        super(message);
    }
}
