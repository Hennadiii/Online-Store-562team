package com.furniture.authentication_service.controller.user_controller;

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

    @Operation(summary = "Верифікація користувача",
            description = "Активує обліковий запис користувача за токеном.",
            security = @SecurityRequirement(name = "bearerAuth"),
            responses = {
                    @ApiResponse(responseCode = "200", description = "Користувача успішно верифіковано"),
                    @ApiResponse(responseCode = "403", description = "Невірний, або відсутній токен"),
                    @ApiResponse(responseCode = "409", description = "Користувач вже верифікований"),
                    @ApiResponse(responseCode = "410", description = "Токен протермінований")
            })
    @GetMapping("/verify")
    ResponseEntity<String> verifyUser(@RequestHeader("Authorization") String authHeader);

    @Operation(
            summary = "Оновлення токенів",
            description = "Оновлює access і refresh токени за допомогою refresh токена, переданого в заголовку Authorization.",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Токени успішно оновлено",
                            content = @Content(schema = @Schema(implementation = TokenResponse.class))),
                    @ApiResponse(responseCode = "403", description = """
                            Помилки:
                            - Невірний або відсутній токен
                            - Refresh токен протерміновано
                            """)
            })
    @PostMapping("/update-tokens")
    ResponseEntity<TokenResponse> updateTokens(@RequestHeader("Authorization") String authHeader);

    @Operation(summary = "Вихід з системи",
            description = "Видаляє refresh токен і завершує сесію користувача.",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Вихід успішний"
                    )
            })
    @PostMapping("/logout")
    ResponseEntity<String> logout(@RequestHeader("Authorization") String authHeader);

    @Operation(summary = "Скидання пароля",
            description = "Скидає пароль користувача та повертає нові токени.",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Пароль скинуто, токени оновлено",
                            content = @Content(schema = @Schema(implementation = TokenResponse.class))),
                    @ApiResponse(responseCode = "403", description = """
                            Помилки:
                            - невірний, або відсутній токен
                            - токен протерміновано
                            """)
            })
    @PostMapping("/reset-password")
    ResponseEntity<TokenResponse> resetPassword(
            @RequestHeader("Authorization") String authHeader,
            @RequestBody ResetPasswordRequest request);

    @Operation(
            summary = "Оновити email",
            description = "Змінює email користувача та надсилає підтвердження на нову адресу.",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Код підтвердження надіслано"),
                    @ApiResponse(responseCode = "401", description = "Email вже використовується",
                            content = @Content(schema = @Schema())),
                    @ApiResponse(responseCode = "403", description = """
                                Помилки:
                                - невірний, або відсутній токен
                                - токен протерміновано
                                - користувач може змінювати лише власний email
                            """,
                            content = @Content(schema = @Schema())
                    ),
                    @ApiResponse(responseCode = "404", description = "Користувача не знайдено",
                            content = @Content(schema = @Schema()))
            })
    @PatchMapping("/updateEmail/{email}")
    void updateEmail(
            @PathVariable String email,
            @RequestHeader("Authorization") String authHeader,
            @RequestBody @Valid UpdateEmailRequest request);

    @Operation(summary = "Підтвердження нового email",
            description = "Підтверджує зміну email користувача за допомогою токена.",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Email успішно підтверджено"),
                    @ApiResponse(responseCode = "403", description = """
                            Помилки:
                            - невірний, або відсутній токен
                            - токен протерміновано
                            """
                    ),
                    @ApiResponse(responseCode = "404", description = "Користувача не знайдено")
            })
    @GetMapping("/verify-email")
    ResponseEntity<String> verifyEmail(
            @RequestHeader("Authorization") String authHeader,
            @RequestBody String newEmail);
}
