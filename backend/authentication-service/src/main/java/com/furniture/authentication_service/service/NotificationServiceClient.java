package com.furniture.authentication_service.service;

import com.furniture.authentication_service.dto.EmailRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

@Service
public class NotificationServiceClient {

    private final WebClient webClient;

    @Value("${api.gateway.url}")
    private String apiGatewayUrl;

    public NotificationServiceClient(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.build();
    }

    public void sendVerificationEmail(String email, String verificationCode) {
        EmailRequest request = new EmailRequest(email, "Verify your account",
                "Click the link to verify: https://yourapp.com/verify?code=" + verificationCode);

        webClient.post()
                .uri(apiGatewayUrl + "/notifications/email")
                .bodyValue(request)
                .retrieve()
                .toBodilessEntity()
                .block();
    }

    public void sendPasswordResetEmail(String email, String resetLink) {
        EmailRequest request = new EmailRequest(email, "Password Reset Request",
                "Click the link to reset your password: " + resetLink);

        webClient.post()
                .uri(apiGatewayUrl + "/notifications/email")
                .bodyValue(request)
                .retrieve()
                .toBodilessEntity()
                .block();
    }
}
