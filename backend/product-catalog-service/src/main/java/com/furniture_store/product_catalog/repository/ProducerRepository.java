package com.furniture_store.product_catalog.repository;

import com.furniture_store.product_catalog.entity.Producer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProducerRepository extends JpaRepository<Producer, Long> {

    Optional<Producer> findByName(String name);

}
