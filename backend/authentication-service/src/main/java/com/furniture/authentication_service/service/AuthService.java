package com.furniture.authentication_service.service;

import com.furniture.authentication_service.dto.*;
import com.furniture.authentication_service.exception.CustomException;
import com.furniture.authentication_service.model.Role;
import com.furniture.authentication_service.model.Person;
import com.furniture.authentication_service.repository.TokenRepository;
import com.furniture.authentication_service.repository.PersonRepository;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class AuthService {

    private final PersonRepository personRepository;
    private final TokenService tokenService;
    private final PasswordEncoder passwordEncoder;
    private final NotificationServiceClient notificationServiceClient;
    private final TokenRepository tokenRepository;
    private static final String USER_NOT_FOUND = "User not found";
    private static final String RESET_PASSWORD_LINK = "https://online-Store-562.com/reset-password?token=";

    public AuthService(PersonRepository personRepository, TokenService tokenService, PasswordEncoder passwordEncoder, NotificationServiceClient notificationServiceClient, TokenRepository tokenRepository) {
        this.personRepository = personRepository;
        this.tokenService = tokenService;
        this.passwordEncoder = passwordEncoder;
        this.notificationServiceClient = notificationServiceClient;
        this.tokenRepository = tokenRepository;
    }

    public void register(RegisterRequest request) {
        if (personRepository.existsByEmail(request.getEmail())) {
            throw new CustomException("Цей акаунт вже використовується");
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
            throw new CustomException("Цей акаунт вже використовується");
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
        Person person = getPersonFromHeader(authHeader);

        if (person.isEmailVerified()) {
            return "Person is already verified.";
        }
        person.setEmailVerified(true);
        personRepository.save(person);
        return "Person verified successfully";
    }

    public TokenResponse login(LoginRequest request) {
        Person person = getPersonByEmail(request.getEmail());

        //перевірити логін та пароль і тоді перревіряти валідність користувача
        if (!person.isEmailVerified()) {
            throw new CustomException("Акаунт не верифікований. Будь ласка, перевірте Ваш email");
        }

        if (!passwordEncoder.matches(request.getPassword(), person.getPasswordHash())) {
            throw new CustomException("Невірний пароль");
        }

        if (person.isBlocked()) {
            throw new CustomException("Ваш акаунт заблоковано");
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

        String resetLink = RESET_PASSWORD_LINK + refreshToken;
        notificationServiceClient.sendPasswordResetEmail(email, resetLink);
    }

    public void resetPassword(String authHeader, String newPassword) {
        Person person = getPersonFromHeader(authHeader);
        person.setPasswordHash(passwordEncoder.encode(newPassword));
        personRepository.save(person);
    }

    public void logout(String authHeader) {
        String refreshToken = authHeader.substring(7);
        tokenService.invalidateToken(refreshToken);
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

    public void updateEmail(String authHeader, String email, String newEmail) {
        Person person = getPersonByEmail(email);

        if (!person.getId().equalsIgnoreCase(tokenService.getUserIdFromToken(authHeader.substring(7)))) {
            throw new CustomException("User can change the own email only");
        }

        if (personRepository.existsByEmail(newEmail)) {
            throw new CustomException("Email already in use");
        }

        String verificationEmailToken = tokenService.generateRefreshToken(person);

        // Відправляє на електронну пошту лист з посиланням дя верифікації
        notificationServiceClient.sendVerificationEmail(newEmail, verificationEmailToken);
    }

    public void verifyNewEmail(String authHeader, String newEmail) {
        Person person = getPersonFromHeader(authHeader);
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

    private Person getPersonFromHeader(String authHeader) {
        String token = authHeader.substring(7);
        return personRepository.findById(tokenService.getUserIdFromToken(token))
                .orElseThrow(() -> new CustomException(USER_NOT_FOUND));
    }

}