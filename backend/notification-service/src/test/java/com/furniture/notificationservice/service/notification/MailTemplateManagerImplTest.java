package com.furniture.notificationservice.service.notification;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

import com.furniture.notificationservice.exception.NotificationException;
import com.furniture.notificationservice.service.iface.MailTemplateManager;
import freemarker.template.Configuration;
import freemarker.template.Template;
import org.junit.jupiter.api.Test;

import java.io.IOException;

class MailTemplateManagerTest {
    final Configuration configuration = mock();
    final MailTemplateManager mailTemplateManager = new MailTemplateManagerImpl(configuration);

    @Test
    void getTemplateString_should_return_template_string() throws Exception {
        EmailSubject notificationSubject = EmailSubject.GREETINGS_MAIL;
        Template template = mock(Template.class);
        when(configuration.getTemplate(any())).thenReturn(template);
        when(template.toString()).thenReturn("Вміст шаблону привітання");

        String result = mailTemplateManager.getTemplateString(notificationSubject);

        assertEquals("Вміст шаблону привітання", result);
    }

    @Test
    void getTemplateString_should_throw_notificationException_if_getTemplate_throws_exception() throws Exception {
        EmailSubject notificationSubject = EmailSubject.GREETINGS_MAIL;
        when(configuration.getTemplate(any())).thenThrow(new IOException("Error"));

        NotificationException exception = assertThrows(
                NotificationException.class,
                () -> mailTemplateManager.getTemplateString(notificationSubject)
        );
        String expectedErrorMessage = "Error while getting template: Error";
        assertEquals(expectedErrorMessage, exception.getMessage());
    }
}