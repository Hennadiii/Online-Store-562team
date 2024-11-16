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
        Product product = new Product();
        product.setId(productDto.getId());
        product.setName(productDto.getName());
        product.setPrice(productDto.getPrice());
        product.setDescription(productDto.getDescription());
        product.setCategory(new Category(productDto.getCategory()));
        product.setImages(convertImages(productDto.getImages()));
        product.setKeywords(productDto.getKeywords());
        product.setProducer(new Producer(productDto.getProducer()));
        return product;
    }

    List<Image> convertImages(List<byte[]> bytes) {
        List<Image> images = new ArrayList<>();
        if (bytes != null && !bytes.isEmpty()) {
            images = bytes.stream().map(Image::new).toList();
        }
        return images;
    }
}
