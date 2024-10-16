package com.furniture_store.product_catalog.dto;

import com.furniture_store.product_catalog.entity.Image;
import com.furniture_store.product_catalog.entity.Product;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductDto {

    private Long id;
    private String name;
    private Float price;
    private String category;
    private List<byte[]> images = new ArrayList<>();
    private List<String> keywords = new ArrayList<>();

    public ProductDto(Product product) {
        this.id = product.getId();
        this.name = product.getName();
        this.price = product.getPrice();
        this.category = product.getCategory();
        this.images = product.getImages().stream().map(Image::getBytes).toList();
        this.keywords = product.getKeywords();
    }
}
