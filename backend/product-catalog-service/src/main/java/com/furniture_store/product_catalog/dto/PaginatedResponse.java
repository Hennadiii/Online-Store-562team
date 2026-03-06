package com.furniture_store.product_catalog.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.domain.Page;

import java.util.List;

/**
 * Клас, що представляє пагіновану відповідь з метаданими про кількість елементів, загальну кількість сторінок,
 * номер сторінки та розмір сторінки.
 * Служить для зміни типу даних зі збереженням властивостей оригінальної сторінки {@link Page}
 *
 * @param <T> тип об'єктів у списку content
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PaginatedResponse<T> {

    private List<T> content;
    private int totalElements;
    private int totalPages;
    private int number;
    private int size;

    /**
     * Приймає всі властивості з об'єкта Page, окрім вмісту, а сам вміст бере з об'єкта List.
     * @param content: Дані
     * @param page: властивості сторінки
     */
    public PaginatedResponse(List<T> content, Page<?> page){
        this.content = content;
        this.totalElements = (int) page.getTotalElements(); // общее кол-во
        this.totalPages = page.getTotalPages();
        this.number = page.getNumber();
        this.size = page.getSize();
    }
}
