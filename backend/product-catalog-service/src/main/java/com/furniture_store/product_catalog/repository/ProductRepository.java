package com.furniture_store.product_catalog.repository;

import com.furniture_store.product_catalog.entity.Product;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ProductRepository extends JpaRepository<Product, Long> {

    @Query("select p from Product p join fetch p.images where cast(:filters as boolean)")
    Page<Product> findAllWithFilters(String filters, Pageable page);

    @Query(nativeQuery = true, value = "select p.id as id, p.name as name, p.price as price, p.category as category, p.added_at as added_at" +
            " from product p left join product_keywords pk on p.id = pk.product_id" +
            " where (lower(p.name) like concat('%', lower(:key), '%')" +
            " or lower(pk.keywords) = lower(:key)) and cast(:filters as boolean)")
    Page<Product> findAllByContainsKey(String key, String filters, Pageable page);

}
