package com.furniture_store.product_catalog.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
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
    private String description;
    private Float price;

    @ManyToOne(cascade = CascadeType.PERSIST)
    private Category category;
    @ManyToOne(cascade = CascadeType.PERSIST)
    private Producer producer;

    private LocalDateTime addedAt = LocalDateTime.now();

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<Image> images = new ArrayList<>();
    @ElementCollection
    private List<String> keywords = new ArrayList<>();
}
