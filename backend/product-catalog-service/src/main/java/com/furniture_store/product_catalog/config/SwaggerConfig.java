package com.furniture_store.product_catalog.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI openAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Каталог товарів")
                        .summary("CRUD операції для роботи з товарами")
                        .description("API-документація мікросервісу каталогу товарів"));
    }
}