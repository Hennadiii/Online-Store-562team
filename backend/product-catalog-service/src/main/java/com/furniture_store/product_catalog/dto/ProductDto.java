package com.furniture_store.product_catalog.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
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

    @NotBlank(message = "Назва товару не може бути порожньою")
    private String title;

    @Positive(message = "Ціна повинна бути більше нуля")
    private Float price;

    private String description;
    private String fullDescription;

    @NotBlank(message = "Категорія не може бути порожньою")
    private String category;

    @NotBlank(message = "Виробник не може бути порожнім")
    private String producer;

    private Boolean popular;
    private List<String> images;

    @Valid
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