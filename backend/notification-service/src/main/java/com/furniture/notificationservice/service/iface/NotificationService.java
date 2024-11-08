package com.furniture.notificationservice.service.iface;

import com.furniture.notificationservice.service.notification.NotificationRequest;

public interface NotificationService {
    void sendMessage(NotificationRequest notificationRequest);
}