package com.furniture_store.product_catalog.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Table
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Image {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @Lob
    private byte[] bytes;

    public Image(byte[] bytes) {
        this.bytes = bytes;
    }
}
