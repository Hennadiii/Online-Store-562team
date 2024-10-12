package com.furniture_store.product_catalog.service;

import com.furniture_store.product_catalog.repository.ProductRepository;
import com.furniture_store.product_catalog.entity.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Base64;
import java.util.List;

@Service
public class ProductManager {

    @Autowired
    private ProductRepository productRepository;

    public Page<Product> getProductList(String[] filters, String sort, Integer page, Integer pageSize){
        String filterString = "T";
        if(filters != null && filters.length > 0){
            filterString = String.join(" and ", filters);
        }
        Page<Product> products = productRepository.findAllWithFilters(filterString, sort, PageRequest.of(page, pageSize));
        products.forEach(p -> p.setImages(decodeImages(p.getImages())));
        return products;
    }

    public Page<Product> searchProduct(String keyword, String[] filters, String sort, Integer page, Integer pageSize){
        String filterString = "T";
        if(filters != null && filters.length > 0){
            filterString = String.join(" and ", filters);
        }
        Page<Product> foundProducts = productRepository.findAllByContainsKey(keyword, filterString, PageRequest.of(page, pageSize));
        foundProducts.forEach(p -> p.setImages(decodeImages(p.getImages())));
        return foundProducts;
    }

    public Long addProduct(Product product){
        product.setImages(encodeImages(product.getImages()));
        return productRepository.save(product).getId();
    }

    public Product getProduct(Long id){
        Product product = productRepository.getReferenceById(id);
        product.setImages(decodeImages(product.getImages()));
        return product;
    }

    private List<byte[]> decodeImages(List<byte[]> images){
        if(images == null || images.isEmpty()){
            return images;
        }
        List<byte[]> decodedImages = new ArrayList<>();
        images.forEach(i -> decodedImages.add(Base64.getDecoder().decode(i)));
        return decodedImages;
    }

    private List<byte[]> encodeImages(List<byte[]> images){
        if(images == null || images.isEmpty()){
            return images;
        }
        List<byte[]> encodedImages = new ArrayList<>();
        images.forEach(i -> encodedImages.add(Base64.getEncoder().encode(i)));
        System.out.println(encodedImages.size());
        return encodedImages;
    }
}
