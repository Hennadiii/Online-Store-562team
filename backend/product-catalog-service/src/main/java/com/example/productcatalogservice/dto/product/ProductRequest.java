package com.example.productcatalogservice.dto.product;

import lombok.Builder;
import lombok.Data;

@Data
public class ProductRequest {
    private String name;
    private String description;
    private Float price;
    private String category;
}
