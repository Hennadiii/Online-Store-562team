package com.furniture.notificationservice.service.iface;

import com.furniture.notificationservice.service.notification.EmailSubject;

public interface MailTemplateManager {
    String getTemplateString(EmailSubject notificationSubject);
}
