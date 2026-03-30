package com.furniture.authentication_service.controller.authentication_controller;

import com.furniture.authentication_service.dto.ForgotPasswordRequest;
import com.furniture.authentication_service.dto.LoginRequest;
import com.furniture.authentication_service.dto.RegisterRequest;
import com.furniture.authentication_service.dto.TokenResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@Tag(name = "Authentication API", description = "Операції для аутентифікації користувачамів")
public interface AuthenticationController {

    @Operation(summary = "Реєстрація користувача",
            description = "Реєструє нового користувача у системі з базовою роллю.",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Користувача успішно зареєстровано"),
                    @ApiResponse(responseCode = "400", description = "Користувач ввів невалідні дані"),
                    @ApiResponse(responseCode = "409", description = "Користувач з таким email вже існує", content = @Content)
            })
    @PostMapping("/register")
    ResponseEntity<String> register(@RequestBody RegisterRequest request);

    @Operation(summary = "Реєстрація адміністратора",
            description = "Реєструє нового адміністратора з правами доступу.",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Адміністратор успішно зареєстрований"),
                    @ApiResponse(responseCode = "409", description = "Адміністратор з таким email вже існує", content = @Content)
            })
    @PostMapping("/admin-register")
    ResponseEntity<String> adminRegister(@RequestBody RegisterRequest request);

    @Operation(summary = "Повторна відправка листа верифікації",
            description = "Надсилає повторно email з посиланням на верифікацію.",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Посилання успішно надіслано")
            })
    @PostMapping("/resend-verification")
    ResponseEntity<String> resendVerificationLink(@RequestBody LoginRequest request);

    @Operation(summary = "Логін",
            description = "Аутентифікує користувача і повертає access та refresh токени у разі успішної авторизації.",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Успішна авторизація",
                            content = @Content(schema = @Schema(implementation = TokenResponse.class))),
                    @ApiResponse(responseCode = "400", description = """
                            Помилки:
                            - Невірний логін або пароль
                            - Електронну адресу не підтверджено
                            - Користувача заблоковано
                            """)
            })
    @PostMapping("/login")
    ResponseEntity<TokenResponse> login(@RequestBody LoginRequest request);

    @Operation(summary = "Забули пароль",
            description = "Надсилає листа з посиланням на скидання пароля.",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Посилання надіслано"),
                    @ApiResponse(responseCode = "404", description = "Email не знайдено"
                    )
            })
    @PostMapping("/forgot-password")
    ResponseEntity<String> forgotPassword(@RequestBody ForgotPasswordRequest request);

}
