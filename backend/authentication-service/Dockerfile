FROM maven AS build

WORKDIR /authentication-service

COPY pom.xml .
COPY src ./src

RUN mvn clean package -DskipTests

FROM eclipse-temurin:17-jdk-jammy

WORKDIR /authentication-service

COPY --from=build /authentication-service/target/authentication-service.jar /authentication-service.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "/authentication-service.jar"]

