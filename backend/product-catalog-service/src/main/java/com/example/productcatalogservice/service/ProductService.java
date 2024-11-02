package com.example.productcatalogservice.service;

import com.example.productcatalogservice.model.Product;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;
import java.util.Map;

@Service
public interface ProductService {
    List<Product> getProductsByFilter(Map<String, String> query, Pageable pageable);
    Product saveProduct(Product product);
    void updateProduct(Product product);
    void addImageToProduct(Long productId, MultipartFile file);
    void removeImageFromProduct(Long productId, int imageIndex);
    void deleteProduct(Product product);
}