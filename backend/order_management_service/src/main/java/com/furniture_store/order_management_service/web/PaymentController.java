package com.furniture_store.order_management_service.web;

import com.furniture_store.order_management_service.entity.PaymentInfo;
import com.furniture_store.order_management_service.service.PaymentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class PaymentController {

    private final PaymentService paymentService;
    private final SessionOrder sessionOrder;

    public PaymentController(PaymentService paymentService, SessionOrder sessionOrder) {
        this.paymentService = paymentService;
        this.sessionOrder = sessionOrder;
    }

    @PostMapping("/order/paymentInfo")
    public ResponseEntity<?> addPaymentInfo(@RequestBody PaymentInfo paymentInfo) {
        sessionOrder.setPaymentInfo(paymentInfo);
        return ResponseEntity.ok("Payment info successfully added");
    }

    @GetMapping("/payments/credentials/{id}")
    public ResponseEntity<PaymentInfo> getPaymentInfo(@PathVariable Long id) {
        PaymentInfo credentials = paymentService.getPaymentInfo(id);
            return ResponseEntity.ok(credentials);
    }

    @DeleteMapping("/payments/credentials/{id}")
    public void deletePaymentInfo(@PathVariable Long id) {
        paymentService.deletePaymentInfo(id);
    }

    @PutMapping("/payments/credentials/{id}")
    public void updatePaymentInfo(@RequestBody PaymentInfo paymentInfo, @PathVariable Long id) {
        paymentInfo.setId(id);
        paymentService.updatePaymentInfo(paymentInfo);
    }
}
