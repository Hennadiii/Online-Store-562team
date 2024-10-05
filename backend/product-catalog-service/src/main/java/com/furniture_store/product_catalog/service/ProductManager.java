package com.furniture_store.product_catalog.service;

import com.furniture_store.product_catalog.repository.ProductRepository;
import com.furniture_store.product_catalog.entity.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

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
        return products;
    }

    public Page<Product> searchProduct(String keyword, String[] filters, String sort, Integer page, Integer pageSize){
        String filterString = "T";
        if(filters != null && filters.length > 0){
            filterString = String.join(" and ", filters);
        }
        Page<Product> foundProducts = productRepository.findAllByContainsKey(keyword, filterString, sort, PageRequest.of(page, pageSize));
        return foundProducts;
    }

    public Long addProduct(Product product){
       return productRepository.save(product).getId();
    }
}
