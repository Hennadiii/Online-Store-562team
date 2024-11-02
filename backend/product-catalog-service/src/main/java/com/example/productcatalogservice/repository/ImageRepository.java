package com.example.productcatalogservice.repository;

import com.example.productcatalogservice.model.Image;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ImageRepository extends JpaRepository<Image, Long> {
}
