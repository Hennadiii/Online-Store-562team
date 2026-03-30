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

    @NotBlank(message = "Name cannot be empty")
    @Size(min = 2, max = 100, message = "The name must contain between 2 and 100 characters")
    @Pattern(regexp = "^[А-Яа-яЇїІіЄєҐґA-Za-z]{2,}([ '-][А-Яа-яЇїІіЄєҐґA-Za-z]{2,})*$",
            message = "The name must contain only letters, spaces, hyphens, or apostrophes. " +
                    "Each word must contain at least two letters")
    private String name;

    @NotBlank(message = "Phone cannot be empty")
    @Size(min = 10, max = 15, message = "The phone must contain 10 to 15 characters")
    @Pattern(regexp = "^[+]?[0-9\\-() ]{10,15}$",
            message = "Invalid the phone format")
    private String phone;

    @NotBlank(message = "Email cannot be empty")
    @Size(max = 15, message = "The email must contain to 255 characters")
    @Email(message = "Invalid the email format")
    private String email;

    @NotBlank(message = "Password cannot be empty")
    @Size(min = 8, max = 50, message = "The password must contain 8 to 50 characters")
    @Pattern(
            regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,50}$",
            message = "The password must contain at least one uppercase letter, " +
                    "one lowercase letter, one number, and one special character."
    )
    private String password;

    public void cleanFieldsFromExtraSpaces() {

        if (this.name != null) {
            this.name = this.name.trim().replaceAll("\\s{2,}", " ");
        }

        if (this.phone != null) {
            this.phone = this.phone.trim().replaceAll("\\s+", "");
        }
    }
}
