package com.furniture.notificationservice.service.notification;

import com.furniture.notificationservice.exception.NotificationException;
import com.furniture.notificationservice.service.iface.NotificationService;
import jakarta.mail.Message;
import lombok.extern.slf4j.Slf4j;
import org.simplejavamail.api.email.Email;
import org.simplejavamail.api.email.Recipient;
import org.simplejavamail.api.mailer.Mailer;
import org.simplejavamail.email.EmailBuilder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.List;

import static com.furniture.notificationservice.util.StringUtil.format;

@Slf4j
@Service
public class NotificationServiceImpl implements NotificationService {
    private final Mailer mailer;

    // Sender address field
    @Value("${spring.mail.username}")
    private String from;

    public NotificationServiceImpl(
            Mailer mailer) {
        this.mailer = mailer;
    }

    // Sending a message via email.
    @Override
    public void sendMessage(NotificationRequest notificationRequest) {
        log.debug("Notification request = {}", notificationRequest);

        // Extracting information from a response from an external service
        final String subject = notificationRequest.subject();
        final String text = notificationRequest.text();
        final List<String> addressesTo = notificationRequest.addressesTo();

        if (addressesTo.isEmpty()) {
            throw new IllegalArgumentException("Must be at least 1 addressee");
        }

        // Converting a list of addresses into a list of Recipient objects.
        final List<Recipient> recipientsTo = getRecipients(notificationRequest.addressesTo());

        final var emailBuilder = EmailBuilder.startingBlank()
                .from(from)
                .to(recipientsTo)
                .withSubject(subject)
                .withHTMLText(text);

        final Email email = emailBuilder.buildEmail();

        int attempts = 0;
        boolean success = false;

        // 10 attempts before fail
        while (!success) {
            try {
                mailer.sendMail(email);
                log.info("Successful mail sending to: {}", email.getRecipients());
                success = true;
            } catch (Exception ex) {
                final String exceptionMessage = ex.getMessage();
                log.error(exceptionMessage);
                attempts++;

                if (attempts == 10) {
                    final String errorMessage = format(
                            "Mail sending error. Subject = {}, message = {}, addresses = {}, error = {}",
                            subject,
                            text,
                            recipientsTo,
                            exceptionMessage
                    );
                    throw new NotificationException(errorMessage);
                }
            }
        }
    }


    private List<Recipient> getRecipients(List<String> addressees) {
        return addressees.stream()
                .map(addressee -> new Recipient(null, addressee, Message.RecipientType.TO))
                .toList();
    }
}