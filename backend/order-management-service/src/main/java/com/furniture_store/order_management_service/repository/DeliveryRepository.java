package com.furniture_store.order_management_service.repository;

import com.furniture_store.order_management_service.entity.Delivery;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DeliveryRepository extends JpaRepository<Delivery, Long> {
}