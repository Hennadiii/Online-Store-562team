package com.furniture_store.product_catalog.service;

import com.furniture_store.product_catalog.dto.PaginatedResponse;
import com.furniture_store.product_catalog.dto.ProductDto;
import com.furniture_store.product_catalog.repository.ProductRepository;
import com.furniture_store.product_catalog.entity.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductManager {

    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private ProductDtoConverter productDtoConverter;

    public PaginatedResponse<ProductDto> getProductList(String[] filters, String sort, Integer page, Integer pageSize){
        String filterString = "T";
        if(filters != null && filters.length > 0){
            filterString = String.join(" and ", filters);
        }
        Page<Product> products = productRepository.findAllWithFilters(filterString, sort, PageRequest.of(page, pageSize));
        List<ProductDto> productDtoList = products.stream().map(ProductDto::new).toList();
        return new PaginatedResponse<>(productDtoList, products);
    }

    public PaginatedResponse<ProductDto> searchProduct(String keyword, String[] filters, String sort, Integer page, Integer pageSize){
        String filterString = "T";
        if(filters != null && filters.length > 0){
            filterString = String.join(" and ", filters);
        }
        Page<Product> foundProducts = productRepository.findAllByContainsKey(keyword, filterString, PageRequest.of(page, pageSize));
        List<ProductDto> productDtoList = foundProducts.stream().map(ProductDto::new).toList();
        return new PaginatedResponse<>(productDtoList, foundProducts);
    }

    public Long addProduct(ProductDto productDto){
        Product product = productDtoConverter.convertToProduct(productDto);
        return productRepository.save(product).getId();
    }

    public ProductDto getProduct(Long id){
        Product product = productRepository.getReferenceById(id);
        return new ProductDto(product);
    }

}
