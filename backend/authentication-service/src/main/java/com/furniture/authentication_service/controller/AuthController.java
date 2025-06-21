package com.furniture.authentication_service.controller;

import com.furniture.authentication_service.dto.*;
import com.furniture.authentication_service.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;

import java.util.List;

@RestController
@Transactional
@RequestMapping("/authentication")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/auth/register")
    public ResponseEntity<String> register(@RequestBody RegisterRequest request) {
        authService.register(request);
        return ResponseEntity.ok("User registered successfully");
    }

    @PostMapping("/auth/admin-register")
    public ResponseEntity<String> adminRegister(@RequestBody RegisterRequest request) {
        authService.adminRegister(request);
        return ResponseEntity.ok("Admin registered successfully");
    }

    @PostMapping("/auth/resend-verification")
    public ResponseEntity<String> resendVerificationLink(@RequestBody LoginRequest request) {
        authService.resendVerificationLink(request);
        return ResponseEntity.ok("Verification link sent");
    }

    @GetMapping("/user/verify")
    public ResponseEntity<String> verifyUser(Authentication auth) {
        String response = authService.verifyUser(authHeader);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/auth/login")
    public ResponseEntity<TokenResponse> login(@RequestBody LoginRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }

    @PostMapping("/user/update-tokens")
    public ResponseEntity<TokenResponse> updateTokens(@RequestHeader("Authorization") String authHeader) {
        return ResponseEntity.ok(authService.newTokens(authHeader));
    }

    @PostMapping("/user/logout")
    public ResponseEntity<String> logout(@RequestHeader("Authorization") String authHeader) {
        authService.logout(authHeader);
        return ResponseEntity.ok("Logged out successfully.");
    }

    @PostMapping("/auth/forgot-password")
    public ResponseEntity<String> forgotPassword(@RequestBody ForgotPasswordRequest request) {
        authService.processForgotPassword(request.getEmail());
        return ResponseEntity.ok("Password reset link sent to email.");
    }

    @PostMapping("/user/reset-password")
    public ResponseEntity<TokenResponse> resetPassword(
            @RequestHeader("Authorization") String authHeader,
            @RequestBody ResetPasswordRequest request) {
        authService.resetPassword(authHeader, request.getNewPassword());
        return ResponseEntity.ok(authService.newTokens(authHeader));
    }

    @GetMapping("/admin/user/{id}")
    public ResponseEntity<PersonResponse> getUserById(@PathVariable String id) {
        PersonResponse personResponse = authService.getUserById(id);
        return ResponseEntity.ok(personResponse);
    }

    @GetMapping("/admin/allUsers")
    public ResponseEntity<List<PersonResponse>> getAllUsers() {
        List<PersonResponse> users = authService.getAllUsers();
        return ResponseEntity.ok(users);
    }


    @PatchMapping("/user/updateEmail/{email}")
    public ResponseEntity<String> updateEmail(
            @PathVariable String email,
            @RequestHeader("Authorization") String authHeader,
            @RequestBody @Valid UpdateEmailRequest request) {

        authService.updateEmail(email, request.getNewEmail(), authHeader);
        return ResponseEntity.ok("Verification code successfully sent to new email");
    }

    @GetMapping("/user/verify-email")
    public ResponseEntity<String> verifyEmail(
            @RequestHeader("Authorization") String authHeader,
            @RequestBody UpdateEmailResponse updateEmailResponse) {

        authService.verifyNewEmail(updateEmailResponse.getVerificationEmailToken(), updateEmailResponse.getNewEmail());
        return ResponseEntity.ok("Your email has been successfully updated");
    }

    @PatchMapping("/admin/block/{id}")
    public ResponseEntity<String> blockUser(@PathVariable String id) {
        authService.blockUserById(id);
        return ResponseEntity.ok("User with ID " + id + " has been blocked.");
    }

    @DeleteMapping("/admin/delete/{id}")
    public ResponseEntity<String> deleteUserById(@PathVariable String id) {
        authService.deleteUserById(id);
        return ResponseEntity.ok("User with ID " + id + " has been deleted.");
    }
}