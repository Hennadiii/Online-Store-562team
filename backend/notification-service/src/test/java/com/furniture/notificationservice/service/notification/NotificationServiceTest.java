package com.furniture.notificationservice.service.notification;

import com.furniture.notificationservice.exception.NotificationException;
import com.furniture.notificationservice.service.iface.MailTemplateManager;
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
    final MailTemplateManager mailTemplateManager = mock();
    final NotificationService notificationService = new NotificationServiceImpl(
            mailTemplateManager,
            mailer
    );

    final String from = "test@example.com";

    @BeforeEach
    public void init() {
        ReflectionTestUtils.setField(notificationService, "from", from);
    }

    @Test
    void sendMessage_should_send_message_with_right_parameters() {
        NameAndEmail addresseeTo1 = new NameAndEmail("Joe", "recipientTo1@example.com");
        NameAndEmail addresseeTo2 = new NameAndEmail("Donald", "recipientTo2@example.com");

        NameAndEmail addresseeCc1 = new NameAndEmail(null, "recipientCc13@example.com");
        NameAndEmail addresseeCc2 = new NameAndEmail("Paul", "recipientCc23@example.com");

        List<NameAndEmail> addresseesTo = List.of(addresseeTo1, addresseeTo2);
        List<NameAndEmail> addresseesCC = List.of(addresseeCc1, addresseeCc2);

        EmailSubject emailSubject = EmailSubject.GREETINGS_MAIL;
        String mailArgument = "Argument";

        NotificationRequest notificationRequest = new NotificationRequest(
                addresseesTo,
                addresseesCC,
                emailSubject,
                List.of(mailArgument)
        );

        String expectedText = "<b>" + mailArgument + "</b>";

        when(mailTemplateManager.getTemplateString(any())).thenReturn("<b>%s</b>");

        notificationService.sendMessage(notificationRequest);

        List<Recipient> expectedRecipientsTo = List.of(
                new Recipient(addresseeTo1.name(), addresseeTo1.email(), Message.RecipientType.TO),
                new Recipient(addresseeTo2.name(), addresseeTo2.email(), Message.RecipientType.TO)
        );

        List<Recipient> expectedRecipientsCc = List.of(
                new Recipient(addresseeCc1.name(), addresseeCc1.email(), Message.RecipientType.CC),
                new Recipient(addresseeCc2.name(), addresseeCc2.email(), Message.RecipientType.CC)
        );

        final Email expectedEmail = EmailBuilder.startingBlank()
                .from(from)
                .to(expectedRecipientsTo)
                .cc(expectedRecipientsCc)
                .withSubject(emailSubject.getSubjectText())
                .withHTMLText(expectedText)
                .buildEmail();


        ArgumentCaptor<Email> messageCaptor = ArgumentCaptor.forClass(Email.class);
        verify(mailer).sendMail(messageCaptor.capture());
        Email actualEmail = messageCaptor.getValue();
        assertEquals(expectedEmail, actualEmail);
    }

    @Test
    void sendMessage_should_throw_exception_when_mailer_throws_exception() {
        NameAndEmail addresseeTo1 = new NameAndEmail("Joe", "recipientTo1@example.com");

        List<NameAndEmail> addresseesTo = List.of(addresseeTo1);

        EmailSubject emailSubject = EmailSubject.GREETINGS_MAIL;
        String mailArgument = "Argument";

        NotificationRequest notificationRequest = new NotificationRequest(
                addresseesTo,
                List.of(),
                emailSubject,
                List.of(mailArgument)
        );

        String errorMessage = "Error";

        when(mailTemplateManager.getTemplateString(any())).thenReturn("<b>%s</b>");
        when(mailer.sendMail(any())).thenThrow(new NotificationException(errorMessage));

        String expectedFormattedMessage = "<b>Argument</b>";
        Recipient expectedRecipient = new Recipient(addresseeTo1.name(), addresseeTo1.email(), Message.RecipientType.TO);

        String expectedErrorMessage = format(
                "Mail sending error. Subject = {}, message = {}, addresses = {}, error = {}",
                emailSubject.getSubjectText(),
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