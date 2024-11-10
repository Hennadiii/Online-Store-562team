package com.furniture.notificationservice.service.notification;

import java.util.List;

/**
 * Represents a request for sending an email notification.
 *
 * @param addressesTo   a list of primary recipients for the email. Each entry in the list contains
 *                      a {@link NameAndEmail} object with a name and email address.
 * @param addressesCc   a list of recipients to be included as copy (Cc) in the email.
 *                      Each entry is a {@link NameAndEmail} object.
 * @param subject       the subject of the email, represented by an {@link EmailSubject} object
 *                      that defines the email topic.
 * @param mailArguments a list of arguments for formatting the email body. Typically, these are
 *                      placeholders for dynamic content that will be injected into the email template.
 */
public record NotificationRequest (
    List<NameAndEmail> addressesTo,
    List<NameAndEmail> addressesCc,
    EmailSubject subject,
    List<?> mailArguments
) {}