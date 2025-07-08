package com.furniture.authentication_service.service;

import com.furniture.authentication_service.dto.NotificationRequest;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.List;

@Service
public class NotificationServiceClient {

    private final WebClient webClient;

    private static final String APP_LINK = "https://online-Store-562/verify?code=";


    public NotificationServiceClient(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.baseUrl("http://localhost:777").build();
    }

    public void sendVerificationEmail(String email, String verificationCode) {
        NotificationRequest request = new NotificationRequest(List.of(email), "Verify your account",
                "Click the link to verify: " + APP_LINK + verificationCode);

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
