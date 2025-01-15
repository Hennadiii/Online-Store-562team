package com.furniture.authentication_service.repository;

import com.furniture.authentication_service.model.Token;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TokenRepository extends JpaRepository<Token, String> {

    /**
     * Знаходить токен за значенням refreshToken.
     *
     * @param refreshToken Значення Refresh Token
     * @return Optional<Token>
     */
    Optional<Token> findByRefreshToken(String refreshToken);

    /**
     * Видаляє всі токени користувача за userId.
     *
     * @param userId ID користувача
     */
    void deleteByUserId(String userId);
}