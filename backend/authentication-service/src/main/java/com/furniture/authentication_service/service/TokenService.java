package com.furniture.authentication_service.service;

import com.furniture.authentication_service.dto.TokenResponse;
import com.furniture.authentication_service.exception.CustomException;
import com.furniture.authentication_service.model.Token;
import com.furniture.authentication_service.model.User;
import com.furniture.authentication_service.repository.TokenRepository;
import io.jsonwebtoken.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Date;
import java.util.UUID;

@Service
public class TokenService {

    @Value("${jwt.secret}")
    private String jwtSecret;

    @Value("${jwt.accessToken.expirationMs}")
    private long accessTokenExpirationMs;

    @Value("${jwt.refreshToken.expirationMs}")
    private long refreshTokenExpirationMs;

    private final TokenRepository tokenRepository;

    public TokenService(TokenRepository tokenRepository) {
        this.tokenRepository = tokenRepository;
    }

    /**
     * Генерує Access Token.
     */
    public String generateAccessToken(User user) {
        return Jwts.builder()
                .setSubject(user.getId())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + accessTokenExpirationMs))
                .signWith(SignatureAlgorithm.HS256, jwtSecret)
                .claim("role", user.getRole())
                .compact();
    }

    /**
     * Генерує Refresh Token і зберігає його в базі даних.
     */
    public String generateRefreshToken(User user) {
        String refreshToken = UUID.randomUUID().toString();

        Token token = new Token();
        token.setRefreshToken(refreshToken);
        token.setExpiresAt(Instant.now().plusMillis(refreshTokenExpirationMs));
        tokenRepository.save(token);

        return refreshToken;
    }

    /**
     * Оновлює токени (access та refresh) на основі Refresh Token.
     */
    public TokenResponse refreshTokens(String refreshToken) {
        Token token = tokenRepository.findByRefreshToken(refreshToken)
                .orElseThrow(() -> new CustomException("Invalid refresh token"));

        if (token.getExpiresAt().isBefore(Instant.now())) {
            throw new CustomException("Refresh token has expired");
        }

        User user = new User(); // Виклик UserService для отримання користувача за ID
        //user.setId(token.getUserId());

        String newAccessToken = generateAccessToken(user);
        String newRefreshToken = generateRefreshToken(user);

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
}