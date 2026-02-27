package com.furniture_store.product_catalog.service;

import com.furniture_store.product_catalog.dto.Filter;
import com.furniture_store.product_catalog.dto.PaginatedResponse;
import com.furniture_store.product_catalog.dto.ProductDto;
import com.furniture_store.product_catalog.entity.Product;
import com.furniture_store.product_catalog.exception.ProductAlreadyExistsException;
import com.furniture_store.product_catalog.exception.ProductNotFoundException;
import com.furniture_store.product_catalog.repository.CategoryRepository;
import com.furniture_store.product_catalog.repository.ProducerRepository;
import com.furniture_store.product_catalog.repository.ProductRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
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

    public ProductManager(ProductRepository productRepository, 
                          ProductDtoConverter productDtoConverter, 
                          ProducerRepository producerRepository, 
                          CategoryRepository categoryRepository) {
        this.productRepository = productRepository;
        this.productDtoConverter = productDtoConverter;
        this.producerRepository = producerRepository;
        this.categoryRepository = categoryRepository;
    }

    @Transactional
    public PaginatedResponse<ProductDto> getProductList(Filter filter, String sort, String order, Integer page, Integer pageSize) {
        Page<Product> products = productRepository.findAllWithFilters(
                filter.category(), filter.minPrice(), filter.maxPrice(), filter.producer(),
                PageRequest.of(page, pageSize).withSort(parseSort(sort, order))
        );
        List<ProductDto> productDtoList = products.map(productDtoConverter::convertToDto).toList();
        return new PaginatedResponse<>(productDtoList, products);
    }

    @Transactional
    public PaginatedResponse<ProductDto> searchProduct(String keyword, Filter filter, String sort, String order, Integer page, Integer pageSize) {
        Page<Product> foundProducts = productRepository.findAllByContainsKey(
                keyword, filter.category(), filter.minPrice(), filter.maxPrice(), filter.producer(), 
                PageRequest.of(page, pageSize).withSort(parseSort(sort, order))
        );
        List<ProductDto> productDtoList = foundProducts.map(productDtoConverter::convertToDto).toList();
        return new PaginatedResponse<>(productDtoList, foundProducts);
    }

    @Transactional
    public Long addProduct(ProductDto productDto) {
        if (productDto.getId() != null && getProduct(productDto.getId()) != null) {
            throw new ProductAlreadyExistsException("Product with such id already exists");
        }
        // ИСПРАВЛЕНО: используем getTitle() вместо getName()
        if (productRepository.existsByName(productDto.getTitle())) {
            throw new ProductAlreadyExistsException("Product with such name already exists");
        }
        
        Product product = productDtoConverter.convertToEntity(productDto);
        
        try {
            product.setCategory(categoryRepository.findByName(productDto.getCategory()).orElseThrow());
        } catch (Exception e) {
            categoryRepository.saveAndFlush(product.getCategory());
        }

        // ИСПРАВЛЕНО: Убрали блок поиска/сохранения Producer, так как в DTO его больше нет
        
        productRepository.save(product);
        return product.getId();
    }

    @Transactional
    public ProductDto getProduct(Long id) {
        Product product = productRepository.findById(id).orElseThrow(ProductNotFoundException::new);
        return productDtoConverter.convertToDto(product);
    }

    @Transactional
    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }

    @Transactional
    public void updateProduct(ProductDto productDto) {
        Product product = productDtoConverter.convertToEntity(productDto);
        product.setCategory(categoryRepository.findByName(productDto.getCategory()).orElse(product.getCategory()));
        
        // ИСПРАВЛЕНО: Убрали установку Producer
        
        productRepository.save(product);
    }

    Sort parseSort(String property, String order) {
        Sort sort;
        Optional<Sort.Direction> direction = Sort.Direction.fromOptionalString(order);
        try {
            // Если фронт присылает "title", проверяем наличие поля "name" в Entity для сортировки в БД
            String entityProperty = property.equals("title") ? "name" : property;
            Product.class.getDeclaredField(entityProperty);
            sort = Sort.by(direction.orElse(Sort.Direction.ASC), entityProperty);
        } catch (NoSuchFieldException e) {
            sort = Sort.by(Sort.Direction.DESC, "addedAt");
        }
        return sort;
    }
}