package com.furniture_store.product_catalog.repository;

import com.furniture_store.product_catalog.entity.Product;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ProductRepository extends JpaRepository<Product, Long> {

    @Query("select p from Product p where cast(:filters as boolean) order by :sort")
    Page<Product> findAllWithFilters(String filters, String sort, Pageable page);

    @Query(nativeQuery = true, value = "select * from product p where cast(lower(p.name) like concat('%', lower(:key), '%')" +
            "or p.id in (select pk.product_id from product_keywords pk where lower(pk.keywords) = lower(:key)) and " +
            ":filters as boolean)")
    Page<Product> findAllByContainsKey(String key, String filters, Pageable page);
}
