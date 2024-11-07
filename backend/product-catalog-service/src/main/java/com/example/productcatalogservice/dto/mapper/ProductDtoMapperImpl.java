package com.example.productcatalogservice.dto.mapper;

import com.example.productcatalogservice.dto.product.ProductRequest;
import com.example.productcatalogservice.dto.product.ProductResponse;
import com.example.productcatalogservice.model.Category;
import com.example.productcatalogservice.model.Product;
import lombok.RequiredArgsConstructor;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ProductDtoMapperImpl
        implements ObjectMapper<Product, ProductRequest, ProductResponse>{
    private final Environment environment;

    @Override
    public Product toEntity(ProductRequest productRequest) {
        Product product = new Product();
        product.setName(productRequest.getName());
        product.setDescription(productRequest.getDescription());
        product.setPrice(productRequest.getPrice());
        Category category = new Category();
        category.setName(productRequest.getCategory());
        product.setCategory(category);
        return product;
    }

    @Override
    public ProductResponse toResp(Product product) {
        String prefix = environment.getProperty("apiPrefix");
        ProductResponse productResponse = new ProductResponse();
        productResponse.setId(product.getId());
        productResponse.setName(product.getName());
        productResponse.setDescription(product.getDescription());
        productResponse.setPrice(product.getPrice());
        productResponse.setCategory(product.getCategory().getName());
        productResponse.setImageLinks(product
                .getImages()
                .stream()
                .map(img -> prefix + "/images/" + img.getId())
                .toList());
        return productResponse;
    }
}
