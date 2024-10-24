package com.furniture_store.product_catalog.service;

import lombok.Builder;

@Builder
public record Filter(String category, Float minPrice, Float maxPrice, String producer){

}
