package com.furniture.authentication_service.dto;

import java.util.List;

public record NotificationRequest (
        List<String> addressesTo,
        String subject,
        String text
) {}
