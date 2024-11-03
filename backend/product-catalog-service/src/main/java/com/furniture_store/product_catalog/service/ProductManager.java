package com.furniture_store.product_catalog.service;

import com.furniture_store.product_catalog.dto.PaginatedResponse;
import com.furniture_store.product_catalog.dto.ProductDto;
import com.furniture_store.product_catalog.repository.CategoryRepository;
import com.furniture_store.product_catalog.repository.ProducerRepository;
import com.furniture_store.product_catalog.repository.ProductRepository;
import com.furniture_store.product_catalog.entity.Product;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class ProductManager {

    private final ProductRepository productRepository;
    private final ProductDtoConverter productDtoConverter;
    private final ProducerRepository producerRepository;
    private final CategoryRepository categoryRepository;

    public ProductManager(ProductRepository productRepository, ProductDtoConverter productDtoConverter, ProducerRepository producerRepository, CategoryRepository categoryRepository) {
        this.productRepository = productRepository;
        this.productDtoConverter = productDtoConverter;
        this.producerRepository = producerRepository;
        this.categoryRepository = categoryRepository;
    }

    @Transactional
    public PaginatedResponse<ProductDto> getProductList(Filter filter, String sort, String order, Integer page, Integer pageSize){
        Page<Product> products = productRepository.findAllWithFilters(
                filter.category(), filter.minPrice(), filter.maxPrice(), filter.producer(),
                PageRequest.of(page, pageSize).withSort(parseSort(sort, order))
        );
        List<ProductDto> productDtoList = products.map(ProductDto::new).toList();
        return new PaginatedResponse<>(productDtoList, products);
    }

    @Transactional
    public PaginatedResponse<ProductDto> searchProduct(String keyword, Filter filter, String sort, String order, Integer page, Integer pageSize){
        Page<Product> foundProducts = productRepository.findAllByContainsKey(
                keyword, filter.category(), filter.minPrice(), filter.maxPrice(), filter.producer(), PageRequest.of(page, pageSize).withSort(parseSort(sort, order))
        );
        List<ProductDto> productDtoList = foundProducts.map(ProductDto::new).toList();
        return new PaginatedResponse<>(productDtoList, foundProducts);
    }

    @Transactional
    public Long addProduct(ProductDto productDto){
        Product product = productDtoConverter.convertToProduct(productDto);
        product.setCategory(categoryRepository.findByName(productDto.getCategory()).orElse(product.getCategory()));
        product.setProducer(producerRepository.findByName(productDto.getProducer()).orElse(product.getProducer()));
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
