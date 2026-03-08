package com.furniture_store.shoppingcartservice.config;

import io.swagger.v3.oas.models.servers.Server;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

    // Локально: http://localhost:9080 (значение по умолчанию)
    // На Render: задать переменную окружения APP_SERVER_URL=https://your-service.onrender.com
    @Value("${app.server-url:http://localhost:9080}")
    private String serverUrl;

    @Bean
    public OpenAPI openApi() {
        return new OpenAPI()
                .info(new Info()
                        .title("Shopping cart")
                        .summary("Реалізує CRUD операції для роботи з кошиками.")
                        .description("API-документація мікросервісу Кошик, " +
                                "що дозволяє керувати кошиками.")
                )
                .addServersItem(new Server()
                        .url(serverUrl)
                        .description("Server")
                );
    }
}