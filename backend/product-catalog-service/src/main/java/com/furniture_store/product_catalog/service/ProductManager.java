package com.furniture_store.product_catalog.service;

import com.furniture_store.product_catalog.dto.Filter;
import com.furniture_store.product_catalog.dto.PaginatedResponse;
import com.furniture_store.product_catalog.dto.ProductDto;
import com.furniture_store.product_catalog.entity.Product;
import com.furniture_store.product_catalog.entity.Category;
import com.furniture_store.product_catalog.entity.Producer;
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

/**
 * Сервисный класс для управления продуктами.
 */
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

    /**
     * Получает список продуктов с фильтрацией и пагинацией.
     */
    @Transactional(readOnly = true)
    public PaginatedResponse<ProductDto> getProductList(Filter filter, String sort, String order, Integer page, Integer pageSize) {
        Page<Product> products = productRepository.findAllWithFilters(
                filter.category(), filter.minPrice(), filter.maxPrice(), filter.producer(),
                PageRequest.of(page, pageSize).withSort(parseSort(sort, order))
        );
        List<ProductDto> productDtoList = products.map(productDtoConverter::convertToDto).toList();
        return new PaginatedResponse<>(productDtoList, products);
    }

    /**
     * Поиск продуктов по ключевому слову.
     */
    @Transactional(readOnly = true)
    public PaginatedResponse<ProductDto> searchProduct(String keyword, Filter filter, String sort, String order, Integer page, Integer pageSize) {
        Page<Product> foundProducts = productRepository.findAllByContainsKey(
                keyword, filter.category(), filter.minPrice(), filter.maxPrice(), filter.producer(), 
                PageRequest.of(page, pageSize).withSort(parseSort(sort, order))
        );
        List<ProductDto> productDtoList = foundProducts.map(productDtoConverter::convertToDto).toList();
        return new PaginatedResponse<>(productDtoList, foundProducts);
    }

    /**
     * Добавляет новый продукт.
     */
    @Transactional
    public Long addProduct(ProductDto productDto) {
        // Проверка существования по ID
        if (productDto.getId() != null && productRepository.existsById(productDto.getId())) {
            throw new ProductAlreadyExistsException("Product with such id already exists");
        }
        
        // Проверка по имени (используем getTitle() из DTO)
        if (productRepository.existsByName(productDto.getTitle())) {
            throw new ProductAlreadyExistsException("Product with such name already exists");
        }
        
        Product product = productDtoConverter.convertToEntity(productDto);
        
        // Привязка или создание Категории
        product.setCategory(categoryRepository.findByName(productDto.getCategory())
                .orElseGet(() -> categoryRepository.save(new Category(productDto.getCategory()))));

        // Привязка или создание Производителя (Producer)
        product.setProducer(producerRepository.findByName(productDto.getProducer())
                .orElseGet(() -> producerRepository.save(new Producer(productDto.getProducer()))));

        productRepository.save(product);
        return product.getId();
    }

    /**
     * Возвращает товар по ID.
     */
    @Transactional(readOnly = true)
    public ProductDto getProduct(Long id) {
        Product product = productRepository.findById(id).orElseThrow(ProductNotFoundException::new);
        return productDtoConverter.convertToDto(product);
    }

    /**
     * Удаляет продукт.
     */
    @Transactional
public void deleteProduct(Long id) {

    if (!productRepository.existsById(id)) {
        throw new ProductNotFoundException();
    }

    productRepository.deleteById(id);
}

    /**
     * Обновляет данные продукта.
     * Загружает существующий entity из базы и обновляет только его поля.
     */
    @Transactional
public void updateProduct(Long id, ProductDto productDto) {
    // Проверяем, что продукт существует
    Product product = productRepository.findById(id)
            .orElseThrow(ProductNotFoundException::new);

    // Якщо назва змінюється — перевіряємо що нова назва не зайнята
if (!product.getName().equals(productDto.getTitle())
    && productRepository.existsByName(productDto.getTitle())) {
throw new ProductAlreadyExistsException("Product with such name already exists");
}        

    // Обновляем поля
    product.setName(productDto.getTitle());
    product.setPrice(productDto.getPrice());
    product.setDescription(productDto.getDescription());
    product.setFullDescription(productDto.getFullDescription());
    product.setPopular(productDto.getPopular() != null ? productDto.getPopular() : false);

    // Обновляем характеристики
    if (productDto.getCharacteristics() != null) {
        product.setMaterial(productDto.getCharacteristics().getMaterial());
        product.setUpholstery(productDto.getCharacteristics().getUpholstery());
        product.setFunctionality(productDto.getCharacteristics().getFunctionality());
    }

    // Обновляем категорию
    product.setCategory(categoryRepository.findByName(productDto.getCategory())
            .orElseGet(() -> categoryRepository.save(new Category(productDto.getCategory()))));

    // Обновляем производителя
    product.setProducer(producerRepository.findByName(productDto.getProducer())
            .orElseGet(() -> producerRepository.save(new Producer(productDto.getProducer()))));

    // Обновляем изображения
    product.getImages().clear();
    if (productDto.getImages() != null) {
        productDto.getImages().stream()
                .map(com.furniture_store.product_catalog.entity.Image::new)
                .forEach(product.getImages()::add);
    }

    // Сохраняем изменения
    productRepository.save(product);
}
    /**
     * Настройка сортировки (учитывает разницу между title в DTO и name в Entity).
     */
    Sort parseSort(String property, String order) {
        Sort sort;
        Optional<Sort.Direction> direction = Sort.Direction.fromOptionalString(order);
        try {
            // Маппинг: если фронт просит title, в БД сортируем по name
            String entityProperty = property.equals("title") ? "name" : property;
            Product.class.getDeclaredField(entityProperty);
            sort = Sort.by(direction.orElse(Sort.Direction.ASC), entityProperty);
        } catch (NoSuchFieldException e) {
            // Сортировка по умолчанию (новые товары сверху)
            sort = Sort.by(Sort.Direction.DESC, "addedAt");
        }
        return sort;
    }

    @Transactional(readOnly = true)
public List<ProductDto> searchSimple(String query) {
    return productRepository.searchSimple(query)
            .stream()
            .limit(10) // ограничим
            .map(productDtoConverter::convertToDto)
            .toList();
}
}