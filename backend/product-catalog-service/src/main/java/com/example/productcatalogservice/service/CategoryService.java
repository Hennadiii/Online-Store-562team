package com.example.productcatalogservice.service;

import java.util.List;
import com.example.productcatalogservice.model.Category;
import org.springframework.stereotype.Service;

@Service
public interface CategoryService {
    Category findByNameContains(String name);
    void save(Category categoryName);
    void delete(Category category);
    List<Category> findAll();
}
