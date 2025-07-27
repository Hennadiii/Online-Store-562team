package com.furniture.authentication_service.service;

import com.furniture.authentication_service.dto.TokenResponse;
import com.furniture.authentication_service.exception.CustomException;
import com.furniture.authentication_service.model.Token;
import com.furniture.authentication_service.model.Person;
import com.furniture.authentication_service.repository.PersonRepository;
import com.furniture.authentication_service.repository.TokenRepository;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.Key;
import java.time.Instant;
import java.util.Base64;
import java.util.Date;

@Slf4j
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
                .claim("role", person.getRole().name())
                .setExpiration(new Date(System.currentTimeMillis() + accessTokenExpirationMs))
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }


    /**
     * Генерує Refresh Token і зберігає його в базі даних.
     */
    public String generateRefreshToken(Person person) {
        String newRefreshToken = Jwts.builder()
                .setSubject(person.getId())
                .claim("role", person.getRole().name())
                .setExpiration(new Date(System.currentTimeMillis() + refreshTokenExpirationMs))
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();

        Token token = new Token();
        token.setRefreshToken(newRefreshToken);
        token.setPerson(person);
        token.setExpiresAt(Instant.now().plusMillis(refreshTokenExpirationMs));
        tokenRepository.save(token);

        return newRefreshToken;
    }

    /**
     * Оновлює токени (access та refresh) на основі Refresh Token.
     */
    @Transactional
    public TokenResponse updateTokens(String authHeader) {
        String refreshToken = authHeader.substring(7);
        Person person = personRepository.findById(getUserIdFromToken(refreshToken))
                .orElseThrow(() -> new CustomException("Invalid credentials"));

        String newAccessToken = generateAccessToken(person);
        String newRefreshToken = generateRefreshToken(person);

        return new TokenResponse(newAccessToken, newRefreshToken);
    }

    /**
     * Відкликання токенів (logout).
     */
    public void invalidateToken(String refreshToken) {
        tokenRepository.findByRefreshToken(refreshToken)
                .ifPresent(tokenRepository::delete);
    }

    /**
     * Витягує ID користувача з Token.
     */
    public String getUserIdFromToken(String token) {
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody();

        return claims.getSubject();
    }

    private Key getSigningKey() {
        byte[] keyBytes = Base64.getDecoder().decode(jwtSecret);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    @Scheduled(fixedRate = 36000000)
    @Transactional
    public void deleteExpiredTokens() {
        Instant now = Instant.now();
        tokenRepository.deleteAllExpiredTokens(now);
        log.debug("Deleted expired tokens");
    }
}