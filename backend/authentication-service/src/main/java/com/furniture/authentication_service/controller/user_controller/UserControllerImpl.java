package com.furniture.authentication_service.controller.user_controller;

import com.furniture.authentication_service.dto.PersonResponse;
import com.furniture.authentication_service.dto.ResetPasswordRequest;
import com.furniture.authentication_service.dto.TokenResponse;
import com.furniture.authentication_service.dto.UpdateEmailRequest;
import com.furniture.authentication_service.service.AuthService;
import com.furniture.authentication_service.service.TokenService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.furniture.authentication_service.dto.UpdateProfileRequest;

@RestController
@RequestMapping("/user")
@Tag(name = "User API", description = "Операції керування авторизованими користувачами")
public class UserControllerImpl implements UserController {

    private final AuthService authService;
    private final TokenService tokenService;

    public UserControllerImpl(AuthService authService, TokenService tokenService) {
        this.authService = authService;
        this.tokenService = tokenService;
    }

    @Override
    @GetMapping("/me")
    public ResponseEntity<PersonResponse> getMe(@RequestHeader("Authorization") String authHeader) {
        String userId = tokenService.getUserIdFromToken(authHeader.substring(7));
        return ResponseEntity.ok(authService.getUserById(userId));
    }

    @Override
    @GetMapping("/verify")
    public ResponseEntity<String> verifyUser(@RequestHeader("Authorization") String authHeader) {
        return ResponseEntity.ok(authService.verifyUser(authHeader));
    }

    @Override
    @PostMapping("/update-tokens")
    public ResponseEntity<TokenResponse> updateTokens(@RequestHeader("Authorization") String authHeader) {
        return ResponseEntity.ok(authService.newTokens(authHeader));
    }

    @Override
    @PostMapping("/logout")
    public ResponseEntity<String> logout(@RequestHeader("Authorization") String authHeader) {
        authService.logout(authHeader);
        return ResponseEntity.ok("Logged out successfully.");
    }

    @Override
    @PostMapping("/reset-password")
    public ResponseEntity<TokenResponse> resetPassword(
            @RequestHeader("Authorization") String authHeader,
            @RequestBody ResetPasswordRequest request) {
        authService.resetPassword(authHeader, request.getNewPassword());
        return ResponseEntity.ok(authService.newTokens(authHeader));
    }

    @Override
    @PatchMapping("/updateEmail/{email}")
    public void updateEmail(
            @PathVariable String email,
            @RequestHeader("Authorization") String authHeader,
            @RequestBody @Valid UpdateEmailRequest request) {
        authService.updateEmail(authHeader, email, request.getNewEmail());
    }

    @Override
    @GetMapping("/verify-email")
    public ResponseEntity<String> verifyEmail(
            @RequestHeader("Authorization") String authHeader,
            @RequestBody String newEmail) {
        authService.verifyNewEmail(authHeader, newEmail);
        return ResponseEntity.ok("Your email has been successfully updated");
    }


    @Override
@PutMapping("/profile")
public ResponseEntity<PersonResponse> updateProfile(
        @RequestHeader("Authorization") String authHeader,
        @RequestBody @Valid UpdateProfileRequest request) {
    return ResponseEntity.ok(authService.updateProfile(authHeader, request));
}
}