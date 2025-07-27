package com.furniture.authentication_service.controller.admin_controller;

import com.furniture.authentication_service.dto.PersonResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "Admin API", description = "Керування акаунтами користувачів з боку адміна")
public interface AdminController {

    @Operation(summary = "Отримати користувача",
            description = "Отримує користувача за його ID",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Користувача знайдено",
                            content = @Content(schema = @Schema(implementation = PersonResponse.class))),
                    @ApiResponse(responseCode = "403", description = """
                            Помилки:
                            - токен доступу адміна протерміновано
                            - доступ лише для адмінів
                            """),
                    @ApiResponse(responseCode = "404", description = "Користувача не знайдено")
            })
    @GetMapping("/user/{id}")
    ResponseEntity<PersonResponse> getUserById(@PathVariable String id);

    @Operation(summary = "Отримати всіх користувачів",
            description = "Повертає список усіх користувачів",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Список користувачів успішно отримано"),
                    @ApiResponse(responseCode = "403", description = """
                            Помилки:
                            - токен доступу адміна протерміновано
                            - доступ лише для адмінів
                            """)
            })
    @GetMapping("/allUsers")
    ResponseEntity<List<PersonResponse>> getAllUsers();

    @Operation(summary = "Блокування користувача",
            description = "Блокує користувача за ID (тільки для адмінів).",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Користувача заблоковано"),
                    @ApiResponse(responseCode = "401", description = "Користувача вже заблоковано"),
                    @ApiResponse(responseCode = "403", description = """
                            Помилки:
                            - токен доступу адміна протерміновано
                            - доступ лише для адмінів
                            """),
                    @ApiResponse(responseCode = "404", description = "Користувача не знайдено")
            })
    @PatchMapping("/block/{id}")
    void blockUser(@PathVariable String id);

    @Operation(summary = "Видалення користувача",
            description = "Видаляє користувача за ID (тільки для адмінів).",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Користувача видалено"),
                    @ApiResponse(responseCode = "403", description = """
                            Помилки:
                            - токен доступу адміна протерміновано
                            - доступ лише для адмінів
                            """),
                    @ApiResponse(responseCode = "404", description = "Користувача не знайдено")
            })
    @DeleteMapping("/delete/{id}")
    void deleteUserById(@PathVariable String id);
}

