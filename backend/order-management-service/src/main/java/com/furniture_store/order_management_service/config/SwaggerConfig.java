package com.furniture_store.order_management_service.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI openAPI() {
        return new OpenAPI().
                info(new Info().
                        title("Сервіс керування замовленнями")
                        .summary("Ендпоінти для керування замовленнями")
                        .description("API-документація мікросервісу керування замовленнями," +
                                " що дозволяє" +
                                " додавати, отримувати, та модифікувати замовлення."))
                .addServersItem(new Server()
                        .url("http://localhost:564")
                        .description("Local development server"));
    }
}
