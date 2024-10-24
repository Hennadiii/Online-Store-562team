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
public class  ProductDto {

    private Long id;
    private String name;
    private Float price;
    private String description;
    private String category;
    private String producer;
    private List<byte[]> images = new ArrayList<>();
    private List<String> keywords = new ArrayList<>();

    public ProductDto(Product product) {
        this.id = product.getId();
        this.name = product.getName();
        this.price = product.getPrice();
        this.description = product.getDescription();
        this.category = product.getCategory().getName();
        this.producer = product.getProducer().getName();
        this.images = product.getImages().stream().map(Image::getBytes).toList();
        this.keywords = product.getKeywords();
    }
}
