# 04. Environment Variables Configuration

Environment variables store sensitive configuration data that should **never** be committed to version control.

## Required Environment Variables

The backend requires a `config.env` file located at [`backend/config/config.env`](../backend/config/config.env).

### Complete List of Variables

| Variable | Description | Example Value |
|----------|-------------|---------------|
| `PORT` | Port number for backend server | `4000` |
| `DB_URL` | MongoDB connection string | `mongodb://localhost:27017` or Atlas URL |
| `JWT_SECRET_KEY` | Secret key for JWT token signing | `your_super_secret_jwt_key_here_123` |
| `JWT_EXPIRE` | JWT token expiration time | `7d` (7 days) |
| `FRONTEND_URL` | Frontend application URL for CORS | `http://localhost:5173` |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name for file uploads | `your_cloud_name` |
| `CLOUDINARY_API_KEY` | Cloudinary API key | `123456789012345` |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret | `your_cloudinary_secret` |
| `NODE_ENV` | Environment mode | `development` or `production` |

## Setting Up Environment Variables

### Step 1: Create the Config Folder

```bash
cd backend
mkdir config
```

### Step 2: Create `config.env` File

Create a file at `backend/config/config.env` with the following content:

```env
# Server Configuration
PORT=4000
NODE_ENV=development

# Database Configuration
DB_URL=mongodb://localhost:27017

# JWT Configuration
JWT_SECRET_KEY=my_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:5173

# Cloudinary Configuration (for resume uploads)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### Step 3: Get Cloudinary Credentials

1. Go to [Cloudinary](https://cloudinary.com/) and sign up for a free account
2. After logging in, go to the **Dashboard**
3. Copy these values:
   - **Cloud Name**
   - **API Key**
   - **API Secret**
4. Paste them into your `config.env` file

### Step 4: Configure MongoDB URL

**For Local MongoDB:**
```env
DB_URL=mongodb://localhost:27017
```

**For MongoDB Atlas:**
```env
DB_URL=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

Replace `username` and `password` with your MongoDB Atlas credentials.

## Detailed Variable Explanations

### `PORT`
- **What it is**: The port number your backend server listens on
- **Default**: `4000`
- **Why**: Separates backend (4000) from frontend (5173) for development

### `DB_URL`
- **What it is**: MongoDB connection string
- **Format (Local)**: `mongodb://localhost:27017`
- **Format (Atlas)**: `mongodb+srv://username:password@cluster.mongodb.net/`
- **Why**: Tells Mongoose where to connect to the database

### `JWT_SECRET_KEY`
- **What it is**: Secret key used to sign and verify JWT tokens
- **Security**: MUST be a long, random string in production
- **Why**: Used for user authentication and authorization
- **Example**: `kj3h4kj5h6kj3h45k6jh34k5jh6k3j4h56k3jh4`

### `JWT_EXPIRE`
- **What it is**: How long a JWT token remains valid
- **Format**: `7d` (7 days), `24h` (24 hours), `30m` (30 minutes)
- **Why**: Auto-logs out users after this duration

### `FRONTEND_URL`
- **What it is**: URL where your React app runs
- **Development**: `http://localhost:5173` (Vite default)
- **Production**: Your deployed frontend URL
- **Why**: Required for CORS (Cross-Origin Resource Sharing) to allow frontend to call backend APIs

### `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`
- **What it is**: Credentials for Cloudinary cloud storage
- **Why**: Used to upload and store resume/CV files
- **How to get**: Sign up at [cloudinary.com](https://cloudinary.com) and copy from dashboard

### `NODE_ENV`
- **What it is**: Indicates if app is in development or production
- **Values**: `development` or `production`
- **Why**: Can be used to enable/disable certain features (logging, error details, etc.)

## Loading Environment Variables

The backend loads environment variables using the `dotenv` package:

```javascript
import { config } from "dotenv";
config({ path: "./config/config.env" });
```

This is done in [`backend/app.js`](../backend/app.js#L13) before any variables are used.

## Security Best Practices

1. ✅ **NEVER** commit `config.env` to Git (it's in `.gitignore`)
2. ✅ Use strong, random values for `JWT_SECRET_KEY` in production
3. ✅ Use environment-specific values (different secrets for dev vs prod)
4. ✅ Keep Cloudinary secrets private
5. ✅ Use MongoDB Atlas with strong passwords

## Example File for Reference

A `.env.example` file at the root provides a template (see next section).

---
**Next:** `docs/05-frontend-setup.md`
