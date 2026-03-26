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
import java.util.UUID;

@Service
public class AuthService {

    private final PersonRepository personRepository;
    private final TokenService tokenService;
    private final PasswordEncoder passwordEncoder;
    private final NotificationServiceClient notificationServiceClient;
    private final TokenRepository tokenRepository;
    private static final String USER_NOT_FOUND = "User not found";
    private static final String RESET_PASSWORD_LINK = "https://online-Store-562.com/reset-password?token=";

    private static final boolean EMAIL_VERIFICATION_ENABLED = false;

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
        person.setName(request.getFullName());
        person.setPhone(request.getPhone());
        person.setEmail(request.getEmail());
        person.setRole(Role.USER);
        person.setPasswordHash(passwordEncoder.encode(request.getPassword()));

        if (!EMAIL_VERIFICATION_ENABLED) {
            person.setEmailVerified(true);
        }

        personRepository.save(person);

        if (EMAIL_VERIFICATION_ENABLED) {
            String verificationRefreshToken = tokenService.generateRefreshToken(person);
            notificationServiceClient.sendVerificationEmail(person.getEmail(), verificationRefreshToken);
        }
    }

    public void adminRegister(RegisterRequest request) {
        List<Person> personList = personRepository.findAllByRole(Role.ADMIN);

        if (personRepository.existsByEmail(request.getEmail()) || !personList.isEmpty()) {
            throw new CustomException("Цей акаунт вже використовується");
        }
        register(request);

        Person admin = personRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new CustomException(USER_NOT_FOUND));
        admin.setRole(Role.ADMIN);
        personRepository.save(admin);
    }

    public void resendVerificationLink(LoginRequest request) {
        if (!EMAIL_VERIFICATION_ENABLED) return;
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

        if (EMAIL_VERIFICATION_ENABLED && !person.isEmailVerified()) {
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
        if (!EMAIL_VERIFICATION_ENABLED) return;
        Person person = getPersonById(personId);
        String email = person.getEmail();
        if (email == null || email.isEmpty()) {
            throw new CustomException("User does not have a registered email");
        }
        String refreshToken = tokenService.generateRefreshToken(person);
        String resetLink = RESET_PASSWORD_LINK + refreshToken;
        notificationServiceClient.sendPasswordResetEmail(email, resetLink);
    }

    public void resetPassword(String authHeader, String oldPassword, String newPassword) {
        Person person = getPersonFromHeader(authHeader);
    
        if (!passwordEncoder.matches(oldPassword, person.getPasswordHash())) {
            throw new CustomException("Невірний старий пароль");
        }
    
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
                person.getId().toString(),
                person.getName(),
                person.getEmail(),
                person.getPhone()
        );
    }

    public List<PersonResponse> getAllUsers() {
        List<Person> persons = personRepository.findAll();
        return persons.stream()
                .map(user -> new PersonResponse(
                        user.getId().toString(),
                        user.getName(),
                        user.getEmail(),
                        user.getPhone()))
                .toList();
    }

    public void updateEmail(String authHeader, String email, String newEmail) {
        Person person = getPersonByEmail(email);

        if (!person.getId().toString().equalsIgnoreCase(tokenService.getUserIdFromToken(authHeader.substring(7)))) {
            throw new CustomException("User can change the own email only");
        }

        if (personRepository.existsByEmail(newEmail)) {
            throw new CustomException("Email already in use");
        }

        if (EMAIL_VERIFICATION_ENABLED) {
            String verificationEmailToken = tokenService.generateRefreshToken(person);
            notificationServiceClient.sendVerificationEmail(newEmail, verificationEmailToken);
        }
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
        UUID uuid = UUID.fromString(id);
        if (!personRepository.existsById(uuid)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, USER_NOT_FOUND);
        }
        tokenRepository.deleteByPersonId(uuid);
        personRepository.deleteById(uuid);
    }

    private Person getPersonById(String personId) {
        return personRepository.findById(UUID.fromString(personId))
                .orElseThrow(() -> new CustomException(USER_NOT_FOUND));
    }

    private Person getPersonByEmail(String email) {
        return personRepository.findByEmail(email)
                .orElseThrow(() -> new CustomException(USER_NOT_FOUND));
    }

    private Person getPersonFromHeader(String authHeader) {
        String token = authHeader.substring(7);
        return personRepository.findById(UUID.fromString(tokenService.getUserIdFromToken(token)))
                .orElseThrow(() -> new CustomException(USER_NOT_FOUND));
    }

    public PersonResponse updateProfile(String authHeader, UpdateProfileRequest request) {
        Person person = getPersonFromHeader(authHeader);
    
        String fullName = (request.getFirstName() + " " + request.getLastName()).trim();
        person.setName(fullName);
        person.setPhone(request.getPhone());
    
        // Якщо email змінився — перевіряємо що він не зайнятий
        if (!person.getEmail().equalsIgnoreCase(request.getEmail())) {
            if (personRepository.existsByEmail(request.getEmail())) {
                throw new CustomException("Email вже використовується");
            }
            person.setEmail(request.getEmail());
        }
    
        personRepository.save(person);
    
        return new PersonResponse(
            person.getId().toString(),
            person.getName(),
            person.getEmail(),
            person.getPhone()
        );
    }

    public TokenResponse loginOrRegisterOAuthUser(String email, String firstName, String lastName) {
        Person person = personRepository.findByEmail(email).orElseGet(() -> {
            Person newPerson = new Person();
            newPerson.setEmail(email);
            newPerson.setName((firstName != null ? firstName : "") + " " + (lastName != null ? lastName : "").trim());
            newPerson.setPhone("");
            newPerson.setRole(Role.USER);
            newPerson.setEmailVerified(true);
            newPerson.setBlocked(false);
            newPerson.setPasswordHash(passwordEncoder.encode(UUID.randomUUID().toString()));
            return personRepository.save(newPerson);
        });
    
        String accessToken = tokenService.generateAccessToken(person);
        String refreshToken = tokenService.generateRefreshToken(person);
        return new TokenResponse(accessToken, refreshToken);
    }
}