package com.example.productcatalogservice.service;

import com.example.productcatalogservice.model.Image;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public interface ImageService {
    Image save(MultipartFile file);
    void delete(Long id);
    Image getImage(Long id);
}
