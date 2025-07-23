package com.furniture.authentication_service.controller;

import com.furniture.authentication_service.dto.*;
import com.furniture.authentication_service.service.AuthService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Transactional
@RequestMapping("/authentication")
@Tag(name = "Authentication API", description = "Операції для аутентифікації, авторизації та керування користувачами")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @Operation(summary = "Реєстрація користувача", description = "Реєструє нового користувача у системі з базовою роллю.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Користувача успішно зареєстровано"),
            @ApiResponse(responseCode = "400", description = "Користувач ввів невалідні дані"),
            @ApiResponse(responseCode = "409", description = "Користувач з таким email вже існує", content = @Content)
    })
    @PostMapping("/auth/register")
    public ResponseEntity<String> register(@RequestBody RegisterRequest request) {
        authService.register(request);
        return ResponseEntity.ok("User registered successfully");
    }

    @Operation(summary = "Реєстрація адміністратора", description = "Реєструє нового адміністратора з правами доступу.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Адміністратор успішно зареєстрований"),
            @ApiResponse(responseCode = "409", description = "Адміністратор з таким email вже існує", content = @Content)
    })
    @PostMapping("/auth/admin-register")
    public ResponseEntity<String> adminRegister(@RequestBody RegisterRequest request) {
        authService.adminRegister(request);
        return ResponseEntity.ok("Admin registered successfully");
    }

    @Operation(summary = "Повторна відправка листа верифікації",
            description = "Надсилає повторно email з посиланням на верифікацію.")
    @ApiResponse(responseCode = "200", description = "Посилання успішно надіслано")
    @PostMapping("/auth/resend-verification")
    public ResponseEntity<String> resendVerificationLink(@RequestBody LoginRequest request) {
        authService.resendVerificationLink(request);
        return ResponseEntity.ok("Verification link sent");
    }

    @Operation(summary = "Верифікація користувача", description = "Активує обліковий запис користувача за токеном.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Користувача успішно верифіковано"),
            @ApiResponse(responseCode = "403", description = "Невірний, або відсутній токен"),
            @ApiResponse(responseCode = "409", description = "Користувач вже верифікований"),
            @ApiResponse(responseCode = "410", description = "Токен протермінований")
    })
    @GetMapping("/user/verify")
    public ResponseEntity<String> verifyUser(@RequestHeader("Authorization") String authHeader) {
        String response = authService.verifyUser(authHeader);
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "Логін",
            description = "Аутентифікує користувача і повертає access та refresh токени у разі успішної авторизації."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Успішна авторизація",
                    content = @Content(schema = @Schema(implementation = TokenResponse.class))),
            @ApiResponse(responseCode = "400", description = """
                      Помилки:
                      - Невірний логін або пароль
                      - Електронну адресу не підтверджено
                      - Користувача заблоковано
                      """
            )
    })
    @PostMapping("/auth/login")
    public ResponseEntity<TokenResponse> login(@RequestBody LoginRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }

    @Operation(
            summary = "Оновлення токенів",
            description = "Оновлює access і refresh токени за допомогою refresh токена, переданого в заголовку Authorization."
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Токени успішно оновлено",
                    content = @Content(schema = @Schema(implementation = TokenResponse.class))
            ),
            @ApiResponse(responseCode = "403", description = """
                      Помилки:
                      - Невірний або відсутній токен
                      - Refresh токен протерміновано
                      """)
    })
    @PostMapping("/user/update-tokens")
    public ResponseEntity<TokenResponse> updateTokens(@RequestHeader("Authorization") String authHeader) {
        return ResponseEntity.ok(authService.newTokens(authHeader));
    }

    @Operation(summary = "Вихід з системи", description = "Видаляє refresh токен і завершує сесію користувача.")
    @ApiResponse(responseCode = "200", description = "Вихід успішний")
    @PostMapping("/user/logout")
    public ResponseEntity<String> logout(@RequestHeader("Authorization") String authHeader) {
        authService.logout(authHeader);
        return ResponseEntity.ok("Logged out successfully.");
    }

    @Operation(summary = "Забули пароль", description = "Надсилає листа з посиланням на скидання пароля.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Посилання надіслано"),
            @ApiResponse(responseCode = "404", description = "Email не знайдено")
    })
    @PostMapping("/auth/forgot-password")
    public ResponseEntity<String> forgotPassword(@RequestBody ForgotPasswordRequest request) {
        authService.processForgotPassword(request.getEmail());
        return ResponseEntity.ok("Password reset link sent to email.");
    }

    @Operation(summary = "Скидання пароля", description = "Скидає пароль користувача та повертає нові токени.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Пароль скинуто, токени оновлено",
                    content = @Content(schema = @Schema(implementation = TokenResponse.class))),
            @ApiResponse(responseCode = "403", description = """
                    Помилки:
                    - невірний, або відсутній токен
                    - токен протерміновано
                    """)
    })
    @PostMapping("/user/reset-password")
    public ResponseEntity<TokenResponse> resetPassword(
            @RequestHeader("Authorization") String authHeader,
            @RequestBody ResetPasswordRequest request) {
        authService.resetPassword(authHeader, request.getNewPassword());
        return ResponseEntity.ok(authService.newTokens(authHeader));
    }

    @Operation(summary = "Отримати користувача", description = "Отримує користувача за його ID")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Користувача знайдено",
                    content = @Content(schema = @Schema(implementation = PersonResponse.class))),
            @ApiResponse(responseCode = "403", description = """
                    Помилки:
                    - токен доступу адміна протерміновано
                    - доступ лише для адмінів
                    """),
            @ApiResponse(responseCode = "404", description = "Користувача не знайдено")
    })
    @GetMapping("/admin/user/{id}")
    public ResponseEntity<PersonResponse> getUserById(@PathVariable String id) {
        PersonResponse personResponse = authService.getUserById(id);
        return ResponseEntity.ok(personResponse);
    }

    @Operation(summary = "Отримати всіх користувачів", description = "Повертає список усіх користувачів")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Список користувачів успішно отримано"),
            @ApiResponse(responseCode = "403", description = """
                    Помилки:
                    - токен доступу адміна протерміновано
                    - доступ лише для адмінів
                    """)
    })
    @GetMapping("/admin/allUsers")
    public ResponseEntity<List<PersonResponse>> getAllUsers() {
        List<PersonResponse> users = authService.getAllUsers();
        return ResponseEntity.ok(users);
    }


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
                            content = @Content(schema = @Schema())
                    )})
    @PatchMapping("/user/updateEmail/{email}")
    public void updateEmail(
            @PathVariable String email,
            @RequestHeader("Authorization") String authHeader,
            @RequestBody @Valid UpdateEmailRequest request) {
        authService.updateEmail(authHeader, email, request.getNewEmail());
    }

    @Operation(summary = "Підтвердження нового email", description = "Підтверджує зміну email користувача за допомогою токена.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Email успішно підтверджено"),
            @ApiResponse(responseCode = "403", description = """
                    Помилки:
                    - невірний, або відсутній токен
                    - токен протерміновано
                    """
            ),
            @ApiResponse(responseCode = "404", description = "Користувача не знайдено")
    })
    @GetMapping("/user/verify-email")
    public ResponseEntity<String> verifyEmail(
            @RequestHeader("Authorization") String authHeader,
            @RequestBody String newEmail) {
        authService.verifyNewEmail(authHeader, newEmail);
        return ResponseEntity.ok("Your email has been successfully updated");
    }

    @Operation(summary = "Блокування користувача", description = "Блокує користувача за ID (тільки для адмінів).")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Користувача заблоковано"),
            @ApiResponse(responseCode = "401", description = "Користувача вже заблоковано"),
            @ApiResponse(responseCode = "403", description = """
                    Помилки:
                    - токен доступу адміна протерміновано
                    - доступ лише для адмінів
                    """),
            @ApiResponse(responseCode = "404", description = "Користувача не знайдено")
    })
    @PatchMapping("/admin/block/{id}")
    public ResponseEntity<String> blockUser(@PathVariable String id) {
        authService.blockUserById(id);
        return ResponseEntity.ok("User with ID " + id + " has been blocked.");
    }

    @Operation(summary = "Видалення користувача", description = "Видаляє користувача за ID (тільки для адмінів).")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Користувача видалено"),
            @ApiResponse(responseCode = "403", description = """
                    Помилки:
                    - токен доступу адміна протерміновано
                    - доступ лише для адмінів
                    """),
            @ApiResponse(responseCode = "404", description = "Користувача не знайдено")
    })
    @DeleteMapping("/admin/delete/{id}")
    public ResponseEntity<String> deleteUserById(@PathVariable String id) {
        authService.deleteUserById(id);
        return ResponseEntity.ok("User with ID " + id + " has been deleted.");
    }
}