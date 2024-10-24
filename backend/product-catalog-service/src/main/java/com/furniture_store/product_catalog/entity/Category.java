package com.furniture_store.product_catalog.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Table
@Entity
@NoArgsConstructor
public class Category {

    @Id
    @GeneratedValue
    private Long id;
    private String name;

    public Category(String name){
        this.name = name;
    }
}
