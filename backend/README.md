Backend Developer Internship Assignment
👨‍💻 Project Overview

This project is a secure and scalable REST API built using Node.js, Express, and MongoDB.
It includes authentication using JWT and role-based access control.

A basic React frontend is integrated to test and interact with the APIs.

🚀 Tech Stack

Backend:

Node.js

Express.js

MongoDB (MongoDB Atlas)

JWT Authentication

Bcrypt (Password Hashing)

Helmet (Security)

Morgan (Logging)

Express Rate Limit

Swagger (API Documentation)

Frontend:

React (Vite)

Axios

React Router

🔐 Features
Authentication

User Registration

User Login

Password Hashing using bcrypt

JWT-based Authentication

Role-based Access Control (User / Admin)

Task Management

Create Task

Get All Tasks (Logged-in User)

Delete Task

Protected Routes

🛡 Security Implemented

Password hashing

JWT token authentication

Role-based authorization

Helmet security headers

Rate limiting (prevents brute-force attacks)

Global error handling

Input validation

📄 API Documentation

Swagger documentation available at:

http://localhost:5000/api-docs

🏗 Project Structure

backend/
│
├── config/
├── controllers/
├── middleware/
├── models/
├── routes/
├── utils/
├── swagger.js
├── server.js
└── .env

⚙️ Setup Instructions

Clone the repository

Install dependencies

npm install

Create a .env file in backend folder

Add the following:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

Run the server

npm run dev

Server will start at:

http://localhost:5000

🌐 Frontend Setup

Go to frontend folder

cd frontend

Install dependencies

npm install

Run frontend

npm run dev

Frontend will run at:

http://localhost:5173

🚀 Scalability & Architecture Note
1️⃣ Microservices Architecture

The project follows a modular structure (controllers, routes, middleware, models), making it easy to separate into microservices like:

Authentication Service

Task Service

User Service

Each service can scale independently.

2️⃣ Load Balancing

In production, the backend can run behind:

NGINX

AWS Load Balancer

Multiple Node.js instances can handle high traffic efficiently.

3️⃣ Caching (Redis)

Redis can be added to:

Cache frequently accessed task data

Improve performance

Reduce database load

4️⃣ Database Optimization

Index on email field

Index on user field in tasks

Pagination support for large datasets

5️⃣ Docker Deployment

The project can be containerized using:

Dockerfile

Docker Compose (Backend + MongoDB)

6️⃣ CI/CD

CI/CD can be implemented using:

GitHub Actions

Automated testing

Auto deployment to cloud platforms