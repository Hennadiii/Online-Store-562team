package com.example.productcatalogservice.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Data
@Entity
@Table(name = "product")
@NoArgsConstructor
public class Product {
    @Id
    private Long id;
    private String name;
    private String description;
    private Float price;
    @OneToOne
    private Category category;
    @OneToMany
    private List<Image> images;
}
