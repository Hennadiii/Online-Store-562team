package com.furniture_store.product_catalog.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductDto {
    private Long id;
    private String title;      // Это имя для фронта
    private Float price;
    private String description;
    private String fullDescription;
    private String category;
    private String producer;   // Возвращаем поле сюда!
    private Boolean popular;
    private List<String> images;
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