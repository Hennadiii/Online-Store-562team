package com.example.productcatalogservice.service.impl;

import java.util.ArrayList;
import java.util.List;
import com.example.productcatalogservice.model.Category;
import com.example.productcatalogservice.repository.CategoryRepository;
import com.example.productcatalogservice.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {
    private final CategoryRepository categoryRepository;

    @Override
    public Category findByNameContains(String name) {
        return categoryRepository.findByNameContains(name);
    }

    @Override
    public void save(Category category) {
        categoryRepository.save(category);
    }

    @Override
    public void delete(Category category) {
        categoryRepository.delete(category);
    }

    @Override
    public List<Category> findAll() {
        return new ArrayList<>(categoryRepository.findAll());
    }
}
