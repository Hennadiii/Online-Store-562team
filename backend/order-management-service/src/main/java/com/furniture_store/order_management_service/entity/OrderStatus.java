package com.furniture_store.order_management_service.entity;

public enum OrderStatus {
    UNPAID,     // Нове
    PAID,       // Обробляється
    SHIPPED,    // Відправлено
    DELIVERED,  // Отримано
    RETURNED    // Повернено
}