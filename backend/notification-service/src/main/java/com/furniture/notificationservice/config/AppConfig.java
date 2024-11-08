package com.furniture.notificationservice.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.ui.freemarker.FreeMarkerConfigurationFactoryBean;

@Configuration
public class AppConfig {
    @Bean
    public FreeMarkerConfigurationFactoryBean freeMarkerConfigurationFactoryBean(){
        final FreeMarkerConfigurationFactoryBean bean = new FreeMarkerConfigurationFactoryBean();
        bean.setTemplateLoaderPath("classpath:/templates");
        bean.setDefaultEncoding("UTF-8");
        return bean;
    }
}