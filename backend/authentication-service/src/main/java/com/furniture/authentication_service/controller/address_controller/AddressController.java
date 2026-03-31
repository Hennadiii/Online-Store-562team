package com.furniture.authentication_service.controller.address_controller;

import com.furniture.authentication_service.dto.AddressRequest;
import com.furniture.authentication_service.dto.AddressResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RequestMapping("/api/addresses")
public interface AddressController {

    @Operation(summary = "Всі адреси", security = @SecurityRequirement(name = "bearerAuth"))
    @GetMapping
    ResponseEntity<List<AddressResponse>> getAll();

    @Operation(summary = "Додати адресу", security = @SecurityRequirement(name = "bearerAuth"))
    @PostMapping
    ResponseEntity<AddressResponse> create(@RequestBody @Valid AddressRequest request);

    @Operation(summary = "Оновити адресу", security = @SecurityRequirement(name = "bearerAuth"))
    @PutMapping("/{id}")
    ResponseEntity<AddressResponse> update(
            @PathVariable UUID id,
            @RequestBody @Valid AddressRequest request);

    @Operation(summary = "Видалити адресу", security = @SecurityRequirement(name = "bearerAuth"))
    @DeleteMapping("/{id}")
    ResponseEntity<Void> delete(@PathVariable UUID id);

    @Operation(summary = "Встановити як основну", security = @SecurityRequirement(name = "bearerAuth"))
    @PatchMapping("/{id}/default")
    ResponseEntity<AddressResponse> setDefault(@PathVariable UUID id);
}