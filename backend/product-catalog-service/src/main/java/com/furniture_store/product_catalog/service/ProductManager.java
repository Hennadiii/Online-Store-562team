package com.furniture_store.product_catalog.service;

import com.furniture_store.product_catalog.dto.PaginatedResponse;
import com.furniture_store.product_catalog.dto.ProductDto;
import com.furniture_store.product_catalog.repository.ProductRepository;
import com.furniture_store.product_catalog.entity.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class ProductManager {

    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private ProductDtoConverter productDtoConverter;

    @Transactional
    public PaginatedResponse<ProductDto> getProductList(Filter filter, String sort, String order, Integer page, Integer pageSize){
        Page<Product> products = productRepository.findAllWithFilters(
                filter.category(), filter.minPrice(), filter.maxPrice(), filter.producer(),
                PageRequest.of(page, pageSize).withSort(parseSort(sort, order))
        );
        List<ProductDto> productDtoList = products.stream().map(ProductDto::new).toList();
        return new PaginatedResponse<>(productDtoList, products);
    }

    @Transactional
    public PaginatedResponse<ProductDto> searchProduct(String keyword, Filter filter, String sort, String order, Integer page, Integer pageSize){

        Page<Product> foundProducts = productRepository.findAllByContainsKey(
                keyword, filter.category(), filter.minPrice(), filter.maxPrice(), filter.producer(), PageRequest.of(page, pageSize).withSort(parseSort(sort, order))
        );
        List<ProductDto> productDtoList = foundProducts.stream().map(ProductDto::new).toList();
        return new PaginatedResponse<>(productDtoList, foundProducts);
    }

    @Transactional
    public Long addProduct(ProductDto productDto){
        Product product = productDtoConverter.convertToProduct(productDto);
        return productRepository.save(product).getId();
    }

    @Transactional
    public ProductDto getProduct(Long id){
        Product product = productRepository.getReferenceById(id);
        return new ProductDto(product);
    }

    Sort parseSort(String property, String order){
        Sort sort;
        Optional<Sort.Direction> direction = Sort.Direction.fromOptionalString(order);
        try{
            Product.class.getDeclaredField(property);
            sort = Sort.by(direction.orElse(Sort.Direction.ASC), property);
        }catch(NoSuchFieldException e){
            sort = Sort.by(Sort.Direction.DESC, "addedAt");
        }
        return sort;
    }


}
