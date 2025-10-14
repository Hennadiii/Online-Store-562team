package com.furniture.notificationservice.controller;

import com.furniture.notificationservice.service.notification.NotificationRequest;
import com.furniture.notificationservice.service.notification.NotificationServiceImpl;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/notification")
public class ManualController {
    private final NotificationServiceImpl notificationServiceImpl;

    public ManualController(NotificationServiceImpl notificationServiceImpl) {
        this.notificationServiceImpl = notificationServiceImpl;
    }

    @GetMapping("/test")
    public void testController() {
        final NotificationRequest request = new NotificationRequest(
                List.of("udodikdmitro7@gmail.com"),
                "Вітаємо в Cozy Corners",
                "Шановний Іван Петрович! Вітаємо Вас в Cozy Corners!"
        );
        notificationServiceImpl.sendMessage(request);
    }

    @PostMapping("/send")
    public void sendMessage(@RequestBody NotificationRequest request) {
        notificationServiceImpl.sendMessage(request);
    }
}