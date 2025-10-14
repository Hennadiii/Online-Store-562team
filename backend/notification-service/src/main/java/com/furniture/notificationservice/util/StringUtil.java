package com.furniture.notificationservice.util;

import org.apache.logging.log4j.message.ParameterizedMessage;

public class StringUtil {
    private StringUtil() {}

    public static String format(String template, Object... objects) {
        final var message = new ParameterizedMessage(template, objects);
        return message.getFormattedMessage();
    }
}