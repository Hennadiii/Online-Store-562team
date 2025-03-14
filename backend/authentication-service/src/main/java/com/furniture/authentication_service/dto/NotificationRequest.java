package com.furniture.authentication_service.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

public record NotificationRequest (
        List<String> addressesTo,
        String subject,
        String text
) {}
