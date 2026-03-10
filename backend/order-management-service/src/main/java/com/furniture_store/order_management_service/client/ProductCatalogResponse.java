package com.furniture_store.order_management_service.client;

import lombok.Data;

@Data
public class ProductCatalogResponse {
    private Long id;
    private String title;
    private Double price;
}