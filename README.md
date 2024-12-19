# Shop-en-Nuage

This project demonstrates a simple application deployed on Azure using Terraform. Students will fork this repository to complete their assignments.

      
## Table of Contents
- [Summary](#summary-using-the-api)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Entities](#entities)
- [Controllers and Endpoints](#controllers-and-endpoints)
- [Authentication Requirements](#authentication-requirements)
- [Setup Instructions](#setup-instructions)

## Summary: Using the API
#### Base API url : https://shop-en-nuage-app.azurewebsites.net/

### Route Summary

| HTTP Method | Route | Description | Authentication Required |
| -------------| ------------- | ------------- | ------------- |
| POST | `user/` | Create new user | ❌ |
| POST | `user/login` | Login (Get authorisation JWT) | ❌ |
| GET | `user/profile` | Get profile detail | ✅ |
| POST | `item` | Add a new item | ✅ |
| GET | `item` | Get all items | ✅ |
| GET | `item/:id` | Get item with id | ✅ |
| GET | `item/:id/add-to-basket | Add item to my basket | ✅ |
| PATCH | `item/:id` | Update item | ✅ |
| DELETE | `item/:id` | Delete item | ✅ |
| GET | `basket/` | Get my basket | ✅ |

## Project Structure

- `api/`: Contains the NestJS application code.
- `infrastructure/`: Contains the Terraform code to provision Azure infrastructure.
- `.github/`: Contains GitHub Actions workflows for CI/CD.

## API Documentation

This API provides functionality for managing users, baskets, and items. Below is a detailed description of the entities, their relationships, and available endpoints.

## Entities

### User

- Represents an individual user of the system.
- Each user automatically has a basket created for them upon signup.

### Basket

- Represents a collection of items a user user wants to buy.
- Each user has exactly one basket associated with them.

### Item

- Represents an item that can be created by any user.
- Items are not linked to the creator and can be added to any user's basket.

---

## Controllers and Endpoints

### **User Controller**

#### **POST /user/**

- **Description**: Creates a new user account.
- **Request Body**:
  ```json
  {
    "email": "user@example.com",
    "username": "user123",
    "password": "password123"
  }
  ```
- **Response**:
  ```json
  {
    "email": "user@example.com",
    "username": "user123"
  }
  ```
- **Authentication**: Not required.

#### **POST /user/login**

- **Description**: Authenticates the user and returns a JWT token.
- **Request Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```
- **Response**:
  ```json
  {
    "username": "user123",
    "email": "user@example.com",
    "token": "jwt_token"
  }
  ```
- **Authentication**: Not required.

#### **GET /user/profile**

- **Description**: Returns the profile information of the authenticated user.
- **Response**:
  ```json
  {
    "_id": "user123",
    "username": "username",
    "email": "user@example.com",
    "createdAt": "2024-12-15T00:00:00.000Z",
    "updatedAt": "2024-12-15T00:00:00.000Z",
    "__v": 0,
    "basket": {
      "_id": "basket123",
      "items": [],
      "createdAt": "2024-12-15T00:00:00.000Z",
      "updatedAt": "2024-12-15T00:00:00.000Z",
      "__v": 0
    }
  }
  ```
- **Authentication**: Required.

---

### **Basket Controller**

#### **GET /basket**

- **Description**: Returns the basket associated with the authenticated user.
- **Response**:
  ```json
  {
    "_id": "basket123",
    "items": [
      {
        "id": "uuid",
        "name": "item_name",
        "description": "item_description",
        "price": 100
      }
    ],
    "createdAt": "2024-12-15T00:00:00.000Z",
    "updatedAt": "2024-12-15T00:00:00.000Z",
    "__v": 0
  }
  ```
- **Authentication**: Required.

---

### **Item Controller**

#### **POST /item**

- **Description**: Creates a new item.
- **Request Body**:
  ```json
  {
    "name": "item_name",
    "description": "item_description",
    "price": 100
  }
  ```
- **Response**:
  ```json
  {
    "id": "item123",
    "name": "item_name",
    "description": "item_description",
    "price": 100
  }
  ```
- **Authentication**: Required.

#### **GET /item/:id**

- **Description**: Retrieves the details of a specific item by ID.
- **Response**:
  ```json
  {
    "id": "item123",
    "name": "item_name",
    "description": "item_description",
    "price": 100
  }
  ```
- **Authentication**: Required.

#### **PUT /item/:id**

- **Description**: Updates an existing item by ID.
- **Request Body**:
  ```json
  {
    "name": "updated_name",
    "description": "updated_description",
    "price": 150
  }
  ```
- **Response**:
  ```json
  {
    "id": "item123",
    "name": "updated_name",
    "description": "updated_description",
    "price": 150
  }
  ```
- **Authentication**: Required.

#### **DELETE /item/:id**

- **Description**: Deletes a specific item by ID.
- **Response**:
  ```json
  {
    "message": "Item deleted successfully."
  }
  ```
- **Authentication**: Required.

#### **POST /item/:item_id/add-to-basket**

- **Description**: Adds a specific item to the authenticated user's basket.
- **Response**:
  ```json
  {
    "_id": "basket123",
    "items": [
      {
        "id": "item123",
        "name": "item_name",
        "description": "item_description",
        "price": 100
      }
    ],
    "createdAt": "2024-12-15T00:00:00.000Z",
    "updatedAt": "2024-12-15T00:00:00.000Z",
    "__v": 0
  }
  ```
- **Authentication**: Required.

---

## Authentication Requirements

### Public Routes (No Authentication Required):

- **User Controller**: `/user/`, `/user/login`

### Protected Routes (Authentication Required):

- All other routes require a valid JWT token in the `Authorization` header:
  ```
  Authorization: Bearer jwt_token
  ```

---

## Setup Instructions

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/your-repo/nest-api.git
   cd nest-api
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file and add the following:

   ```env
   DATABASE_URL=your_database_url
   JWT_SECRET=your_jwt_secret
   PORT=3000
   ```

4. **Run the Application**:

   ```bash
   npm run start
   ```

5. **Access the API**:
   - Base URL: `http://localhost:3000`

---
