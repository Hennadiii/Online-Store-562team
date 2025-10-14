FROM maven:3.9.9-amazoncorretto-21 AS build

WORKDIR /notification-service

COPY pom.xml .
COPY src ./src

RUN mvn clean package

FROM amazoncorretto:21-alpine

WORKDIR /notification-service

COPY --from=build /notification-service/target/notification-service.jar /notification-service.jar

EXPOSE 777

ENTRYPOINT ["java", "-jar", "/notification-service.jar"]
