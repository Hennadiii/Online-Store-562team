package com.furniture.authentication_service.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class EmailRequest {
    private String recipient;  // Email отримувача
    private String subject;    // Тема листа
    private String body;       // Текст листа
}
