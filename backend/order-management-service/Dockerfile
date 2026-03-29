FROM maven AS build

WORKDIR /order-management-service

COPY pom.xml .
COPY src ./src

RUN mvn clean package -DskipTests

FROM eclipse-temurin:17-jdk-jammy

WORKDIR /

COPY --from=build /order-management-service/target/order-management-service-0.0.1-SNAPSHOT.jar /order-management-service.jar

EXPOSE 562

ENTRYPOINT ["java", "-jar", "/order-management-service.jar"]

