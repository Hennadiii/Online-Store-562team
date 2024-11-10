package com.furniture.notificationservice.config;

import org.simplejavamail.api.mailer.Mailer;
import org.simplejavamail.mailer.MailerBuilder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.ui.freemarker.FreeMarkerConfigurationFactoryBean;

@Configuration
public class AppConfig {
    @Value("${spring.mail.host}")
    private String smtpHost;

    @Value("${spring.mail.port}")
    private Integer smtpPort;

    @Value("${spring.mail.username}")
    private String smtpUser;

    @Value("${spring.mail.password}")
    private String smtpPass;

    @Bean
    public FreeMarkerConfigurationFactoryBean freeMarkerConfigurationFactoryBean(){
        final FreeMarkerConfigurationFactoryBean bean = new FreeMarkerConfigurationFactoryBean();
        bean.setTemplateLoaderPath("classpath:/templates");
        bean.setDefaultEncoding("UTF-8");
        return bean;
    }

    @Bean
    public Mailer getMailer() {
        return MailerBuilder
                .withSMTPServerHost(smtpHost)
                .withSMTPServerPort(smtpPort)
                .withSMTPServerUsername(smtpUser)
                .withSMTPServerPassword(smtpPass)
                .buildMailer();
    }
}