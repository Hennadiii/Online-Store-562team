package com.furniture.authentication_service.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {

    @NotBlank(message = "First name cannot be empty")
    @Size(min = 2, max = 50, message = "First name must be between 2 and 50 characters")
    @Pattern(regexp = "^[\\p{L}]{2,}([ '-][\\p{L}]{2,})*$",
            message = "First name must contain only letters")
    private String firstName;

    @NotBlank(message = "Last name cannot be empty")
    @Size(min = 2, max = 50, message = "Last name must be between 2 and 50 characters")
    @Pattern(regexp = "^[\\p{L}]{2,}([ '-][\\p{L}]{2,})*$",
            message = "Last name must contain only letters")
    private String lastName;

    @Size(max = 15, message = "Phone must be up to 15 characters")
    @Pattern(regexp = "^[+]?[0-9\\-() ]{10,15}$|^$",
            message = "Invalid phone format")
    private String phone;

    @NotBlank(message = "Email cannot be empty")
    @Size(max = 255, message = "Email must be up to 255 characters")
    @Email(message = "Invalid email format")
    private String email;

    @NotBlank(message = "Password cannot be empty")
    @Size(min = 8, max = 50, message = "Password must be between 8 and 50 characters")
    private String password;

    public void cleanFieldsFromExtraSpaces() {
        if (this.firstName != null) {
            this.firstName = this.firstName.trim().replaceAll("\\s{2,}", " ");
        }
        if (this.lastName != null) {
            this.lastName = this.lastName.trim().replaceAll("\\s{2,}", " ");
        }
        if (this.phone != null) {
            this.phone = this.phone.trim().replaceAll("\\s+", "");
        }
    }

    // зручний метод для AuthService
    public String getFullName() {
        return firstName + " " + lastName;
    }
}