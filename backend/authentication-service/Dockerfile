FROM maven:3.9.9-eclipse-temurin-21 AS build

WORKDIR /authentication-service

COPY pom.xml .
RUN mvn dependency:go-offline -q

COPY src ./src
RUN mvn clean package -DskipTests

FROM amazoncorretto:21

WORKDIR /app

COPY --from=build /authentication-service/target/authentication-service.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]