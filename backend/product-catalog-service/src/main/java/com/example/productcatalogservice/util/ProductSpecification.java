package com.example.productcatalogservice.util;

import com.example.productcatalogservice.model.Product;
import org.springframework.data.jpa.domain.Specification;

public interface ProductSpecification {
    static Specification<Product> hasName(String name) {
        return (product, criteriaQuery, criteriaBuilder) -> criteriaBuilder.like(product.get("name"), name);
    }
    static Specification<Product> hasMinPrice(Float minPrice) {
        return (product, criteriaQuery, criteriaBuilder) ->
                criteriaBuilder.greaterThanOrEqualTo(product.get("price"), minPrice)
             ;
    }

    static Specification<Product> hasMaxPrice(Float maxPrice) {
        return (product, criteriaQuery, criteriaBuilder) ->
                criteriaBuilder.lessThanOrEqualTo(product.get("price"), maxPrice);
    }

    static Specification<Product> hasCategory(String category) {
        return (product, criteriaQuery, criteriaBuilder) ->
                criteriaBuilder.equal(product.get("product.category.name"), category);
    }
}
