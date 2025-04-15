# Skillhub API

A Node.js RESTful API for managing users (consumers and skilled persons) with authentication, built with Express, MongoDB, Passport, and Joi validation.

## Features

- User registration for both consumers and skilled persons
- JWT-based authentication (signup/signin)
- User CRUD operations (get, update, delete)
- Role-based user fields
- Input validation using Joi
- Password hashing with bcrypt
- MongoDB (Mongoose) integration

## Project Structure

```
.
├── app.js
├── .env
├── package.json
├── Auth/
│   └── auth.js
├── controller/
│   ├── authcontroller.js
│   └── userController.js
├── database/
│   └── db.js
├── Middleware/
│   └── validator.js
├── models/
│   └── User.js
├── routes/
│   ├── authentication.js
│   └── userRoutes.js
```

## Getting Started

### Prerequisites

- Node.js (v14+)
- MongoDB database (local or Atlas)

### Installation

1. Clone the repository:
   ```sh
   git clone <your-repo-url>
   cd skillhub-api
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Create a `.env` file in the root directory and set:
   ```
   PORT=4000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```

4. Start the server:
   ```sh
   node app.js
   ```
   or with nodemon:
   ```sh
   npx nodemon app.js
   ```

## API Endpoints

### Authentication

#### Signup

- **POST** `/api/auth/signup`
- **Body (consumer):**
  ```json
  {
    "role": "consumer",
    "full_name": "Jane Doe",
    "email": "jane@example.com",
    "password": "yourpassword",
    "bio": "Short bio",
    "address": "123 Main St"
  }
  ```
- **Body (skilled):**
  ```json
  {
    "role": "skilled",
    "full_name": "John Smith",
    "email": "john@example.com",
    "password": "yourpassword",
    "skill": "Plumbing",
    "areas_of_expertise": ["Pipes", "Faucets"],
    "address": "456 Elm St",
    "service_area": "Lagos",
    "bvn": "12345678901"
  }
  ```

#### Signin

- **POST** `/api/auth/signin`
- **Body:**
  ```json
  {
    "email": "jane@example.com",
    "password": "yourpassword"
  }
  ```

### Users

#### Get User

- **GET** `/api/users/:id`

#### Create User

- **POST** `/api/users`
- (Same body as signup)

#### Update User

- **PUT** `/api/users/:id`
- Requires JWT in `Authorization: Bearer <token>` header

#### Delete User

- **DELETE** `/api/users/:id`
- Requires JWT in `Authorization: Bearer <token>` header

## Authentication

- After signing in, use the returned JWT token in the `Authorization` header for protected routes:
  ```
  Authorization: Bearer <your_token>
  ```

## Validation

- All input is validated using Joi schemas in [`Middleware/validator.js`](Middleware/validator.js).

## License

MIT
