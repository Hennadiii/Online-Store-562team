package com.furniture.authentication_service.service;

import com.furniture.authentication_service.dto.NotificationRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.List;

@Service
public class NotificationServiceClient {

    private final WebClient webClient;

    @Value("${app.link}")
    private String appLink;

    @Value("${app.notification-link}")
    private String notificationLink;

    public NotificationServiceClient(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.baseUrl(notificationLink).build();
    }

    public void sendVerificationEmail(String email, String verificationCode) {
        NotificationRequest request = new NotificationRequest(List.of(email), "Verify your account",
                "Click the link to verify: " + appLink + verificationCode);

        webClient.post()
                .uri("/notification/send")
                .bodyValue(request)
                .retrieve()
                .toBodilessEntity()
                .block();
    }

    public void sendPasswordResetEmail(String email, String resetLink) {
        NotificationRequest request = new NotificationRequest(List.of(email), "Password Reset Request",
                "Click the link to reset your password: " + resetLink);

        webClient.post()
                .uri("/notifications/email")
                .bodyValue(request)
                .retrieve()
                .toBodilessEntity()
                .block();
    }
}
