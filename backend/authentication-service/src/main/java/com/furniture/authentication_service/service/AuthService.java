package com.furniture.authentication_service.service;

import com.furniture.authentication_service.dto.*;
import com.furniture.authentication_service.exception.CustomException;
import com.furniture.authentication_service.model.Role;
import com.furniture.authentication_service.model.Token;
import com.furniture.authentication_service.model.Person;
import com.furniture.authentication_service.repository.TokenRepository;
import com.furniture.authentication_service.repository.PersonRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.Instant;
import java.util.List;

@Service
public class AuthService {

    private final PersonRepository personRepository;
    private final TokenService tokenService;
    private final PasswordEncoder passwordEncoder;
    private final NotificationServiceClient notificationServiceClient;
    private final TokenRepository tokenRepository;
    private static final String USER_NOT_FOUND = "User not found";
    private static final String APP_LINK = "https://yourapp.com/verify?code=";

    public AuthService(PersonRepository personRepository, TokenService tokenService, PasswordEncoder passwordEncoder, NotificationServiceClient notificationServiceClient, TokenRepository tokenRepository) {
        this.personRepository = personRepository;
        this.tokenService = tokenService;
        this.passwordEncoder = passwordEncoder;
        this.notificationServiceClient = notificationServiceClient;
        this.tokenRepository = tokenRepository;
    }

    public void register(RegisterRequest request) {
        if (personRepository.existsByEmail(request.getEmail())) {
            throw new CustomException("Email already registered");
        }
        request.cleanFieldsFromExtraSpaces();

        Person person = new Person();
        person.setName(request.getName());
        person.setPhone(request.getPhone());
        person.setEmail(request.getEmail());
        person.setRole(Role.USER);
        person.setPasswordHash(passwordEncoder.encode(request.getPassword()));

        personRepository.save(person);
        String verificationRefreshToken = tokenService.generateRefreshToken(person);
        notificationServiceClient.sendVerificationEmail(person.getEmail(), verificationRefreshToken);
    }

    public void adminRegister(RegisterRequest request) {
        List<Person> personList = personRepository.findAllByRole(Role.ADMIN);

        // Check for a registered administrator
        if (personRepository.existsByEmail(request.getEmail()) || !personList.isEmpty()) {
            throw new CustomException("Email already registered");
        }
        register(request);

        // Assigning a role to an administrator
        Person admin = personRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new CustomException(USER_NOT_FOUND));
        admin.setRole(Role.ADMIN);
    }

    public void resendVerificationLink(LoginRequest request) {
        Person person = getPersonByEmail(request.getEmail());
        String verificationRefreshToken = tokenService.generateRefreshToken(person);
        notificationServiceClient.sendVerificationEmail(person.getEmail(), verificationRefreshToken);
    }

    public String verifyUser(String authHeader) {
        String verificationToken = authHeader.substring(7);

        Token verificationRefreshToken = tokenRepository.findByRefreshToken(verificationToken)
                .orElseThrow(() -> new CustomException("Invalid verification token"));

        if (verificationRefreshToken.getExpiresAt().isBefore(Instant.now())) {
            throw new CustomException("Verification token has expired");
        }

        Person person = verificationRefreshToken.getPerson();
        if (person.isEmailVerified()) {
            return "Person is already verified.";
        }

        person.setEmailVerified(true);
        personRepository.save(person);

        tokenRepository.delete(verificationRefreshToken);

        return "Person verified successfully";
    }

    public TokenResponse login(LoginRequest request) {
        Person person = getPersonByEmail(request.getEmail());
        //перевірити логін та пароль і тоді перревіряти валідність користувача
        if (!person.isEmailVerified()) {
            throw new CustomException("Email is not verified. Please check your email.");
        }

        if (!passwordEncoder.matches(request.getPassword(), person.getPasswordHash())) {
            throw new CustomException("Invalid credentials");
        }

        if (person.isBlocked()) {
            throw new CustomException("The user's been blocked");
        }

        String accessToken = tokenService.generateAccessToken(person);
        String refreshToken = tokenService.generateRefreshToken(person);
        return new TokenResponse(accessToken, refreshToken);
    }

    public TokenResponse newTokens(String authHeader) {
        return tokenService.updateTokens(authHeader);
    }

    public void processForgotPassword(String personId) {
        Person person = getPersonById(personId);

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

    public PersonResponse getUserById(String id) {
        Person person = getPersonById(id);

        return new PersonResponse(
                person.getId(),
                person.getName(),
                person.getEmail(),
                person.getPhone()
        );
    }

    public List<PersonResponse> getAllUsers() {
        List<Person> persons = personRepository.findAll();

        return persons.stream()
                .map(user -> new PersonResponse(
                        user.getId(),
                        user.getName(),
                        user.getEmail(),
                        user.getPhone()))
                .toList();
    }

    public void updateEmail(String email, String newEmail) {
        Person person = getPersonByEmail(email);

        if (personRepository.existsByEmail(newEmail)) {
            throw new CustomException("Email already in use");
        }

        String verificationEmailToken = tokenService.generateRefreshToken(person);

        // Sending a new email verification letter
        notificationServiceClient.sendVerificationEmail(newEmail, verificationEmailToken);
    }

    public void verifyNewEmail(String refreshToken, String newEmail) {
        Token verifyEmailToken = tokenRepository.findByRefreshToken(refreshToken)
                .orElseThrow(() -> new CustomException("Invalid or expired reset token"));

        if (verifyEmailToken.getExpiresAt().isBefore(Instant.now())) {
            throw new CustomException("Refresh token has expired");
        }

        Person person = verifyEmailToken.getPerson();
        person.setEmail(newEmail);
        personRepository.save(person);
    }

    public void blockUserById(String id) {
        Person person = getPersonById(id);

        if (person.isBlocked()) {
            throw new CustomException("User is already blocked.");
        }

        person.setBlocked(true);
        personRepository.save(person);
    }

    public void deleteUserById(String id) {
        if (!personRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, USER_NOT_FOUND);
        }
        tokenRepository.deleteByPersonId(id);
        personRepository.deleteById(id);
    }

    private Person getPersonById(String personId) {
        return personRepository.findById(personId)
                .orElseThrow(() -> new CustomException(USER_NOT_FOUND));
    }

    private Person getPersonByEmail(String email) {
        return personRepository.findByEmail(email)
                .orElseThrow(() -> new CustomException(USER_NOT_FOUND));
    }

    private void checkAdminAccess(TokenRequest request) {
        String refreshToken = request.getToken();
        String role = tokenService.getUserRoleFromToken(refreshToken);

        if (!tokenService.validateToken(refreshToken)) {
            throw new CustomException("Access token is deprecated");
        }

        if (!role.equalsIgnoreCase("ADMIN")) {
            throw new CustomException("For admin only");
        }
    }
}