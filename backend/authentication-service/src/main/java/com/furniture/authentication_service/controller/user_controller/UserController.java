package com.furniture.authentication_service.controller.user_controller;

import com.furniture.authentication_service.dto.PersonResponse;
import com.furniture.authentication_service.dto.ResetPasswordRequest;
import com.furniture.authentication_service.dto.TokenResponse;
import com.furniture.authentication_service.dto.UpdateEmailRequest;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

public interface UserController {

    @Operation(summary = "Отримати дані поточного користувача",
            security = @SecurityRequirement(name = "bearerAuth"),
            responses = {
                    @ApiResponse(responseCode = "200", description = "Дані користувача",
                            content = @Content(schema = @Schema(implementation = PersonResponse.class))),
                    @ApiResponse(responseCode = "403", description = "Невірний токен")
            })
    @GetMapping("/me")
    ResponseEntity<PersonResponse> getMe(@RequestHeader("Authorization") String authHeader);

    @Operation(summary = "Верифікація користувача",
            security = @SecurityRequirement(name = "bearerAuth"),
            responses = {
                    @ApiResponse(responseCode = "200", description = "Користувача успішно верифіковано"),
                    @ApiResponse(responseCode = "403", description = "Невірний, або відсутній токен")
            })
    @GetMapping("/verify")
    ResponseEntity<String> verifyUser(@RequestHeader("Authorization") String authHeader);

    @Operation(summary = "Оновлення токенів",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Токени успішно оновлено",
                            content = @Content(schema = @Schema(implementation = TokenResponse.class))),
                    @ApiResponse(responseCode = "403", description = "Невірний або відсутній токен")
            })
    @PostMapping("/update-tokens")
    ResponseEntity<TokenResponse> updateTokens(@RequestHeader("Authorization") String authHeader);

    @Operation(summary = "Вихід з системи",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Вихід успішний")
            })
    @PostMapping("/logout")
    ResponseEntity<String> logout(@RequestHeader("Authorization") String authHeader);

    @Operation(summary = "Скидання пароля",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Пароль скинуто"),
                    @ApiResponse(responseCode = "403", description = "Невірний токен")
            })
    @PostMapping("/reset-password")
    ResponseEntity<TokenResponse> resetPassword(
            @RequestHeader("Authorization") String authHeader,
            @RequestBody ResetPasswordRequest request);

    @Operation(summary = "Оновити email",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Код підтвердження надіслано"),
                    @ApiResponse(responseCode = "403", description = "Невірний токен")
            })
    @PatchMapping("/updateEmail/{email}")
    void updateEmail(
            @PathVariable String email,
            @RequestHeader("Authorization") String authHeader,
            @RequestBody @Valid UpdateEmailRequest request);

    @Operation(summary = "Підтвердження нового email",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Email успішно підтверджено"),
                    @ApiResponse(responseCode = "403", description = "Невірний токен")
            })
    @GetMapping("/verify-email")
    ResponseEntity<String> verifyEmail(
            @RequestHeader("Authorization") String authHeader,
            @RequestBody String newEmail);
}