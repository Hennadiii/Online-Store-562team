package com.furniture.authentication_service.controller;

import com.furniture.authentication_service.dto.*;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "API сервісу аутентифікації", description = "Операції для аутентифікації користувача і оновлення даних входу")
public interface AuthController {

    @Operation(summary = "Реєстрація",
            description = "Створює акаунт з указаними даними")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Реєстрація пройшла успішно"),
            @ApiResponse(responseCode = "401", description = "Неправильні дані")
    })
    @PostMapping("/register")
    ResponseEntity<String> register(@RequestBody RegisterRequest request);

    @Operation(summary = "Реєстрація",
            description = "Створює акаунт з указаними даними")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Верифікація пройшла успішно"),
            @ApiResponse(responseCode = "401", description = "Токен відсутній"),
            @ApiResponse(responseCode = "500", description = "Невірний токен")
    })
    @GetMapping("/verify")
    ResponseEntity<String> verifyUser(@RequestBody RefreshTokenRequest request);

    @Operation(summary = "Логін",
            description = "Авторизує користувача та повертає токени доступу")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Успішний вхід"),
            @ApiResponse(responseCode = "401", description = "Невірні облікові дані")
    })
    @PostMapping("/login")
    ResponseEntity<TokenResponse> login(@RequestBody LoginRequest request);

    @Operation(summary = "Оновлення токенів",
            description = "Оновлює токени доступу за допомогою refresh токену")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Токени успішно оновлені"),
            @ApiResponse(responseCode = "401", description = "Відсутній refresh токен"),
            @ApiResponse(responseCode = "500", description = "Невірний refresh токен")
    })
    @PostMapping("/update-tokens")
    ResponseEntity<TokenResponse> updateTokens(@RequestBody RefreshTokenRequest request);

    @Operation(summary = "Вихід з системи",
            description = "Видаляє refresh токен користувача")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Успішний вихід"),
            @ApiResponse(responseCode = "401", description = "Токен відсутній")
    })
    @PostMapping("/logout")
    ResponseEntity<String> logout(@RequestBody RefreshTokenRequest request);

    @Operation(summary = "Забули пароль",
            description = "Надсилає листа з інструкцією для скидання пароля")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Лист відправлено"),
            @ApiResponse(responseCode = "500", description = "Користувача не знайдено")
    })
    @PostMapping("/forgot-password")
    ResponseEntity<String> forgotPassword(@RequestBody ForgotPasswordRequest request);

    @Operation(summary = "Скидання пароля",
            description = "Скидає пароль і видає нові токени")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Пароль успішно скинуто"),
            @ApiResponse(responseCode = "401", description = "Невірний токен або запит"),
            @ApiResponse(responseCode = "500", description = "Токен не знайдено")
    })
    @PostMapping("/reset-password")
    ResponseEntity<TokenResponse> resetPassword(@RequestBody ResetPasswordRequest request);

    @Operation(summary = "Отримати користувача за ID",
            description = "Повертає інформацію про користувача за вказаним ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Користувача знайдено"),
            @ApiResponse(responseCode = "500", description = "Користувача не знайдено")
    })
    @GetMapping("/user/{id}")
    ResponseEntity<PersonResponse> getUserById(@PathVariable String id);

    @Operation(summary = "Отримати всіх користувачів",
            description = "Повертає список всіх користувачів")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Список користувачів отримано")
    })
    @GetMapping("/allUsers")
    ResponseEntity<List<PersonResponse>> getAllUsers();

    @Operation(summary = "Оновлення email",
            description = "Оновлює email користувача та надсилає лист для підтвердження")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Email оновлено, підтвердження надіслано"),
            @ApiResponse(responseCode = "401", description = "Некоректний запит"),
            @ApiResponse(responseCode = "500", description = "Користувача не знайдено")
    })
    @PatchMapping("/updateEmail/{email}")
    ResponseEntity<String> updateEmail(
            @PathVariable String email,
            @RequestBody @Valid UpdateEmailRequest request);

    @Operation(summary = "Підтвердження email",
            description = "Підтверджує зміну email користувача")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Email підтверджено"),
            @ApiResponse(responseCode = "500", description = "Невірний токен підтвердження")
    })
    @GetMapping("/verify-email")
    ResponseEntity<String> verifyEmail(@RequestBody UpdateEmailResponse updateEmailResponse);

    @Operation(summary = "Блокування користувача",
            description = "Блокує користувача за ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Користувача заблоковано"),
            @ApiResponse(responseCode = "500", description = "Користувача не знайдено")
    })
    @PatchMapping("/block/{id}")
    ResponseEntity<String> blockUser(@PathVariable String id);

    @Operation(summary = "Видалення користувача",
            description = "Видаляє користувача за ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Користувача видалено"),
            @ApiResponse(responseCode = "404", description = "Користувача не знайдено")
    })
    @DeleteMapping("/delete/{id}")
    ResponseEntity<String> deleteUserById(@PathVariable String id);
}
