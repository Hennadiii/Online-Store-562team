
# Authentication Service

A microservice responsible for **user authentication, authorization, registration**, and **account management**. 
Built with **Spring Boot**, **JWT**, **PostgreSQL**, **Docker**,
and integrated with an external **Notification Service** 
for email communication.

## 🔧 Technologies

- Java 21
- Spring Boot
- Spring Security + JWT
- PostgreSQL
- Docker & Docker Compose
- REST API
- Swagger / OpenAPI 3
- Feign Client (Notification Service)
- JPA / Hibernate
- Jakarta Validation

## 📁 Project Structure

```text
authentication-service/
├── controller/         # REST API endpoints (AuthController)
├── dto/                # DTOs for requests and responses
├── exception/          # Custom exception handling
├── filter/             # JWT Authentication Filter
├── model/              # JPA entities (Person, Role, Token)
├── repository/         # Spring Data JPA repositories
├── security/           # Spring Security configuration
├── service/            # Business logic and integrations
├── resources/          # application.yml and static configs
├── Dockerfile
├── docker-compose.yaml
├── pom.xml
└── README.md
```


## 🚀 Getting Started

### Option 1: Using Docker Compose

docker-compose up --build

- App will be available at: `http://localhost:8080`
- PostgreSQL exposed on port `5432`

### Option 2: Manual Run (Local Environment)

1. Start a PostgreSQL server locally
2. Update `application.yml`:
    - `jdbc:postgresql://localhost:5432/auth_service_db`
3. Run the app:

./mvnw spring-boot:run

## 🔐 Features

- ✅ **User/Admin registration** with role assignment
- 🔑 **JWT login** and token refresh
- ✉️ **Email verification**, resend verification link
- 🔁 **Access/Refresh token rotation**
- 🔐 **Logout** with token invalidation
- 📩 **Forgot password flow** with a reset link via email
- 🛠️ **Change and verify new email**
- 👤 **Fetch user(s) by ID or list (admin only)**
- ⛔ **Block/Delete users** (admin only)

## 📦 API Documentation (Swagger)

 Swagger UI available at:  
> `http://localhost:8080/swagger-ui/index.html`

### Main Endpoints

| Method | Endpoint      | Description                   |
|--------|---------------|-------------------------------|
| POST   | `/auth/register` | Register a new user           |
| POST   | `/auth/admin-register` | Register an admin             |
| POST   | `/auth/login` | Authenticate user             |
| POST   | `/user/update-tokens` | Refresh access/refresh tokens |
| POST   | `/user/logout` | Logout and revoke token       |
| POST   | `/auth/forgot-password` | Send password reset email     |
| POST   | `/user/reset-password` | Reset password                |
| PATCH  | `/user/updateEmail/{email}` | Update user email             |
| GET    | `/user/verify` | Verify account                |
| GET    | `/user/verify-email` | Confirm email change          |
| GET    | `/admin/user/{id}` | Get user by ID (admin)        |
| GET    | `/admin/allUsers` | Get all users (admin)         |
| PATCH  | `/admin/block/{id}` | Block a user (admin)          |
| DELETE | `/admin/delete/{id}` | Delete a user (admin)         |

## ⚙️ Configuration

Before running the application, you must configure the .env file with all required environment variables.

Use the provided .env.example file as a template.

### `application.yml`

- `jwt.secret`: Base64-encoded JWT secret key
- `jwt.accessToken.expirationMs`: Lifetime of access token (ms)
- `jwt.refreshToken.expirationMs`: Lifetime of refresh token (ms)
- `server.port`: Set to your port for standalone mode

### Docker Environment Variables

Defined in `docker-compose.yaml`:
- `SPRING_DATASOURCE_URL`
- `SPRING_DATASOURCE_USERNAME`
- `SPRING_DATASOURCE_PASSWORD`

## 🛡️ Security

- Stateless authentication using **JWT**
- Fine-grained **role-based access control**
- **Input validation** using Jakarta Validation
- Expired tokens cleaned up automatically
- **Email verification** before login allowed

## 📬 Notification Integration

The service uses `NotificationServiceClient` to send:
- Verification emails
- Password reset links
- Email change confirmation links

## 🧪 Testing

> Unit and integration tests (JUnit + Mockito) can be added

## 🌐 Related Microservices

This `authentication-service` is designed to work as part of a **microservice architecture** and integrates with:

- API Gateway
- Notification Service
- User-facing frontend
- Other services (e.g., Product, Order)
```~~
