package com.furniture_store.product_catalog.dto;

import jakarta.validation.constraints.NotBlank;
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
public class  ProductDto {

    private Long id;
    @NotBlank
    private String name;
    private Float price;
    private String description;
    private String category;
    private String producer;
    private List<byte[]> images = new ArrayList<>();
    private List<String> keywords = new ArrayList<>();

}
