package com.furniture.notificationservice.service.notification;

import com.furniture.notificationservice.exception.NotificationException;
import com.furniture.notificationservice.service.iface.NotificationService;
import jakarta.mail.Message;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.junit.jupiter.MockitoExtension;
import org.simplejavamail.api.email.Email;
import org.simplejavamail.api.email.Recipient;
import org.simplejavamail.api.mailer.Mailer;
import org.simplejavamail.email.EmailBuilder;
import org.springframework.test.util.ReflectionTestUtils;

import java.util.List;

import static com.furniture.notificationservice.util.StringUtil.format;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class NotificationServiceTest {

    final Mailer mailer = mock();
    final NotificationService notificationService = new NotificationServiceImpl(
            mailer
    );

    final String from = "test@example.com";

    @BeforeEach
    public void init() {
        ReflectionTestUtils.setField(notificationService, "from", from);
    }

    @Test
    void sendMessage_should_send_message_with_right_parameters() {
        String addresseeTo1 = "recipientTo1@example.com";
        String addresseeTo2 = "recipientTo2@example.com";

        List<String> addresseesTo = List.of(addresseeTo1, addresseeTo2);

        String emailSubject = "GREETINGS MAIL";
        String mailArgument = "Argument";

        NotificationRequest notificationRequest = new NotificationRequest(
                addresseesTo,
                emailSubject,
                mailArgument
        );

        notificationService.sendMessage(notificationRequest);

        List<Recipient> expectedRecipientsTo = List.of(
                new Recipient(null, addresseeTo1, Message.RecipientType.TO),
                new Recipient(null, addresseeTo2, Message.RecipientType.TO)
        );

        final Email expectedEmail = EmailBuilder.startingBlank()
                .from(from)
                .to(expectedRecipientsTo)
                .withSubject(emailSubject)
                .withHTMLText(mailArgument)
                .buildEmail();


        ArgumentCaptor<Email> messageCaptor = ArgumentCaptor.forClass(Email.class);
        verify(mailer).sendMail(messageCaptor.capture());
        Email actualEmail = messageCaptor.getValue();
        assertEquals(expectedEmail, actualEmail);
    }

    @Test
    void sendMessage_should_throw_exception_when_mailer_throws_exception() {
        String addresseeTo1 = "recipientTo1@example.com";

        List<String> addresseesTo = List.of(addresseeTo1);

        String emailSubject = "GREETINGS MAIL";
        String mailArgument = "Argument";

        NotificationRequest notificationRequest = new NotificationRequest(
                addresseesTo,
                emailSubject,
                mailArgument
        );

        String errorMessage = "Error";

        when(mailer.sendMail(any())).thenThrow(new NotificationException(errorMessage));

        String expectedFormattedMessage = "Argument";
        Recipient expectedRecipient = new Recipient(null, addresseeTo1, Message.RecipientType.TO);

        String expectedErrorMessage = format(
                "Mail sending error. Subject = {}, message = {}, addresses = {}, error = {}",
                emailSubject,
                expectedFormattedMessage,
                List.of(expectedRecipient),
                errorMessage
        );

        NotificationException exception = assertThrows(
                NotificationException.class,
                () -> notificationService.sendMessage(notificationRequest)
        );

        assertEquals(expectedErrorMessage, exception.getMessage());
    }
}