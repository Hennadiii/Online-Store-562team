package com.furniture_store.product_catalog.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@Table
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Product {

    @Id
    @GeneratedValue
    private Long id;

    private String name;
    private Float price;
    private String category;
    private LocalDateTime addedAt;

    @OneToMany(cascade = CascadeType.ALL)
    private List<Image> images = new ArrayList<>();
    @ElementCollection
    private List<String> keywords = new ArrayList<>();
}
