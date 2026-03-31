package com.furniture.authentication_service.controller.address_controller;

import com.furniture.authentication_service.dto.AddressRequest;
import com.furniture.authentication_service.dto.AddressResponse;
import com.furniture.authentication_service.service.AddressService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
public class AddressControllerImpl implements AddressController {

    private final AddressService addressService;

    @Override
    public ResponseEntity<List<AddressResponse>> getAll() {
        return ResponseEntity.ok(addressService.getAll());
    }

    @Override
    public ResponseEntity<AddressResponse> create(AddressRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(addressService.create(request));
    }

    @Override
    public ResponseEntity<AddressResponse> update(UUID id, AddressRequest request) {
        return ResponseEntity.ok(addressService.update(id, request));
    }

    @Override
    public ResponseEntity<Void> delete(UUID id) {
        addressService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @Override
    public ResponseEntity<AddressResponse> setDefault(UUID id) {
        return ResponseEntity.ok(addressService.setDefault(id));
    }
}