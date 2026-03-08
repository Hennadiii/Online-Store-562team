package com.furniture_store.shoppingcartservice.client.dto;

import lombok.Data;
import java.util.List;
import java.util.Map;

@Data
public class ProductCatalogResponse {
    private Long id;
    private String title;
    private Double price;
    private String description;
    private String fullDescription;
    private String category;
    private String producer;
    private Boolean popular;
    private List<String> images;
    private Map<String, String> characteristics;
}