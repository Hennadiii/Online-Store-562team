package com.example.productcatalogservice.controller;

import java.util.List;
import com.example.productcatalogservice.dto.category.CategoryRequest;
import com.example.productcatalogservice.dto.category.CategoryResponse;
import com.example.productcatalogservice.dto.mapper.ObjectMapper;
import com.example.productcatalogservice.model.Category;
import com.example.productcatalogservice.service.CategoryService;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/category")
public class CategoryController {
    private final CategoryService categoryService;
    private final ObjectMapper<Category, CategoryRequest, CategoryResponse> objectMapper;

    @Operation(summary = "create new category")
    @PostMapping
    @Valid
    public ResponseEntity<?> createNewCategory(@RequestBody @NotNull CategoryRequest category) {
        categoryService.save(objectMapper.toEntity(category));
        return ResponseEntity.ok().build();
    }

    @Operation(summary = "remove category")
    @DeleteMapping
    @Valid
    public ResponseEntity<?> deleteCategory(@RequestBody @NotNull CategoryRequest category) {
        categoryService.delete(objectMapper.toEntity(category));
        return ResponseEntity.ok().build();
    }

    @Operation(summary = "search in categories")
    @GetMapping("/{name}")
    @Valid
    public CategoryResponse getCategory(@PathVariable @NotNull String name) {
        return objectMapper.toResp(categoryService.findByNameContains(name));
    }

    @Operation(summary = "returns all categories")
    @GetMapping
    public List<CategoryResponse> getAllCategories() {
        return categoryService.findAll().stream().map(objectMapper::toResp).toList();
    }
}
