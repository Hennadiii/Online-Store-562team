package com.furniture_store.product_catalog.service;

import com.furniture_store.product_catalog.repository.ProductRepository;
import com.furniture_store.product_catalog.entity.Product;
import org.hibernate.query.Page;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductManager {

    @Autowired
    private ProductRepository productRepository;

    public List<Product> getProductList(String[] filters, String sort, Integer page, Integer pageSize){
        String filterString = "T";
        if(filters != null && filters.length > 0){
            filterString = String.join(" and ", filters);
        }
        List<Product> products = productRepository.findAllWithFilters(filterString, sort, Page.page(pageSize, page));
        System.out.println(products);
        return products;
    }

    public List<Product> searchProduct(String keyword, String[] filters, String sort){
        String filterString = "T";
        if(filters != null && filters.length > 0){
            filterString = String.join(" and ", filters);
        }
        return productRepository.findAllByContainsKey(keyword, filterString, sort);
    }

    public Long addProduct(Product product){
       return productRepository.save(product).getId();
    }
}
