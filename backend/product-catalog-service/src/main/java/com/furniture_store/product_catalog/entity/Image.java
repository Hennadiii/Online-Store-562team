package com.furniture_store.product_catalog.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Table(name = "product_images") // Даем таблице понятное имя
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Image {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // IDENTITY лучше подходит для PostgreSQL
    private Long id; // Используем Long вместо int для совместимости с большими БД

    @Column(name = "image_url", length = 500) // Указываем длину, чтобы влезли длинные ссылки
    private String url;

    // Конструктор для быстрого создания объекта из строки (используется в конвертере)
    public Image(String url) {
        this.url = url;
    }
}