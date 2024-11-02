FROM alpine:latest

WORKDIR product-catalog-service

COPY target/*.so *.so
COPY target/product-catalog-service product-catalog-service

EXPOSE 8080/tcp

CMD ["./product-catalog-service"]