package com.furniture_store.order_management_service.repository;

import com.furniture_store.order_management_service.entity.PaymentInfo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentRepository extends JpaRepository<PaymentInfo, Long> {

}
