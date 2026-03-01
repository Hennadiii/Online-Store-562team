package com.furniture_store.product_catalog.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.NaturalId;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "products")
@NoArgsConstructor
@AllArgsConstructor
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NaturalId
    private String name; // В БД оставляем name, маппить в title будем в DTO
    
    private String description;
    
    @Column(length = 1000) // Длинное описание
    private String fullDescription;
    
    private Float price;
    private Boolean popular;

    // Характеристики мебели
    private String material;
    private String upholstery;
    private String functionality;

    @ManyToOne
    private Category category;

    @ManyToOne
    private Producer producer;

    private LocalDateTime addedAt = LocalDateTime.now();

    // Исправлено: Добавлена аннотация @JoinColumn для корректной связи в БД
    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER, orphanRemoval = true)
    @JoinColumn(name = "product_id") 
    private List<Image> images = new ArrayList<>();

    @ElementCollection
    private List<String> keywords = new ArrayList<>();
}