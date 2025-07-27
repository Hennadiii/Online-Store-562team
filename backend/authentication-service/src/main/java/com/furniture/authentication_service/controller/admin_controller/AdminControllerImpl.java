package com.furniture.authentication_service.controller.admin_controller;

import com.furniture.authentication_service.dto.PersonResponse;
import com.furniture.authentication_service.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
public class AdminControllerImpl implements AdminController {

    private final AuthService authService;

    public AdminControllerImpl(AuthService authService) {
        this.authService = authService;
    }

    @Override
    @GetMapping("/user/{id}")
    public ResponseEntity<PersonResponse> getUserById(@PathVariable String id) {
        PersonResponse personResponse = authService.getUserById(id);
        return ResponseEntity.ok(personResponse);
    }

    @Override
    @GetMapping("/allUsers")
    public ResponseEntity<List<PersonResponse>> getAllUsers() {
        List<PersonResponse> users = authService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    @Override
    @PatchMapping("/block/{id}")
    public void blockUser(@PathVariable String id) {
        authService.blockUserById(id);
    }

    @Override
    @DeleteMapping("/delete/{id}")
    public void deleteUserById(@PathVariable String id) {
        authService.deleteUserById(id);
    }
}
