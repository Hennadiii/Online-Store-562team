# Notification Service
A Spring Boot application for handling email notifications using SMTP relay services.

## Prerequisites
- Docker and Docker Compose
- Java 21 (for local development)
- Maven (for local development)
- SMTP credentials
- Kafka broker (for message processing)


## Configuration

### Environment Variables
Create a `.env` file in the root directory with the following variables:
```
SMTP_HOST=<your smtp host>
SMTP_USER=<your smtp username>
SMTP_PASS=<your smtp password>
```

## Building and Running

### Using Docker Compose (Recommended)
1. Build and start the service:
```bash
docker compose up -d
```

2. Stop the service:
```bash
docker compose down
```

### Local Development
1. Build the project:
```bash
mvn clean package
```

2. Run the application:
```bash
java -jar target/notification-service.jar
```

## Project Structure

```
notification-service/
├── src/                  # Project code
├── .env                  # SMTP configuration (not in version control)
├── .env.example         # Template for environment variables
├── application.yml      # Spring Boot configuration
├── Dockerfile          # Multi-stage build definition
├── docker-compose.yml  # Docker service configuration
├── jsons/              # examples of jsons
└── pom.xml            # Maven dependencies and build config
```

## Server Configuration

- Server runs on port 777
- Uses UTF-8 encoding

## Docker Configuration

The service uses a multi-stage Docker build:
1. Stage 1: Maven build environment
2. Stage 2: Amazon Corretto 21 runtime on Alpine Linux
