package com.example.productcatalogservice.service.impl;

import java.io.IOException;
import java.util.Arrays;
import java.util.stream.IntStream;
import com.example.productcatalogservice.model.Image;
import com.example.productcatalogservice.repository.ImageRepository;
import com.example.productcatalogservice.service.ImageService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class ImageServiceImpl implements ImageService {
    private final ImageRepository imageRepository;

    @Override
    public Image save(MultipartFile file) {
        Image image = new Image();
        try {
            byte[] fileBytes = file.getBytes();
            image.setData(
                    (Byte[])IntStream
                            .range(0, fileBytes.length)
                            .mapToObj(i -> fileBytes[i])
                            .toArray()
            );
            image.setType(file.getContentType());
        } catch (IOException e) {
            throw new RuntimeException("Cannot save image ",e);
        }
        return imageRepository.save(image);
    }

    @Override
    public void delete(Long id) {
        imageRepository.deleteById(id);
    }

    @Override
    public Image getImage(Long id) {
        return imageRepository.findById(id).orElse(null);
    }
}
