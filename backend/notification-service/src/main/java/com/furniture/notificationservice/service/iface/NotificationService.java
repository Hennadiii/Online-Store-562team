package com.furniture.notificationservice.service.iface;

import com.furniture.notificationservice.exception.NotificationException;
import com.furniture.notificationservice.service.notification.NotificationRequest;

/**
 * Interface for sending email notifications
 * based on the provided notification request data.
 */

public interface NotificationService {

    /**
     * Sends an email message based on the given {@link NotificationRequest}.
     *
     * @param notificationRequest the data required to compose and send the email,
     * including recipients, subject, and message content.
     *
     * @throws NotificationException if an error occurs while sending the email
     * @throws IllegalArgumentException if the notification request is invalid,
     * such as when no primary recipients are specified.
     */
    void sendMessage(NotificationRequest notificationRequest);
}