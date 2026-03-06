package com.furniture_store.product_catalog;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.servers.Server;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@OpenAPIDefinition(
    servers = {
        // Добавляем адрес твоего бэкенда на Render (замени на свой!)
        @Server(url = "https://online-store-562team.onrender.com", description = "Production Server"),
        // Оставляем локальный сервер для тестов дома
        @Server(url = "http://localhost:8080", description = "Local Server")
    }
)
@SpringBootApplication
public class ProductCatalogApplication {

    public static void main(String[] args) {
        SpringApplication.run(ProductCatalogApplication.class, args);
    }

}