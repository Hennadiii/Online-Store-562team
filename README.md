# 🚀 Next.js + Docker

Цей проект використовує **Docker** для контейнеризації Next.js-програми.

---

## 📌 1. Установка Docker

Перед початком роботи переконайтеся, що у вас встановлено **Docker** та **Docker Compose**.

- [Download Docker](https://www.docker.com/get-started/)

Перевірте встановлення за допомогою команд:

```sh
docker --version
docker-compose --version
```

---

## 🚀 2. Запуск проекту

### 📦 Складання та запуск контейнера

```sh
docker-compose up --build
```

### ▶ Запуск без перескладання

```sh
docker-compose up
```

### 🛑 Зупинка контейнера

```sh
docker-compose down
```

Після успішного запуску програма буде доступна за адресою:
**http://localhost:3001**

---

## 📂 3. Структура проекта

```
/project
  ├── /docker             # Конфигурация Docker
  │   ├── docker-compose.yml
  │   ├── Dockerfile
  │   ├── .dockerignore
  ├── /frontend           # Код фронтенда (Next.js)
  │   ├── package.json
  │   ├── src/app
  │   ├── .next
  │   └── ...
```

## 🎯 4. Запуск проекту для команди

1. **Клонуйте репозиторій:**

   ```sh
   git clone <посилання_на_репозиторій>
   cd project/docker
   ```

2. **Запустіть контейнер:**

   ```sh
   docker-compose up --build
   ```

Тепер будь-який член команди, у якого встановлено Docker, зможе зібрати та запустити проект, використовуючи ці інструкції.

---

# 🚀 Успішної роботи з Docker!
