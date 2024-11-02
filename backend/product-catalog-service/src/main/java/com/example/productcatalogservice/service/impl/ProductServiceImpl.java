package com.example.productcatalogservice.service.impl;

import com.example.productcatalogservice.model.Product;
import com.example.productcatalogservice.repository.ProductRepository;
import com.example.productcatalogservice.service.ImageService;
import com.example.productcatalogservice.service.ProductService;
import com.example.productcatalogservice.util.ProductSpecification;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {
    private final ProductRepository productRepository;
    private final ImageService imageService;
    @Override
    public List<Product> getProductsByFilter(Map<String, String> filters, Pageable pageable) {
        Specification<Product> productSpecification = buildFilterSpecification(filters);
        if (pageable == null) {
            return productRepository.findAll(productSpecification);
        }
        return productRepository.findAll(productSpecification, pageable).getContent();
    }

    @Override
    public Product saveProduct(Product product) {
        return productRepository.save(product);
    }

    @Override
    public void updateProduct(Product product) {
        productRepository.save(product);
    }

    @Override
    public void addImageToProduct(Long productId, MultipartFile file) {
        Product product = productRepository.findById(productId).orElseThrow();
        product.getImages().add(imageService.save(file));
    }

    @Override
    public void removeImageFromProduct(Long productId, int imageIndex) {
        Product product = productRepository.findById(productId).orElseThrow();
        product.getImages().remove(imageIndex);
        updateProduct(product);
    }

    @Override
    public void deleteProduct(Product product) {
        productRepository.delete(product);
    }

    private Specification<Product> buildFilterSpecification(Map<String, String> filters) {
        Specification<Product> specification = Specification.where(null);

        if (filters == null || filters.isEmpty()) {
            return specification;
        }
        for (Map.Entry<String, String> filter : filters.entrySet()) {
            specification = switch (filter.getKey()) {
                case "name" -> specification.and(ProductSpecification.hasName(filter.getValue()));
                case "minPrice" -> specification.and(
                        ProductSpecification.hasMinPrice(
                                Float.parseFloat(filter.getValue())
                        )
                );
                case "maxPrice" -> specification.and(
                        ProductSpecification.hasMaxPrice(
                                Float.parseFloat(filter.getValue())
                        )
                );
                case "category" -> specification.and(
                        ProductSpecification.hasCategory(filter.getValue())
                );
                default -> specification;
            };

        }
        return specification;
    }
}
