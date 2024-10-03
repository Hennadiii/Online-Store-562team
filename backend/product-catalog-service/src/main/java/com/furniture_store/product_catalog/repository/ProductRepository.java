package com.furniture_store.product_catalog.repository;

import com.furniture_store.product_catalog.entity.Product;
import org.hibernate.query.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {

    @Query("select p from Product p where cast(:filters as boolean) order by :sort")
    List<Product> findAllWithFilters(String filters, String sort, Page page);

    @Query("select p from Product p where lower(concat(p.name, p.description)) like concat('%', lower(':key'), '%') and cast(:filters as boolean) order by :sort")
    List<Product> findAllByContainsKey(String key, String filters, String sort);
}
