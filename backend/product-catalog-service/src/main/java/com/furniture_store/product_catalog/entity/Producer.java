package com.furniture_store.product_catalog.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import org.hibernate.annotations.NaturalId;

@Data
@Table
@Entity
public class Producer {

    @Id
    @GeneratedValue
    private Long id;
    @NaturalId
    private String name;
}
