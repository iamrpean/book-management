# 📚 Book Management API

A RESTful API built with Node.js, TypeScript, MongoDB, and Docker for managing a collection of books.

## 🚀 Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Run the App with Docker

```bash
docker-compose up -d --build
```

or

```bash
docker-compose up --build
```

The app will be available at:
📍 `http://localhost:3000`

---

## 📘 API Endpoints

Base URL: `/api/v1/books`

| Method | Endpoint      | Description       |
| ------ | ------------- | ----------------- |
| GET    | `/books`      | Get all books     |
| POST   | `/books`      | Create a new book |
| GET    | `/books/{id}` | Get book by ID    |
| PUT    | `/books/{id}` | Update a book     |
| DELETE | `/books/{id}` | Delete a book     |

---

## 📂 API Documentation

Swagger UI is available in development mode:
📄 Visit [`http://localhost:3000/api-docs`](http://localhost:3000/api-docs)

---

## 🧺 Running Unit Tests

```bash
docker-compose run --rm test
```

This will execute all Jest-based tests inside the `test` container.

---

## 🛆 Tech Stack

* Node.js + TypeScript
* Express.js
* MongoDB (via Docker)
* Jest & Supertest (for testing)
* Swagger (OpenAPI docs)
