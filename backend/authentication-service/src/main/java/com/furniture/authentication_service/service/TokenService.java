package com.furniture.authentication_service.service;

import com.furniture.authentication_service.dto.TokenResponse;
import com.furniture.authentication_service.exception.CustomException;
import com.furniture.authentication_service.model.Token;
import com.furniture.authentication_service.model.Person;
import com.furniture.authentication_service.repository.PersonRepository;
import com.furniture.authentication_service.repository.TokenRepository;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.time.Instant;
import java.util.Base64;
import java.util.Date;

@Service
public class TokenService {

    @Value("${jwt.secret}")
    private String jwtSecret;

    @Value("${jwt.accessToken.expirationMs}")
    private long accessTokenExpirationMs;

    @Value("${jwt.refreshToken.expirationMs}")
    private long refreshTokenExpirationMs;

    private final TokenRepository tokenRepository;
    private final PersonRepository personRepository;

    public TokenService(TokenRepository tokenRepository, PersonRepository personRepository) {
        this.tokenRepository = tokenRepository;
        this.personRepository = personRepository;
    }

    /**
     * Генерує Access Token.
     */
    public String generateAccessToken(Person person) {
        return Jwts.builder()
                .setSubject(person.getId())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + accessTokenExpirationMs))
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .claim("role", person.getRole())
                .compact();
    }


    /**
     * Генерує Refresh Token і зберігає його в базі даних.
     */
    public String generateRefreshToken(Person person) {
        String newRefreshToken = Jwts.builder()
                .setSubject(person.getId())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + refreshTokenExpirationMs))
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();

        Token token = new Token();
        token.setRefreshToken(newRefreshToken);
        token.setExpiresAt(Instant.now().plusMillis(refreshTokenExpirationMs));
        tokenRepository.save(token);

        return newRefreshToken;
    }

    /**
     * Оновлює токени (access та refresh) на основі Refresh Token.
     */
    public TokenResponse updateTokens(String refreshToken) {
        Instant now = Instant.now();
        tokenRepository.deleteAllExpiredTokens(now);


        Token token = tokenRepository.findByRefreshToken(refreshToken)
                .orElseThrow(() -> new CustomException("Invalid refresh token"));

        if (token.getExpiresAt().isBefore(Instant.now())) {
            throw new CustomException("Refresh token has expired");
        }

        Person person = personRepository.findById(getUserIdFromRefreshToken(refreshToken))
                .orElseThrow(() -> new CustomException("Invalid credentials"));

        String newAccessToken = generateAccessToken(person);
        String newRefreshToken = generateRefreshToken(person);

        // Видалити старий токен
        tokenRepository.delete(token);

        return new TokenResponse(newAccessToken, newRefreshToken);
    }

    /**
     * Перевіряє Access Token на валідність.
     */
    public boolean validateAccessToken(String token) {
        try {
            Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token);
            return true;
        } catch (JwtException e) {
            return false;
        }
    }

    /**
     * Отримує ID користувача з Access Token.
     */
    public String getUserIdFromToken(String token) {
        Claims claims = Jwts.parser()
                .setSigningKey(jwtSecret)
                .parseClaimsJws(token)
                .getBody();
        return claims.getSubject();
    }

    /**
     * Відкликання токенів (logout).
     */
    public void invalidateToken(String refreshToken) {
        tokenRepository.findByRefreshToken(refreshToken)
                .ifPresent(tokenRepository::delete);
    }

    private Key getSigningKey() {
        byte[] keyBytes = Base64.getDecoder().decode(jwtSecret);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    /**
     * Витягує ID користувача з Refresh Token.
     */
    private String getUserIdFromRefreshToken(String refreshToken) {
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(refreshToken)
                .getBody();

        return claims.getSubject(); // Повертає userId
    }
}