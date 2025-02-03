package com.furniture_store.order_management_service.repository;

import com.furniture_store.order_management_service.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, Long> {

}
