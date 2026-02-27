package com.furniture_store.product_catalog.service;

import com.furniture_store.product_catalog.dto.ProductDto;
import com.furniture_store.product_catalog.entity.Category;
import com.furniture_store.product_catalog.entity.Image;
import com.furniture_store.product_catalog.entity.Producer;
import com.furniture_store.product_catalog.entity.Product;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ProductDtoConverter {

    public Product convertToEntity(ProductDto dto) {
        Product product = new Product();
        product.setId(dto.getId());
        product.setName(dto.getTitle()); // title из фронта -> name в базу
        product.setPrice(dto.getPrice());
        product.setDescription(dto.getDescription());
        product.setFullDescription(dto.getFullDescription());
        product.setPopular(dto.getPopular());

        // Маппим характеристики "вглубь"
        if (dto.getCharacteristics() != null) {
            product.setMaterial(dto.getCharacteristics().getMaterial());
            product.setUpholstery(dto.getCharacteristics().getUpholstery());
            product.setFunctionality(dto.getCharacteristics().getFunctionality());
        }

        if (dto.getCategory() != null) {
            product.setCategory(new Category(dto.getCategory()));
        }
        
        // Превращаем строки-ссылки в объекты Image
        if (dto.getImages() != null) {
            product.setImages(dto.getImages().stream()
                    .map(url -> new Image(url)) // Нужен конструктор в Image(String url)
                    .toList());
        }
        
        return product;
    }

    public ProductDto convertToDto(Product product) {
        return ProductDto.builder()
                .id(product.getId())
                .title(product.getName()) // name из базы -> title для фронта
                .price(product.getPrice())
                .description(product.getDescription())
                .fullDescription(product.getFullDescription())
                .popular(product.getPopular())
                .category(product.getCategory() != null ? product.getCategory().getName() : null)
                // Собираем объект характеристик
                .characteristics(ProductDto.CharacteristicsDto.builder()
                        .material(product.getMaterial())
                        .upholstery(product.getUpholstery())
                        .functionality(product.getFunctionality())
                        .build())
                // Превращаем объекты Image обратно в список строк-URL
                .images(product.getImages().stream()
                        .map(Image::getUrl) // В классе Image должен быть метод getUrl()
                        .toList())
                .build();
    }
}