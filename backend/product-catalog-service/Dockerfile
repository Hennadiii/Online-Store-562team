FROM maven AS build

WORKDIR /product-catalog-service

COPY pom.xml .
COPY src ./src

RUN mvn clean package -DskipTests

FROM eclipse-temurin:17-jdk-jammy

WORKDIR /product-catalog-service

COPY --from=build /product-catalog-service/target/product_catalog-0.0.1-SNAPSHOT.jar /product-catalog.jar

EXPOSE 562

ENTRYPOINT ["java", "-jar", "/product-catalog.jar"]

