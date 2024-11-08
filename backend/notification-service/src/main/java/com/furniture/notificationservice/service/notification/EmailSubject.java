package com.furniture.notificationservice.service.notification;

import lombok.Getter;

@Getter
public enum EmailSubject {
    GREETINGS_MAIL("Welcome to our store");
    final String subjectText;

    EmailSubject(String subjectText) {
        this.subjectText = subjectText;
    }
}
