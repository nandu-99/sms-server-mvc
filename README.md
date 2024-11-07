# Backend API Documentation

This document provides an overview of the available endpoints for the backend, covering authentication, user profile, leave requests, and contest management.

## Base URL

All requests are made to the base URL: 
```
https://sms-server-mvc.vercel.app/
```

---

### Environment Variables

Here's an example `.env` file with essential variables for configuration:

```bash
# JWT Secret
JWT_SECRET=your_jwt_secret_key

# Database URL
DATABASE_URL=mysql://username:password@localhost:3306/your_db_name

# Email
EMAIL_USER = "abc@gmail.com"

# Email App pass
EMAIL_PASS = ""
```

---

## Authentication Endpoints

1. **Register a new user**
   - **POST** `/auth/register`
   - Request body should contain user details like `name`, `email`, `password`, `role`.

2. **Log in and receive a JWT token**
   - **POST** `/auth/login`
   - Request body should contain `email` and `password` and `role`. Returns a JWT token upon successful login.

3. **Log out the user by invalidating the token**
   - **POST** `/auth/logout`
   - Invalidates the current user's JWT token as Bearer Token.

---

## User Profile Endpoints

1. **Get the profile details of the logged-in user**
   - **GET** `/profile`
   - Requires JWT token as Bearer Token for authentication.

2. **Update user profile details**
   - **PUT** `/profile/update`
   - Requires JWT token as Bearer Token for authentication, with updated profile details in the body.

---

## Leave Request Endpoints

1. **Create a leave request**
   - **POST** `/leave`
   - Requires JWT token as Bearer Token, with a leave request payload in the request body.

2. **Fetch all leave requests for the logged-in user**
   - **GET** `/leave`
   - Requires JWT token as Bearer Token.

3. **Delete a leave request**
   - **DELETE** `/leave/:leaveRequestId`
   - Requires JWT token as Bearer Token, with the ID of the leave request to delete.

---

## Contests Endpoints

1. **Create a new contest**
   - **POST** `/contests/create`
   - Requires JWT token as Bearer Token, with contest details in the request body.

2. **Fetch all contests**
   - **GET** `/contests`
   - Requires JWT token as Bearer Token.

3. **Fetch a specific contest by ID**
   - **GET** `/contests/:contestId`
   - Requires JWT token as Bearer Token and the contest ID.

4. **Update a contest**
   - **PUT** `/contests/:contestId`
   - Requires JWT token as Bearer Token, with the contest ID and updated details in the request body.

5. **Delete a contest**
   - **DELETE** `/contests/:contestId`
   - Requires JWT token as Bearer Token, with the contest ID to delete.

---

## Authorization

- All endpoints require a valid JWT token as Bearer Token, which can be acquired through the `/auth/login` endpoint.
- Ensure to pass the token as a Bearer Token in the `Authorization` header for protected routes.

---
