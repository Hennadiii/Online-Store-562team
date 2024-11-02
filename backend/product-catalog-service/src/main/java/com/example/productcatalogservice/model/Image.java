package com.example.productcatalogservice.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "image")
public class Image {
    @Id
    private Long id;

    private String type;
    @Lob
    @Column(name = "image", columnDefinition = "BLOB")
    private Byte[] data;
}