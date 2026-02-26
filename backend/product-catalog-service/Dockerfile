# ----------------------------
# 1. Stage: Build
# ----------------------------
FROM maven:3.9.9-eclipse-temurin-17 AS build

WORKDIR /app
COPY pom.xml .
COPY src ./src

# Собираем JAR, пропуская тесты для ускорения
RUN mvn clean package -DskipTests

# ----------------------------
# 2. Stage: Runtime
# ----------------------------
FROM eclipse-temurin:17-jdk-jammy

WORKDIR /app

# Копируем собранный JAR
COPY --from=build /app/target/*.jar app.jar

# Порт приложения (Railway задаёт через переменную PORT)
EXPOSE 8080

# Оптимизация JVM для малой памяти
# -Xmx256m = максимум 256MB
# -Xms128m = старт 128MB
# -Dserver.port=$PORT = динамический порт Railway
# -Djava.security.egd=file:/dev/./urandom = ускоряет генерацию случайных чисел (не блокирует стартап)
ENTRYPOINT ["sh", "-c", "java -Xmx256m -Xms128m -Dserver.port=$PORT -Djava.security.egd=file:/dev/./urandom -jar /app/app.jar"]