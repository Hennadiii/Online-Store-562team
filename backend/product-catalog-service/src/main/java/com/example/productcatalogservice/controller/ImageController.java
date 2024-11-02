package com.example.productcatalogservice.controller;

import com.example.productcatalogservice.service.ImageService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/image")
public class ImageController {
    private final ImageService imageService;

    @GetMapping("/{id}")
    @Valid
    public ResponseEntity<Byte[]> getImage(@PathVariable @NotNull Long id) {
        return ResponseEntity.ok(imageService.getImage(id).getData());
    }

    @DeleteMapping("/{id}")
    @Valid
    public ResponseEntity<?> deleteImage(@PathVariable @NotNull Long id) {
       imageService.delete(id);
       return ResponseEntity.ok().build();
    }
}
