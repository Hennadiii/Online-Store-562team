package com.furniture.notificationservice.service.notification;

import java.util.List;

/**
 * Represents a request for sending an email notification.
 *
 * @param addressesTo   a list of recipients for the email. Each entry in the list contains
 *                      a string with an email address.
 * @param subject       the subject of the email, represented by a string that defines the email topic.
 * @param text          a string for formatting the email body.
 */
public record NotificationRequest (
    List<String> addressesTo,
    String subject,
    String text
) {}