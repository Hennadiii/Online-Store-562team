package com.furniture_store.order_management_service.service;

import com.furniture_store.order_management_service.entity.PaymentInfo;
import com.furniture_store.order_management_service.exception.PaymentInfoNotFoundException;
import com.furniture_store.order_management_service.repository.PaymentRepository;
import org.springframework.stereotype.Service;

@Service
public class PaymentService {

    private final PaymentRepository paymentRepository;

    public PaymentService(PaymentRepository paymentRepository) {
        this.paymentRepository = paymentRepository;
    }

    public PaymentInfo getPaymentInfo(Long id) {
        return paymentRepository.findById(id).orElseThrow(PaymentInfoNotFoundException::new);
    }

    public void deletePaymentInfo(Long id) {
        paymentRepository.deleteById(id);
    }

    public void updatePaymentInfo(PaymentInfo paymentInfo) {
        paymentRepository.save(paymentInfo);
    }
}
