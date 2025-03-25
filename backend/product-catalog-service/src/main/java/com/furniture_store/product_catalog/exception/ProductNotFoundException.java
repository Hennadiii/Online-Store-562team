package com.furniture_store.product_catalog.exception;

import java.util.NoSuchElementException;

public class ProductNotFoundException extends NoSuchElementException {

    public ProductNotFoundException(String message) {
        super(message);
    }

    public ProductNotFoundException() {}
}
