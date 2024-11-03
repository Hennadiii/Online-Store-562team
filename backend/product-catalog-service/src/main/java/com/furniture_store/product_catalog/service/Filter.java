package com.furniture_store.product_catalog.service;

import lombok.Builder;

/**
 * Інкапсульовані параметри фільтрації
 *
 * @param category
 * @param minPrice
 * @param maxPrice
 * @param producer
 */
@Builder
public record Filter(String category, Float minPrice, Float maxPrice, String producer){

}
