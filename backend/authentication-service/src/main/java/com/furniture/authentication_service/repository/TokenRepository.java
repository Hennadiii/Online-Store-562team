package com.furniture.authentication_service.repository;

import com.furniture.authentication_service.model.Token;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.Instant;
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
     * @param personId ID користувача
     */
    void deleteByPersonId(String personId);

    /**
     * Видаляє всі токени, термін дії яких закінчився.
     * <p>
     * Цей метод виконує запит до бази даних і видаляє всі записи в таблиці "Token",
     * де значення поля "expiresAt" менше за переданий час (поточний час).
     * Це корисно для очищення бази від прострочених токенів.
     *
     * @param now Поточний час, використовується для порівняння з полем "expiresAt"
     *            для визначення прострочених токенів. Токени з терміном дії
     *            меншому за цей час будуть видалені.
     */
    @Modifying
    @Query("DELETE FROM Token t WHERE t.expiresAt < :now")
    void deleteAllExpiredTokens(@Param("now") Instant now);
}