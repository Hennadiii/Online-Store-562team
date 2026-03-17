package com.furniture.authentication_service.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;
import java.util.UUID;

@Getter
@Setter
@Entity
@Table(name = "tokens")
public class Token {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(columnDefinition = "uuid", updatable = false, nullable = false)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "person_id", nullable = false)
    private Person person;

    @Column(nullable = false, unique = true)
    private String refreshToken;

    @Column(nullable = false)
    private Instant expiresAt;

    @Column(nullable = false, updatable = false)
    private Instant createdAt = Instant.now();
}