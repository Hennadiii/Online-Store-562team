package com.example.productcatalogservice.controller;

import com.example.productcatalogservice.dto.mapper.ObjectMapper;
import com.example.productcatalogservice.dto.product.ProductRequest;
import com.example.productcatalogservice.dto.product.ProductResponse;
import com.example.productcatalogservice.model.Product;
import com.example.productcatalogservice.service.ProductService;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.annotation.Nullable;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@RestController
@RequestMapping("/products")
public class ProductController {
    private final ProductService productService;
    private final ObjectMapper<Product, ProductRequest, ProductResponse> objectMapper;

    @Operation(summary = "Find in products by filters, and contains pagination",
            description = """
Find in products by filters, and contains pagination
we can use both of parameters or one of parameters
""")
    @GetMapping("/")
    @Valid
    public List<ProductResponse> getProductsByFilter(
            @Nullable @RequestParam(required = false) Map<String, String> filter,
            @Nullable @RequestParam(required = false) Pageable pageable) {
        return productService.getProductsByFilter(filter, pageable)
                .stream()
                .map(objectMapper::toResp)
                .toList();
    }

    @Operation(summary = "Create new product",
            description = "Create a new product which can be updated")
    @PostMapping
    @Valid
    public ProductResponse addNewProduct(@RequestBody @NotNull ProductRequest product) {
        Product product1 = productService.saveProduct(objectMapper.toEntity(product));
        return objectMapper.toResp(product1);
    }

    @Operation(summary = "Create and add image to existing product",description = """
Create and add image to existing product entity requires
id in page path and file in body of request
""")
    @PostMapping("/{id}")
    @Valid
    public ResponseEntity<?> addImageToProduct(@PathVariable @NotNull Long id,
                                               @RequestBody @NotNull MultipartFile file) {
        productService.addImageToProduct(id, file);
        return ResponseEntity.ok().build();
    }

    @Operation(summary = "Remove and unlink image from product entity")
    @DeleteMapping("/{id}/image/{index}")
    @Valid
    public ResponseEntity<?> deleteImageFromProduct(@PathVariable @NotNull Long id,
                                                    @PathVariable @NotNull Integer index) {
        productService.removeImageFromProduct(id, index);
        return ResponseEntity.ok().build();
    }

    @Operation(summary = "update product")
    @PutMapping
    @Valid
    public ResponseEntity<?> updateProduct(@RequestBody @NotNull Product product) {
        productService.updateProduct(product);
        return ResponseEntity.ok().build();
    }
//  @note make this method to remove by id
    @Operation(summary = "delete product")
    @DeleteMapping
    @Valid
    public ResponseEntity<?> deleteProduct(@RequestBody @NotNull Product product) {
        productService.deleteProduct(product);
        return ResponseEntity.ok().build();
    }
}
