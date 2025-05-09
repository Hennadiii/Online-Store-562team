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

    public Product convertToEntity(ProductDto productDto) {
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
    
    public ProductDto convertToDto(Product product) {
        ProductDto productDto = new ProductDto();
        productDto.setId(product.getId());
        productDto.setName(product.getName());
        productDto.setPrice(product.getPrice());
        productDto.setDescription(product.getDescription());
        Category category = product.getCategory();
        productDto.setCategory(category!=null ? product.getCategory().getName() : null);
        Producer producer = product.getProducer();
        productDto.setProducer(producer!=null ? product.getProducer().getName() : null);
        productDto.setImages(product.getImages().stream().map(Image::getBytes).toList());
        productDto.setKeywords(product.getKeywords());
        return productDto;
    }

    List<Image> convertImages(List<byte[]> bytes) {
        List<Image> images = new ArrayList<>();
        if (bytes != null && !bytes.isEmpty()) {
            images = bytes.stream().map(Image::new).toList();
        }
        return images;
    }
}
