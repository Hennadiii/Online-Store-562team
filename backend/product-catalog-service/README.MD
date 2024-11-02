# Product-catalog service

run application
- for development environment
  `mvn spring-boot:run -Dspring-boot.run.profiles=dev -Dspring-boot.run.arguments="--spring.main.banner-mode=off --logging.level.org.springframework.boot.docker.compose=DEBUG"`
- for production environment
`docker-compose up -d`
### Endpoints
To check all end points use swagger
  - swagger-ui: `http://localhost:8080/api/v1/swagger-ui.html`