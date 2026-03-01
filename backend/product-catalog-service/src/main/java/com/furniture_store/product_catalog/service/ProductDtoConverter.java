package com.furniture_store.product_catalog.service;

import com.furniture_store.product_catalog.dto.ProductDto;
import com.furniture_store.product_catalog.entity.Category;
import com.furniture_store.product_catalog.entity.Image;
import com.furniture_store.product_catalog.entity.Producer;
import com.furniture_store.product_catalog.entity.Product;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductDtoConverter {

    public Product convertToEntity(ProductDto dto) {
        if (dto == null) return null;
        
        Product product = new Product();
        product.setId(dto.getId());
        product.setName(dto.getTitle()); // title из фронта -> name в базу
        product.setPrice(dto.getPrice());
        product.setDescription(dto.getDescription());
        product.setFullDescription(dto.getFullDescription());
        product.setPopular(dto.getPopular() != null ? dto.getPopular() : false);

        // Маппинг характеристик
        if (dto.getCharacteristics() != null) {
            product.setMaterial(dto.getCharacteristics().getMaterial());
            product.setUpholstery(dto.getCharacteristics().getUpholstery());
            product.setFunctionality(dto.getCharacteristics().getFunctionality());
        }

        // Категория и Производитель создаются как объекты "заглушки" (Manager их потом уточнит)
        if (dto.getCategory() != null) {
            product.setCategory(new Category(dto.getCategory()));
        }
        if (dto.getProducer() != null) {
            product.setProducer(new Producer(dto.getProducer()));
        }

        // Превращаем строки-URL в объекты Image
        if (dto.getImages() != null) {
            List<Image> imageEntities = dto.getImages().stream()
                    .map(Image::new) // Используем конструктор Image(String url)
                    .collect(Collectors.toList());
            product.setImages(imageEntities);
        }

        return product;
    }

    public ProductDto convertToDto(Product product) {
        if (product == null) return null;

        return ProductDto.builder()
                .id(product.getId())
                .title(product.getName()) // name из базы -> title для фронта
                .price(product.getPrice())
                .description(product.getDescription())
                .fullDescription(product.getFullDescription())
                .popular(product.getPopular())
                .category(product.getCategory() != null ? product.getCategory().getName() : null)
                .producer(product.getProducer() != null ? product.getProducer().getName() : null)
                // Собираем вложенный объект характеристик
                .characteristics(ProductDto.CharacteristicsDto.builder()
                        .material(product.getMaterial())
                        .upholstery(product.getUpholstery())
                        .functionality(product.getFunctionality())
                        .build())
                // Стримим URL картинок из объектов Image
                .images(product.getImages() != null ? 
                        product.getImages().stream().map(Image::getUrl).collect(Collectors.toList()) : 
                        new ArrayList<>())
                .build();
    }
}