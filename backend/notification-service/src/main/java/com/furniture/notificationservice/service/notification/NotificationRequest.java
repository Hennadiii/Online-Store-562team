package com.furniture.notificationservice.service.notification;

import java.util.Collection;
import java.util.List;

public record NotificationRequest (
    Collection<String> addressesTo,
    EmailSubject subject,
    List<?> mailArguments
) {}