package com.furniture.notificationservice.service.notification;

import com.furniture.notificationservice.exception.NotificationException;
import com.furniture.notificationservice.service.iface.MailTemplateManager;
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
import java.util.Locale;

import static com.furniture.notificationservice.util.StringUtil.format;

@Slf4j
@Service
public class NotificationServiceImpl implements NotificationService {
    private final MailTemplateManager mailTemplateManager;
    private final Mailer mailer;

    @Value("${spring.mail.username}")
    private String from;

    public NotificationServiceImpl(MailTemplateManager mailTemplateManager, Mailer mailer) {
        this.mailTemplateManager = mailTemplateManager;
        this.mailer = mailer;
    }

    @Override
    public void sendMessage(NotificationRequest notificationRequest) {
        log.debug("Notification request = {}", notificationRequest);

        final EmailSubject subject = notificationRequest.subject();
        final String templateString = mailTemplateManager.getTemplateString(subject);
        log.debug("Email template = {}", templateString);

        final List<?> args = notificationRequest.mailArguments();
        final String subjectHeader = subject.getSubjectText();
        final String formattedMessage = String.format(Locale.getDefault(), templateString, args.toArray());
        final List<NameAndEmail> addressesTo = notificationRequest.addressesTo();
        final List<NameAndEmail> addressesCc = notificationRequest.addressesCc();

        if (addressesTo.isEmpty()) {
            throw new IllegalArgumentException("Must be at least 1 addressee");
        }

        final List<Recipient> recipientsTo = getRecipients(notificationRequest.addressesTo(), Message.RecipientType.TO);

        final var emailBuilder = EmailBuilder.startingBlank()
                .from(from)
                .to(recipientsTo)
                .withSubject(subjectHeader)
                .withHTMLText(formattedMessage);

        if (!addressesCc.isEmpty()) {
            final List<Recipient> recipientsCc = getRecipients(
                    notificationRequest.addressesCc(),
                    Message.RecipientType.CC
            );
            emailBuilder.cc(recipientsCc);
        }

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
                            subjectHeader,
                            formattedMessage,
                            recipientsTo,
                            exceptionMessage
                    );
                    throw new NotificationException(errorMessage);
                }
            }
        }
    }

    private List<Recipient> getRecipients(List<NameAndEmail> addressees, Message.RecipientType type) {
        return addressees.stream()
                .map(addressee -> new Recipient(addressee.name(), addressee.email(), type))
                .toList();
    }
}