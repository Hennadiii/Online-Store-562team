package com.furniture_store.order_management_service.repository;

import com.furniture_store.order_management_service.entity.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {
}
