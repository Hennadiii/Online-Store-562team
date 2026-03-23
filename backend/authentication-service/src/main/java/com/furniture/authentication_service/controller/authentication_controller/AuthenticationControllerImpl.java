package com.furniture.authentication_service.controller.authentication_controller;

import com.furniture.authentication_service.dto.ForgotPasswordRequest;
import com.furniture.authentication_service.dto.LoginRequest;
import com.furniture.authentication_service.dto.RegisterRequest;
import com.furniture.authentication_service.dto.TokenResponse;
import com.furniture.authentication_service.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthenticationControllerImpl implements AuthenticationController {

    private final AuthService authService;

    public AuthenticationControllerImpl(AuthService authService) {
        this.authService = authService;
    }

    @Override
    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterRequest request) {
        authService.register(request);
        return ResponseEntity.ok("User registered successfully");
    }

    @Override
    @PostMapping("/admin-register")
    public ResponseEntity<String> adminRegister(@RequestBody RegisterRequest request) {
        authService.adminRegister(request);
        return ResponseEntity.ok("Admin registered successfully");
    }

    @Override
    @PostMapping("/resend-verification")
    public ResponseEntity<String> resendVerificationLink(@RequestBody LoginRequest request) {
        authService.resendVerificationLink(request);
        return ResponseEntity.ok("Verification link sent");
    }

    @Override
    @PostMapping("/login")
    public ResponseEntity<TokenResponse> login(@RequestBody LoginRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }

    @Override
    @PostMapping("/forgot-password")
    public ResponseEntity<String> forgotPassword(@RequestBody ForgotPasswordRequest request) {
        authService.processForgotPassword(request.getEmail());
        return ResponseEntity.ok("Password reset link sent to email.");
    }
}
