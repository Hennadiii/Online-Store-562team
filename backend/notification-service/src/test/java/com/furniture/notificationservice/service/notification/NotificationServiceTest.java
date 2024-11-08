package com.furniture.notificationservice.service.notification;

import com.furniture.notificationservice.service.iface.MailTemplateManager;
import com.furniture.notificationservice.service.iface.NotificationService;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.test.util.ReflectionTestUtils;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class NotificationServiceTest {

    final JavaMailSender javaMailSender = mock();

    final MailTemplateManager mailTemplateManager = mock();

    final MimeMessage mimeMessage = mock();

    final NotificationService notificationService = new NotificationServiceImpl(
            javaMailSender,
            mailTemplateManager
    );

    @BeforeEach
    public void init() {
        ReflectionTestUtils.setField(notificationService, "from", "test@example.com");
    }

    @Test
    void sendMessage_should_send_message_with_right_parameters() throws MessagingException {
        NotificationRequest notificationRequest = new NotificationRequest(
                List.of("recipient@example.com"),
                EmailSubject.GREETINGS_MAIL,
                List.of("Argument1")
        );

        final MimeMessageHelper helper = new MimeMessageHelper(
                mimeMessage,
                MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED,
                "utf-8"
        );
        helper.setTo("recipient@example.com");
        helper.setFrom("test@example.com");
        helper.setSubject(EmailSubject.GREETINGS_MAIL.getSubjectText());
        helper.setText("template Argument1", true);

        when(javaMailSender.createMimeMessage()).thenReturn(mimeMessage);
        when(mailTemplateManager.getTemplateString(any())).thenReturn("template %s");

        notificationService.sendMessage(notificationRequest);

        ArgumentCaptor<MimeMessage> messageCaptor = ArgumentCaptor.forClass(MimeMessage.class);

        verify(javaMailSender).send(messageCaptor.capture());

        assertEquals(mimeMessage, messageCaptor.getValue());
    }
}