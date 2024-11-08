package com.furniture.notificationservice.service.notification;

import com.furniture.notificationservice.exception.NotificationException;
import com.furniture.notificationservice.service.iface.MailTemplateManager;
import com.furniture.notificationservice.service.iface.NotificationService;
import jakarta.mail.internet.MimeMessage;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.List;
import java.util.Locale;

import static com.furniture.notificationservice.util.StringUtil.format;

@Slf4j
@Service
public class NotificationServiceImpl implements NotificationService {
    private final JavaMailSender javaMailSender;
    private final MailTemplateManager mailTemplateManager;

    @Value("${spring.mail.username}")
    private String from;
    public NotificationServiceImpl(JavaMailSender javaMailSender, MailTemplateManager mailTemplateManager) {
        this.javaMailSender = javaMailSender;
        this.mailTemplateManager = mailTemplateManager;
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
        final var addresses = notificationRequest.addressesTo();
        send(addresses, subjectHeader, formattedMessage);
    }

    private void send(
            Collection<String> addresses,
            String subjectText,
            String messageText
    ) {
        int attempts = 0;
        boolean success = false;

        while (!success) {
            try {
                final MimeMessage mimeMessage = prepareMessage(addresses, subjectText, messageText);
                javaMailSender.send(mimeMessage);
                log.info("Successful mail sending to: {}", addresses);
                success = true;
            } catch (Exception ex) {
                final String exceptionMessage = ex.getMessage();
                log.error(exceptionMessage);
                attempts++;

                if (attempts == 10) {
                    final String errorMessage = format(
                            "Mail sending error. Subject = {}, message = {}, addresses = {}, error = {}",
                            subjectText,
                            messageText,
                            addresses,
                            exceptionMessage
                    );
                    throw new NotificationException(errorMessage);
                }
            }
        }
    }

    private MimeMessage prepareMessage(Collection<String> emailsTo, String subject, String message) {
        final MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        try {
            final MimeMessageHelper helper = new MimeMessageHelper(
                    mimeMessage,
                    MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED,
                    "utf-8"
            );
            if (emailsTo.size() > 1) {
                helper.setTo(emailsTo.toArray(new String[0]));
            } else {
                helper.setTo(emailsTo.iterator().next());
            }

            helper.setFrom(from);
            helper.setSubject(subject);

            helper.setText(message, true);
        } catch (Exception e) {
            throw new NotificationException(e.getMessage());
        }

        return mimeMessage;
    }
}