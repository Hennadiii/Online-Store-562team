package com.furniture.authentication_service.controller.impl;

import com.furniture.authentication_service.controller.AuthController;
import com.furniture.authentication_service.dto.*;
import com.furniture.authentication_service.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Transactional
@RequestMapping("/auth")
public class AuthControllerImpl implements AuthController {

    private final AuthService authService;

    public AuthControllerImpl(AuthService authService) {
        this.authService = authService;
    }

    @Override
    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterRequest request) {
        String confirmRefreshToken = authService.register(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(confirmRefreshToken);
    }

    @Override
    @GetMapping("/verify")
    public ResponseEntity<String> verifyUser(@RequestBody RefreshTokenRequest request) {
        String confirmVerificationResponse = authService.verifyUser(request.getRefreshToken());
        return ResponseEntity.ok(confirmVerificationResponse);
    }

    @Override
    @PostMapping("/login")
    public ResponseEntity<TokenResponse> login(@RequestBody LoginRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }

    @Override
    @PostMapping("/update-tokens")
    public ResponseEntity<TokenResponse> updateTokens(@RequestBody RefreshTokenRequest request) {
        return ResponseEntity.ok(authService.newTokens(request));
    }

    @Override
    @PostMapping("/logout")
    public ResponseEntity<String> logout(@RequestBody RefreshTokenRequest request) {
        authService.logout(request.getRefreshToken());
        return ResponseEntity.ok("Logged out successfully.");
    }

    @Override
    @PostMapping("/forgot-password")
    public ResponseEntity<String> forgotPassword(@RequestBody ForgotPasswordRequest request) {
        authService.processForgotPassword(request.getEmail());
        return ResponseEntity.ok("Password reset link sent to email.");
    }

    @Override
    @PostMapping("/reset-password")
    public ResponseEntity<TokenResponse> resetPassword(@RequestBody ResetPasswordRequest request) {
        authService.resetPassword(request.getRefreshToken(), request.getNewPassword());
        return ResponseEntity.ok(authService.newTokens(new RefreshTokenRequest(request.getRefreshToken())));
    }

    @Override
    @GetMapping("/user/{id}")
    public ResponseEntity<PersonResponse> getUserById(@PathVariable String id) {
        PersonResponse personResponse = authService.getUserById(id);
        return ResponseEntity.ok(personResponse);
    }

    @Override
    @GetMapping("/allUsers")
    public ResponseEntity<List<PersonResponse>> getAllUsers() {
        List<PersonResponse> users = authService.getAllUsers();
        return ResponseEntity.ok(users);
    }


    @Override
    @PatchMapping("/updateEmail/{email}")
    public ResponseEntity<String> updateEmail(
            @PathVariable String email,
            @RequestBody @Valid UpdateEmailRequest request) {

        authService.updateEmail(email, request.getNewEmail());
        return ResponseEntity.ok("Verification code successfully sent to new email");
    }

    @Override
    @GetMapping("/verify-email")
    public ResponseEntity<String> verifyEmail(
            @RequestBody UpdateEmailResponse updateEmailResponse) {

        authService.verifyNewEmail(updateEmailResponse.getVerificationEmailToken(), updateEmailResponse.getNewEmail());
        return ResponseEntity.ok("Your email has been successfully updated");
    }

    @Override
    @PatchMapping("/block/{id}")
    public ResponseEntity<String> blockUser(@PathVariable String id) {
        authService.blockUserById(id);
        return ResponseEntity.ok("User with ID " + id + " has been blocked.");
    }

    @Override
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteUserById(@PathVariable String id) {
        authService.deleteUserById(id);
        return ResponseEntity.ok("User with ID " + id + " has been deleted.");
    }

    // google OAuth

    // reCapture
}