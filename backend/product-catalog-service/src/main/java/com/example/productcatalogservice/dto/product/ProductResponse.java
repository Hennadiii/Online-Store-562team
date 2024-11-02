package com.example.productcatalogservice.dto.product;

import java.util.List;
import lombok.Data;

@Data
public class ProductResponse {
    private Long id;
    private String name;
    private String description;
    private Float price;
    private String category;
    private List<String> imageLinks;
}
