package com.furniture.authentication_service.service;

import com.furniture.authentication_service.dto.LoginRequest;
import com.furniture.authentication_service.dto.RefreshTokenRequest;
import com.furniture.authentication_service.dto.RegisterRequest;
import com.furniture.authentication_service.dto.TokenResponse;
import com.furniture.authentication_service.exception.CustomException;
import com.furniture.authentication_service.model.Token;
import com.furniture.authentication_service.model.Person;
import com.furniture.authentication_service.repository.TokenRepository;
import com.furniture.authentication_service.repository.PersonRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.Instant;

@Service
public class AuthService {

    private final PersonRepository personRepository;
    private final TokenService tokenService;
    private final PasswordEncoder passwordEncoder;
    private final NotificationServiceClient notificationServiceClient;
    private final TokenRepository tokenRepository;

    public AuthService(PersonRepository personRepository, TokenService tokenService, PasswordEncoder passwordEncoder, NotificationServiceClient notificationServiceClient, TokenRepository tokenRepository) {
        this.personRepository = personRepository;
        this.tokenService = tokenService;
        this.passwordEncoder = passwordEncoder;
        this.notificationServiceClient = notificationServiceClient;
        this.tokenRepository = tokenRepository;
    }

    public String register(RegisterRequest request) {
        if (personRepository.existsByEmail(request.getEmail())) {
            throw new CustomException("Email already registered");
        }
        request.cleanFieldsFromExtraSpaces();

        Person person = new Person();
        person.setName(request.getName());
        person.setPhone(request.getPhone());
        person.setEmail(request.getEmail());
        person.setPasswordHash(passwordEncoder.encode(request.getPassword()));

        personRepository.save(person);
        String verificationRefreshToken = tokenService.generateRefreshToken(person);
        notificationServiceClient.sendVerificationEmail(person.getEmail(), verificationRefreshToken);
        return verificationRefreshToken;
    }

    public String verifyUser(String verificationRefreshToken) {
        Token verificationToken = tokenRepository.findByRefreshToken(verificationRefreshToken)
                .orElseThrow(() -> new CustomException("Invalid verification token"));

        if (verificationToken.getExpiresAt().isBefore(Instant.now())) {
            throw new CustomException("Verification token has expired");
        }

        Person person = verificationToken.getPerson();
        if (person.isEmailVerified()) {
            return "User is already verified.";
        }

        person.setEmailVerified(true);
        personRepository.save(person);

        tokenRepository.delete(verificationToken);

        return "User successfully verified.";
    }

    public TokenResponse login(LoginRequest request) {
        Person person = personRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new CustomException("Invalid credentials"));

        if (!person.isEmailVerified()) {
            throw new CustomException("Email is not verified. Please check your email.");
        }

        if (!passwordEncoder.matches(request.getPassword(), person.getPasswordHash())) {
            throw new CustomException("Invalid credentials");
        }

        String accessToken = tokenService.generateAccessToken(person);
        String refreshToken = tokenService.generateRefreshToken(person);
        return new TokenResponse(accessToken, refreshToken);
    }

    public TokenResponse newTokens(RefreshTokenRequest request) {
        return tokenService.updateTokens(request.getRefreshToken());
    }

    public void processForgotPassword(String personId) {
        Person person = personRepository.findById(personId)
                .orElseThrow(() -> new CustomException("User not found"));

        String email = person.getEmail();
        if (email == null || email.isEmpty()) {
            throw new CustomException("User does not have a registered email");
        }

        String refreshToken = tokenService.generateRefreshToken(person);

        String resetLink = "https://yourapp.com/reset-password?token=" + refreshToken;
        notificationServiceClient.sendPasswordResetEmail(email, resetLink);
    }

    public void resetPassword(String token, String newPassword) {
        Token resetToken = tokenRepository.findByRefreshToken(token)
                .orElseThrow(() -> new CustomException("Invalid or expired reset token"));

        if (resetToken.getExpiresAt().isBefore(Instant.now())) {
            throw new CustomException("Reset token has expired");
        }

        Person person = resetToken.getPerson();
        person.setPasswordHash(passwordEncoder.encode(newPassword));
        personRepository.save(person);
    }

    public void logout(String token) {
        tokenService.invalidateToken(token);
    }
}