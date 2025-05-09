package com.furniture_store.product_catalog.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI openAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Каталог товарів")
                        .summary("Реалізує CRUD операції для роботи з товарами.")
                        .description("API-документація мікросервісу Каталог товарів," +
                                " що дозволяє" +
                                " додавати, отримувати, модифікувати та видаляти товари.")
                )
                .addServersItem(new Server()
                                .url("http://localhost:562")
                                .description("Local development server")
                        )
                ;
    }
}
