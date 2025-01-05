package com.furniture_store.order_management_service.web;

import com.furniture_store.order_management_service.dto.*;
import com.furniture_store.order_management_service.entity.Delivery;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class DeliveryController {

    private final SessionOrder sessionOrder;
    private final NovaPoshtaWebClient novaPoshtaWebClient;

    public DeliveryController(SessionOrder sessionOrder, NovaPoshtaWebClient novaPoshtaWebClient) {
        this.sessionOrder = sessionOrder;
        this.novaPoshtaWebClient = novaPoshtaWebClient;
    }

    @GetMapping("/order/delivery/warehouses")
    public List<WarehouseDto> getWarehousesByCity(@RequestParam String city, @RequestParam int pageSize, @RequestParam int page) {
        return novaPoshtaWebClient.getWarehouses(city, pageSize, page);
    }

    @GetMapping("/order/delivery/streets")
    public List<StreetDto> getStreets(@RequestParam String keyword, @RequestParam int pageSize, @RequestParam int page) {
        return novaPoshtaWebClient.getStreets(keyword, pageSize, page);
    }

    @PostMapping("/order/delivery")
    public void setDelivery(@RequestBody Delivery delivery) {
        sessionOrder.setDelivery(delivery);
    }
}
