package com.furniture_store.product_catalog.repository;

import com.furniture_store.product_catalog.entity.Product;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ProductRepository extends JpaRepository<Product, Long> {

    @Query("select p from Product p where" +
            "(:categoryName is null or p.category.name = :categoryName) and" +
            "(:minPrice is null or p.price >= :minPrice) and" +
            "(:maxPrice is null or p.price <= :maxPrice) and" +
            "(:producerName is null or p.producer.name = :producerName)")
    Page<Product> findAllWithFilters(String categoryName, Float minPrice, Float maxPrice, String producerName, Pageable page);


    @Query("select p from Product p" +
            " left join p.images as i " +
            " left join p.category as c" +
            " left join p.keywords as k" +
            " left join p.producer as pr" +
            " where ((lower(coalesce(p.name, p.description, k)) like concat('%', lower(:key), '%')) or" +
            " :key in (select pk from p.keywords pk)) and" +
            " (:categoryName is NULL or c.name = :categoryName) and" +
            " (:minPrice is NULL or p.price >= :minPrice) and" +
            " (:maxPrice is NULL or p.price <= :maxPrice) and" +
            " (:producerName is NULL or pr.name = :producerName)")
    Page<Product> findAllByContainsKey(String key, String categoryName, Float minPrice, Float maxPrice, String producerName, Pageable page);

}
