package com.furniture_store.product_catalog.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

    // Локально: http://localhost:8080 (значення за замовчуванням)
    // На Render: задати змінну оточення APP_SERVER_URL=https://your-service.onrender.com
    @Value("${app.server-url:http://localhost:8080}")
    private String serverUrl;

    @Bean
    public OpenAPI openAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Каталог товарів")
                        .summary("CRUD операції для роботи з товарами")
                        .description("API-документація мікросервісу каталогу товарів"))
                .addServersItem(new Server()
                        .url(serverUrl)
                        .description("Server"));
    }
}