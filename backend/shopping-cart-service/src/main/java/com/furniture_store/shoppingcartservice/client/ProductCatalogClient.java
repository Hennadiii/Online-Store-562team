package com.furniture_store.shoppingcartservice.client;

import com.furniture_store.shoppingcartservice.client.dto.ProductCatalogResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;

@Slf4j
@Component
@RequiredArgsConstructor
public class ProductCatalogClient {

    private final WebClient webClient;

    @Value("${product-catalog.base-url}")
    private String baseUrl;

    public ProductCatalogResponse getProductById(Long productId) {
        try {
            return webClient.get()
                    .uri(baseUrl + "/products/{id}", productId)
                    .retrieve()
                    .bodyToMono(ProductCatalogResponse.class)
                    .block();
        } catch (WebClientResponseException.NotFound e) {
            log.error("Product with id {} not found in product-catalog-service", productId);
            throw new RuntimeException("Product not found: " + productId);
        } catch (Exception e) {
            log.error("Error calling product-catalog-service for product id {}: {}", productId, e.getMessage());
            throw new RuntimeException("product-catalog-service is unavailable");
        }
    }
}