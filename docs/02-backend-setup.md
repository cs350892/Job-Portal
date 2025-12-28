# 02. Backend Setup

The backend is built with **Node.js** and **Express.js**, following a clean MVC (Model-View-Controller) architecture.

## Folder Structure

```
backend/
├── app.js                      # Express app configuration
├── server.js                   # Server entry point
├── package.json                # Dependencies and scripts
├── config/
│   └── config.env              # Environment variables (not in git)
├── controllers/                # Business logic
│   ├── applicationController.js
│   ├── jobController.js
│   └── userController.js
├── database/
│   └── dbConnection.js         # MongoDB connection
├── middlewares/                # Express middlewares
│   ├── auth.js                 # JWT authentication
│   ├── catchAsyncError.js      # Async error wrapper
│   └── error.js                # Error handling middleware
├── models/                     # Mongoose schemas
│   ├── applicationSchema.js
│   ├── jobSchema.js
│   └── userSchema.js
├── routes/                     # API routes
│   ├── applicationRoutes.js
│   ├── jobRoutes.js
│   └── userRoutes.js
└── utils/
    └── jwtToken.js             # JWT token utilities
```

## Key Dependencies

The backend uses the following npm packages:

| Package | Purpose |
|---------|---------|
| `express` | Web framework for Node.js |
| `mongoose` | MongoDB ODM (Object Data Modeling) |
| `dotenv` | Load environment variables from .env file |
| `cors` | Enable Cross-Origin Resource Sharing |
| `bcrypt` | Password hashing |
| `jsonwebtoken` | JWT authentication |
| `cookie-parser` | Parse cookies from requests |
| `express-fileupload` | Handle file uploads (for resumes) |
| `cloudinary` | Cloud storage for uploaded files |
| `validator` | Data validation utilities |

## Architecture Overview

### 1. **app.js** - Application Configuration
- Configures Express middleware (CORS, JSON parsing, cookies, file uploads)
- Imports and mounts API routes
- Connects to MongoDB
- Adds global error handling middleware

### 2. **server.js** - Server Entry Point
- Configures Cloudinary for file storage
- Starts the Express server on the configured PORT

### 3. **MVC Pattern**
- **Models** (`models/`): Define database schemas using Mongoose
- **Controllers** (`controllers/`): Handle business logic and interact with models
- **Routes** (`routes/`): Define API endpoints and map them to controllers

### 4. **Middleware**
- **auth.js**: Verifies JWT tokens and protects routes
- **error.js**: Centralized error handling
- **catchAsyncError.js**: Wraps async functions to catch errors

## Installing Backend Dependencies

Navigate to the backend folder and install all dependencies:

```bash
cd backend
npm install
```

This will install all packages listed in `package.json`.

## Development vs Production

The backend supports both development and production modes:

- **Development**: Use `nodemon` for auto-restart on file changes
- **Production**: Use `node server.js` for stable production deployment

Add a `dev` script to `package.json` for development:

```json
"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js"
}
```

Then run in development mode with:

```bash
npm run dev
```

## Next Steps

Before running the backend, you need to:
1. Set up MongoDB (see `03-database-setup.md`)
2. Configure environment variables (see `04-env-configuration.md`)
3. Start the server (see `07-running-the-project.md`)

---
**Next:** `docs/03-database-setup.md`
