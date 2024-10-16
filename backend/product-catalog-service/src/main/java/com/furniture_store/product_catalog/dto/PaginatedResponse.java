package com.furniture_store.product_catalog.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.domain.Page;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PaginatedResponse<T> {

    private List<T> content;
    private int totalElements;
    private int totalPages;
    private int number;
    private int size;

    public PaginatedResponse(Page<T> page) {
        this.content = page.getContent();
        this.totalElements = page.getNumberOfElements();
        this.totalPages = page.getTotalPages();
        this.number = page.getNumber();
        this.size = page.getSize();
    }

    /**
     * Takes all the properties except the content from the Page and the content from the List
     * @param content: the data
     * @param page: the properties for pagination
     */
    public PaginatedResponse(List<T> content, Page<?> page){
        this.content = content;
        this.totalElements = page.getNumberOfElements();
        this.totalPages = page.getTotalPages();
        this.number = page.getNumber();
        this.size = page.getSize();
    }
}
