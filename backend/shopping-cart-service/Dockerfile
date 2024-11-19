# Вказуємо базовий образ, який містить JDK для запуску Spring Boot
FROM openjdk:17-jdk-slim

# Додаємо тимчасову змінну для порту
ENV PORT 9080

# Вказуємо робочий каталог для Docker-контейнера
WORKDIR /shopping-cart-service

# Копіюємо jar-файл, який буде виконуватись
COPY target/shopping-cart-service-0.0.1-SNAPSHOT.jar shopping-cart-service.jar

# Відкриваємо порт 8080
EXPOSE 9080

# Вказуємо команду для запуску програми
ENTRYPOINT ["java", "-jar", "shopping-cart-service.jar"]