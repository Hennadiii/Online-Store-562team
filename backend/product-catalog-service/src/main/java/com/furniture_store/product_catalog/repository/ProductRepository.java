package com.furniture_store.product_catalog.repository;

import com.furniture_store.product_catalog.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {

    @Query("select p from Product p where :filters order by :sort")
    List<Product> findAllWithFilters(String filters, String sort);

    @Query("select p from Product p where lower(concat(p.name, p.description)) like %lower(':key')% and :filters order by :sort")
    List<Product> findAllByContainsKey(String key, String filters, String sort);
}
