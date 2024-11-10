package com.furniture.notificationservice.service.iface;

import com.furniture.notificationservice.exception.NotificationException;
import com.furniture.notificationservice.service.notification.EmailSubject;

/**
 * Interface for managing email templates based on a specified subject.
 * Template files are stored in the {@code resources/templates} directory.
 */
public interface MailTemplateManager {
    /**
     * Retrieves the email template content as a string based on the given {@link EmailSubject}.
     *
     * @param notificationSubject the subject used to identify the appropriate email template.
     * @return the content of the email template as a {@code String}.
     *
     * @throws NotificationException if there is an error while retrieving the template,
     * such as when the template is not found.
     */
    String getTemplateString(EmailSubject notificationSubject);
}
