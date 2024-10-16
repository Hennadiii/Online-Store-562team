package com.furniture_store.product_catalog.service;

import com.furniture_store.product_catalog.dto.PaginatedResponse;
import com.furniture_store.product_catalog.dto.ProductDto;
import com.furniture_store.product_catalog.entity.Image;
import com.furniture_store.product_catalog.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

@Service
public class ProductDtoConverter {

    public Product convertToProduct(ProductDto productDto) {
        return Product.builder().
                id(productDto.getId())
                .name(productDto.getName())
                .price(productDto.getPrice())
                .category(productDto.getCategory())
                .images(productDto.getImages().stream().map(Image::new).toList())
                .keywords(productDto.getKeywords())
                .build();
    }

}
