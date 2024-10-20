
# Authentication System

A full-stack authentication system built with Express.js (backend) and Vite-React.js (frontend). This project provides secure user authentication using JWT and integrates with MongoDB for data storage. It includes features like signup, login, email verification, password reset, and protected routes.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Project](#running-the-project)
- [Folder Structure](#folder-structure)
- [Endpoints](#endpoints)

---

## Features

- User registration, login, and logout functionality.
- Email verification system.
- Password reset and forgot password flow.
- MongoDB integration for data storage.
- Token-based authentication using JWT.
- Responsive UI with React (Vite).
- Protected routes for authenticated users.

## Tech Stack

- **Backend**: Node.js, Express.js
- **Frontend**: Vite, React.js
- **Database**: MongoDB
- **Authentication**: JSON Web Tokens (JWT)
- **Email Service**: Mailtrap (for testing email functionality)
- **Environment Configuration**: dotenv

## Prerequisites

Ensure you have the following installed on your system:

- **Node.js**: [Download Node.js](https://nodejs.org/en/download/)
- **npm**: Node.js package manager (comes with Node.js)
- **MongoDB**: [Sign up for MongoDB Atlas](https://www.mongodb.com/cloud/atlas) or use a local instance.
- **Mailtrap Account**: [Sign up for Mailtrap](https://mailtrap.io/) for email testing.

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/Amxn-2/AUTH-SYSTEM.git
cd AUTH-SYSTEM
```

### 2. Install Dependencies

#### 🔧 Backend Setup
Navigate to the backend folder and install dependencies:

```bash
cd backend
npm install
```

#### 🌐 Frontend Setup
Now, navigate to the frontend folder and install the necessary dependencies:

```bash
cd ../frontend
npm install
```

## Environment Variables

You need to set up environment variables to run the project. Create a `.env` file in the `backend` directory with the following content:

```plaintext
MONGO_URI=<Your MongoDB URI>
PORT=5000
JWT_SECRET=mysecretkey
NODE_ENV=development
MAILTRAP_TOKEN=<Your Mailtrap Token>
MAILTRAP_ENDPOINT=<Your Mailtrap API Endpoint>
CLIENT_URL=http://localhost:5173
```
Replace the placeholder values with your actual credentials and tokens:

- `MONGO_URI`: The connection string to your MongoDB instance.
- `JWT_SECRET`: A secret key for signing JWT tokens.
- `MAILTRAP_TOKEN`: Your Mailtrap API token for testing email functionality.
- `MAILTRAP_ENDPOINT`: The Mailtrap API endpoint.
- `CLIENT_URL`: The URL where your frontend app will be hosted (default: `http://localhost:5173`).


## Running the Project

### Backend

1. Start the backend server:

   ```bash
   cd backend
   node index.js
   ```

   The backend will run on `http://localhost:5000`.

### Frontend

1. Start the frontend development server:

   ```bash
   cd ../frontend
   npm run dev
   ```

   The frontend will run on `http://localhost:5173`.

## Endpoints

Here are the key endpoints provided by this system:

- **🔐 Signup Endpoint**: `POST /api/signup` - Registers a new user.
- **📧 Sending Verify Account Email**: `POST /api/send-verify-email` - Sends an email verification link to the user.
- **🔍 Verify Email Endpoint**: `GET /api/verify-email/:token` - Verifies the user’s email address.
- **🔑 Login Endpoint**: `POST /api/login` - Authenticates the user and starts a session.
- **✔️ Check Auth Endpoint**: `GET /api/check-auth` - Validates if the user is authenticated.
- **🚪 Logout Endpoint**: `POST /api/logout` - Logs out the user and ends the session.
- **🔄 Forgot Password Endpoint**: `POST /api/forgot-password` - Sends a reset password link to the user’s email.
- **🔁 Reset Password Endpoint**: `POST /api/reset-password` - Allows the user to reset their password.

## Frontend Features

- **📋 Signup Page UI**: A responsive user interface for registering new users.
- **🔓 Login Page UI**: User-friendly login page to authenticate users.
- **✅ Email Verification Page UI**: Interface for users to verify their email address.
- **🏠 Dashboard Page**: A protected dashboard page, only accessible after login.
- **🔄 Implementing Forgot Password**: Forgot password functionality with email verification.
- **📤 Implementing Signup**: Sign up form connected to the backend.
- **📧 Implementing Email Verification**: Frontend for verifying user emails.
- **🔒 Protecting Our Routes**: Route protection for the frontend, ensuring only authenticated users can access certain pages.

## Folder Structure

Here's the structure of the project:

```
AUTH-SYSTEM/
├── backend/                # Backend folder
│   ├── .env                # Environment variables for backend (not pushed to Git)
│   ├── controllers/        # Route controllers
│   ├── models/             # MongoDB models
│   ├── routes/             # API routes
│   ├── db/                 # Database connection setup
│   ├── utils/              # Utility functions
│   ├── mailtrap/           # Mailtrap email service configuration
│   ├── middleware/         # Middleware functions (authentication, error handling, etc.)
│   └── index.js            # Server entry point
├── frontend/               # Frontend folder
│   ├── public/             # Public assets (e.g., images, favicon)
│   ├── src/                # Source code for React app
│   ├── index.html          # Frontend entry point
│   └── vite.config.js      # Vite configuration
├── .gitignore              # Git ignore file for specifying ignored files and folders
└── README.md               # Project documentation (this file)
```

