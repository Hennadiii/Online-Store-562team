package com.furniture_store.product_catalog.repository;

import com.furniture_store.product_catalog.entity.Product;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

import org.springframework.data.repository.query.Param;
import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {

    @Query(value = "select p from Product p " +
            " left join p.category as c" +
            " left join p.producer as pr where" +
            " (:categoryName is null or c.name = :categoryName) and" +
            " (:minPrice is null or p.price >= :minPrice) and" +
            " (:maxPrice is null or p.price <= :maxPrice) and" +
            " (:producerName is null or pr.name = :producerName)",
           countQuery = "select count(p) from Product p " +
            " left join p.category as c" +
            " left join p.producer as pr where" +
            " (:categoryName is null or c.name = :categoryName) and" +
            " (:minPrice is null or p.price >= :minPrice) and" +
            " (:maxPrice is null or p.price <= :maxPrice) and" +
            " (:producerName is null or pr.name = :producerName)")
    Page<Product> findAllWithFilters(String categoryName, Float minPrice, Float maxPrice, String producerName, Pageable page);

    @Query("select distinct p from Product p" +
            " left join p.category as c" +
            " left join p.keywords as k" +
            " left join p.producer as pr" +
            " where ((lower(p.name) like concat('%', lower(:key), '%')) or" +
            " (lower(p.description) like concat('%', lower(:key), '%')) or" +
            " :key in (select pk from p.keywords pk)) and" +
            " (:categoryName is NULL or c.name = :categoryName) and" +
            " (:minPrice is NULL or p.price >= :minPrice) and" +
            " (:maxPrice is NULL or p.price <= :maxPrice) and" +
            " (:producerName is NULL or pr.name = :producerName)")
    Page<Product> findAllByContainsKey(String key, String categoryName, Float minPrice, Float maxPrice, String producerName, Pageable page);

    Optional<Product> findByName(String name);

    boolean existsByName(String name);

    @Query("""
    select distinct p from Product p
    left join p.category c
    left join p.producer pr
    where lower(p.name) like lower(concat('%', :query, '%'))
       or lower(p.description) like lower(concat('%', :query, '%'))
""")
List<Product> searchSimple(@Param("query") String query);
}