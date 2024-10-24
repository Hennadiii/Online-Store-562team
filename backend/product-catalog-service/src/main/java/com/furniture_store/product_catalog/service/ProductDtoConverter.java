package com.furniture_store.product_catalog.service;

import com.furniture_store.product_catalog.dto.ProductDto;
import com.furniture_store.product_catalog.entity.Category;
import com.furniture_store.product_catalog.entity.Image;
import com.furniture_store.product_catalog.entity.Producer;
import com.furniture_store.product_catalog.entity.Product;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ProductDtoConverter {

    public Product convertToProduct(ProductDto productDto) {
        return Product.builder()
                .id(productDto.getId())
                .name(productDto.getName())
                .price(productDto.getPrice())
                .description(productDto.getDescription())
                .category(new Category(productDto.getCategory()))
                .images(convertImages(productDto.getImages()))
                .keywords(productDto.getKeywords())
                .producer(new Producer(productDto.getProducer()))
                .build();
    }

    List<Image> convertImages(List<byte[]> bytes) {
        List<Image> images = new ArrayList<>();
        if (bytes != null && !bytes.isEmpty()) {
            images = bytes.stream().map(Image::new).toList();
        }
        return images;
    }
}
