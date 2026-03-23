package com.furniture_store.order_management_service.repository;

import com.furniture_store.order_management_service.entity.Order;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface OrderRepository extends JpaRepository<Order, Long> {
    Optional<Order> findByIdAndGuestToken(Long id, String guestToken);
    Page<Order> findAllByUserId(String userId, Pageable pageable);
}