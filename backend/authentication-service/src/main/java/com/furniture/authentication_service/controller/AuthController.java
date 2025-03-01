package com.furniture.authentication_service.controller;

import com.furniture.authentication_service.dto.*;
import com.furniture.authentication_service.service.AuthService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterRequest request) {
        String confirmRefreshToken = authService.register(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(confirmRefreshToken);
    }

    @GetMapping("/verify")
    public ResponseEntity<String> verifyUser(@RequestParam String requestToken) {
        String confirmVerificationResponse = authService.verifyUser(requestToken);
        return ResponseEntity.ok(confirmVerificationResponse);
    }

    @PostMapping("/login")
    public ResponseEntity<TokenResponse> login(@RequestBody LoginRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }

    @PostMapping("/update-tokens")
    public ResponseEntity<TokenResponse> updateTokens(@RequestBody RefreshTokenRequest request) {
        return ResponseEntity.ok(authService.newTokens(request));
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout(@RequestHeader("Authorization") String token) {
        authService.logout(token);
        return ResponseEntity.ok("Logged out successfully.");
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<String> forgotPassword(@RequestBody ForgotPasswordRequest request) {
        authService.processForgotPassword(request.getEmail());
        return ResponseEntity.ok("Password reset link sent to email.");
    }

    @PostMapping("/reset-password")
    public ResponseEntity<TokenResponse> resetPassword(@RequestBody ResetPasswordRequest request) {
        authService.resetPassword(request.getToken(), request.getNewPassword());
        return ResponseEntity.ok(authService.newTokens(new RefreshTokenRequest(request.getToken())));
    }

    // google OAuth

    // reCapture

    // resetPassword

    // getId

    // changeEmail

    // getUsers

    // blockUser
}