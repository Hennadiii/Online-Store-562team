package com.furniture.notificationservice.service.notification;

import lombok.Getter;

@Getter
public enum EmailSubject {
    GREETINGS_MAIL("Вітаємо в нас!"),
    ORDER_CONFIRMATION("Замовлення підтверджено"),
    ORDER_DELIVERED("Замовлення доставлено"),
    PASSWORD_RESET("Відновлення паролю"),
    PROMOTIONAL_OFFER("Новинки магазину"),
    TO_DELIVERY_SERVICE("Замовлення відправлено");
    final String subjectText;

    EmailSubject(String subjectText) {
        this.subjectText = subjectText;
    }
}
