package com.furniture.authentication_service.exception;

public class CustomException extends RuntimeException {

    private int statusCode; // HTTP статус-код, якщо потрібен

    // Конструктор лише з повідомленням
    public CustomException(String message) {
        super(message);
    }

    // Конструктор з повідомленням і статус-кодом
    public CustomException(String message, int statusCode) {
        super(message);
        this.statusCode = statusCode;
    }

    // Getter для статус-коду
    public int getStatusCode() {
        return statusCode;
    }

    // Setter для статус-коду (за потреби)
    public void setStatusCode(int statusCode) {
        this.statusCode = statusCode;
    }
}