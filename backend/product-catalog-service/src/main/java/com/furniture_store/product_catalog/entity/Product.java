package com.furniture_store.product_catalog.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;
import org.hibernate.annotations.NaturalId;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Table
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Product {

    @Id
    @GeneratedValue
    private Long id;
    @NotBlank
    @NaturalId
    private String name;
    private String description;
    private Float price;

    @ManyToOne
    private Category category;
    @ManyToOne
    private Producer producer;

    private LocalDateTime addedAt = LocalDateTime.now();

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<Image> images = new ArrayList<>();
    @ElementCollection
    private List<String> keywords = new ArrayList<>();
}
