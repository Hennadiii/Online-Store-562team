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


/**
 * Сервісний клас для управління продуктами.
 */
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

    /**
     * Отримує список продуктів із застосуванням фільтрації та сортування.
     *
     * @param filter об'єкт фільтра для фільтрації продуктів
     * @param sort поле для сортування
     * @param order порядок сортування (ASC або DESC)
     * @param page номер сторінки
     * @param pageSize розмір сторінки
     * @return список продуктів у вигляді об'єкта {@link PaginatedResponse}
     */
    @Transactional
    public PaginatedResponse<ProductDto> getProductList(Filter filter, String sort, String order, Integer page, Integer pageSize){
        Page<Product> products = productRepository.findAllWithFilters(
                filter.category(), filter.minPrice(), filter.maxPrice(), filter.producer(),
                PageRequest.of(page, pageSize).withSort(parseSort(sort, order))
        );
        List<ProductDto> productDtoList = products.map(ProductDto::new).toList();
        return new PaginatedResponse<>(productDtoList, products);
    }

    /**
     * Пошук продуктів за ключовим словом з фільтрацією, сортуванням та пагінацією.
     * Пошук відбувається в назві, описі або ключових словах товару
     *
     * @param keyword ключове слово для пошуку
     * @param filter об'єкт фільтра для фільтрації продуктів
     * @param sort поле для сортування
     * @param order порядок сортування (ASC або DESC)
     * @param page номер сторінки
     * @param pageSize розмір сторінки
     * @return список продуктів у вигляді об'єкта {@link PaginatedResponse}
     */
    @Transactional
    public PaginatedResponse<ProductDto> searchProduct(String keyword, Filter filter, String sort, String order, Integer page, Integer pageSize){
        Page<Product> foundProducts = productRepository.findAllByContainsKey(
                keyword, filter.category(), filter.minPrice(), filter.maxPrice(), filter.producer(), PageRequest.of(page, pageSize).withSort(parseSort(sort, order))
        );
        List<ProductDto> productDtoList = foundProducts.map(ProductDto::new).toList();
        return new PaginatedResponse<>(productDtoList, foundProducts);
    }

    /**
     * Додає новий продукт до репозиторію.
     * Доводиться шукати категорію та виробника в базі даних через обмеження @NaturalId
     *
     * @param productDto об'єкт DTO продукту для додавання
     * @return ідентифікатор збереженого товару
     */
    @Transactional
    public Long addProduct(ProductDto productDto){
        Product product = productDtoConverter.convertToProduct(productDto);
        product.setCategory(categoryRepository.findByName(productDto.getCategory()).orElse(product.getCategory()));
        product.setProducer(producerRepository.findByName(productDto.getProducer()).orElse(product.getProducer()));
        return productRepository.save(product).getId();
    }

    /**
     * Повертає товар за його ідентифікатором.
     *
     * @param id ідентифікатор продукту
     * @return об'єкт DTO продукту
     */
    @Transactional
    public ProductDto getProduct(Long id){
        Product product = productRepository.getReferenceById(id);
        return new ProductDto(product);
    }

    /**
     * Видаляє продукт за його ідентифікатором. Якщо продукт із вказаним ідентифікатором не знайдено,
     * метод видає помилку або завершує роботу без видалення.
     *
     * @param id Ідентифікатор продукту, який потрібно видалити
     */
    @Transactional
    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }

    /**
     * Оновлює дані продукту. Якщо продукт із вказаним ідентифікатором уже існує, його дані оновлюються,
     * інакше створюється новий продукт.
     *
     * @param productDto об'єкт DTO продукту, що містить оновлені дані продукту
     */
    public void updateProduct(ProductDto productDto) {
        addProduct(productDto);
    }

    /**
     * Парсить параметри сортування.
     *
     * @param property властивість для сортування -  одне з полів класу {@link Product}
     * @param order порядок сортування (ASC або DESC)
     * @return об'єкт {@link Sort} для сортування
     */
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
