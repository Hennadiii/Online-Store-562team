package com.example.productcatalogservice.dto.mapper;


import com.example.productcatalogservice.dto.category.CategoryRequest;
import com.example.productcatalogservice.dto.category.CategoryResponse;
import com.example.productcatalogservice.model.Category;
import org.springframework.stereotype.Component;

@Component
public class CategoryDtoMapperImpl
        implements ObjectMapper<Category, CategoryRequest, CategoryResponse> {
    @Override
    public Category toEntity(CategoryRequest categoryRequest) {
        Category category = new Category();
        category.setName(categoryRequest.getName());
        return category;
    }

    @Override
    public CategoryResponse toResp(Category category) {
        CategoryResponse categoryResponse = new CategoryResponse();
        category.setId(category.getId());
        category.setName(category.getName());
        return categoryResponse;
    }
}
