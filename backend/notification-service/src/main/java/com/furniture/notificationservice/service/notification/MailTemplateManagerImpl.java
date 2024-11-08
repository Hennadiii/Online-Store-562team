package com.furniture.notificationservice.service.notification;

import com.furniture.notificationservice.exception.NotificationException;
import com.furniture.notificationservice.service.iface.MailTemplateManager;
import freemarker.template.Configuration;
import freemarker.template.Template;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;

import java.io.IOException;

import static com.furniture.notificationservice.util.StringUtil.format;

@Component
public class MailTemplateManagerImpl implements MailTemplateManager {

    private final Configuration configuration;

    public MailTemplateManagerImpl(@Qualifier("freeMarkerConfigurationFactoryBean") Configuration configuration) {
        this.configuration = configuration;
    }

    @Override
    public String getTemplateString(EmailSubject notificationSubject) {
        final String subjectName = notificationSubject.name().toLowerCase();
        final String templateName = subjectName.concat(".html");
        final Template template = getTemplate(templateName);
        return template.toString();
    }

    private Template getTemplate(String name) {
        try {
            return configuration.getTemplate(name);
        } catch (IOException e) {
            final String errorMessage = format("Error while getting template: {}", e.getMessage());
            throw new NotificationException(errorMessage);
        }
    }
}