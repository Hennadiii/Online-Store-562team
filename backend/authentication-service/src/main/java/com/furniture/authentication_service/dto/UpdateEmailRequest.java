package com.furniture.authentication_service.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UpdateEmailRequest {

    @NotBlank(message = "Email cannot be empty")
    @Size(max = 255, message = "The email must contain up to 255 characters")
    @Email(message = "Invalid email format")
    private String newEmail;
}
