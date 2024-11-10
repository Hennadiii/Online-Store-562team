package com.furniture.notificationservice;

import com.furniture.notificationservice.service.notification.EmailSubject;
import com.furniture.notificationservice.service.notification.NameAndEmail;
import com.furniture.notificationservice.service.notification.NotificationRequest;
import com.furniture.notificationservice.service.notification.NotificationServiceImpl;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/send")
public class ManualController {
    private final NotificationServiceImpl notificationServiceImpl;

    public ManualController(NotificationServiceImpl notificationServiceImpl) {
        this.notificationServiceImpl = notificationServiceImpl;
    }

    @GetMapping("/test")
    public void testController() {
        final NameAndEmail nameAndEmail1 = new NameAndEmail("Dmytro Udodik", "udodikdmitro7@gmail.com");
        final NameAndEmail nameAndEmail2 = new NameAndEmail(null, "iegorzaika@gmail.com");
        final NameAndEmail nameAndEmail3 = new NameAndEmail("Irina Udodik", "udodikira24@gmail.com");
        final NotificationRequest request = new NotificationRequest(
                List.of(nameAndEmail1, nameAndEmail2),
                List.of(nameAndEmail3),
                EmailSubject.GREETINGS_MAIL,
                List.of("Шван Петрович")
        );
        notificationServiceImpl.sendMessage(request);
    }
}