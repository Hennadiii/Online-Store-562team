package com.furniture_store.product_catalog.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductDto {

    private Long id;

    @NotBlank(message = "Title is mandatory")
    private String title; // Было name -> стало title для фронта

    @NotNull(message = "Price is mandatory")
    private Float price;

    private String description;
    
    private String fullDescription; // Новое поле

    private String category;

    private Boolean popular; // Новое поле

    // Теперь это список ссылок (URL), а не тяжелые байты
    @Builder.Default
    private List<String> images = new ArrayList<>();

    // Вложенный объект для характеристик
    private CharacteristicsDto characteristics;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class CharacteristicsDto {
        private String material;
        private String upholstery;
        private String functionality;
    }
}