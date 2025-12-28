# 07. Running the Project

This guide provides step-by-step instructions to run the Job Portal project on your local machine.

## Prerequisites

Before starting, ensure you have:

1. ✅ **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
2. ✅ **MongoDB** - Either:
   - Local installation - [Download here](https://www.mongodb.com/try/download/community)
   - OR MongoDB Atlas account (cloud) - [Sign up here](https://www.mongodb.com/cloud/atlas)
3. ✅ **Cloudinary account** - [Sign up here](https://cloudinary.com/)
4. ✅ **Git** (optional but recommended)

## Quick Start

Follow these steps to get the project running:

### Step 1: Clone or Download the Project

If using Git:
```bash
git clone <repository-url>
cd Job-Portal
```

Or download and extract the ZIP file, then navigate to the project folder.

---

### Step 2: Backend Setup

#### 2.1 Navigate to Backend Folder
```bash
cd backend
```

#### 2.2 Install Dependencies
```bash
npm install
```

This will install all packages listed in `package.json`.

#### 2.3 Create Config Folder
```bash
mkdir config
```

#### 2.4 Create Environment Variables File

Create a file `backend/config/config.env` with the following content:

```env
# Server Configuration
PORT=4000
NODE_ENV=development

# Database Configuration
DB_URL=mongodb://localhost:27017

# JWT Configuration
JWT_SECRET_KEY=my_super_secret_jwt_key_change_this
JWT_EXPIRE=7d

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:5173

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

**Important**: Replace the Cloudinary credentials with your actual values from your Cloudinary dashboard.

**For MongoDB Atlas**: Replace `DB_URL` with your Atlas connection string:
```env
DB_URL=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

#### 2.5 Add Dev Script (Optional but Recommended)

Open `backend/package.json` and update the scripts section:

```json
"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js"
}
```

#### 2.6 Start the Backend Server

**Option 1: Development Mode (with auto-restart)**
```bash
npm run dev
```

**Option 2: Production Mode**
```bash
npm start
```

**Expected Output:**
```
MongoDB Connected Successfully!
Server running at port 4000
```

✅ **Backend is now running at http://localhost:4000**

---

### Step 3: Frontend Setup

#### 3.1 Open a New Terminal

Keep the backend running and open a **new terminal** window/tab.

#### 3.2 Navigate to Frontend Folder
```bash
cd frontend
```

(If you're still in the backend folder, use `cd ../frontend`)

#### 3.3 Install Dependencies
```bash
npm install
```

#### 3.4 Start the Frontend Development Server
```bash
npm run dev
```

**Expected Output:**
```
VITE v5.0.8  ready in 500 ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

✅ **Frontend is now running at http://localhost:5173**

---

### Step 4: Access the Application

1. Open your browser
2. Navigate to **http://localhost:5173**
3. You should see the Job Portal home page

---

## Verification Checklist

Use this checklist to verify everything is working:

### Backend Verification

- [ ] Backend server starts without errors
- [ ] You see "MongoDB Connected Successfully!" in the terminal
- [ ] Server is running on port 4000

### Frontend Verification

- [ ] Frontend dev server starts without errors
- [ ] You can access http://localhost:5173 in your browser
- [ ] Home page loads successfully

### Integration Verification

- [ ] You can navigate to the Register page
- [ ] You can create a new user account
- [ ] You can log in with the created account
- [ ] No CORS errors in browser console (F12 → Console tab)

### Database Verification

- [ ] MongoDB connection is successful
- [ ] After registering a user, check that a `User` document was created in MongoDB
  - Use MongoDB Compass or Atlas UI to verify

---

## Running Both Servers Simultaneously

You need **two terminal windows** running at the same time:

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

### Alternative: Using Concurrently (Optional)

You can run both servers from the root with one command:

1. Install `concurrently` at the root:
   ```bash
   npm install concurrently --save-dev
   ```

2. Add this to `package.json` (create one at root if it doesn't exist):
   ```json
   {
     "scripts": {
       "dev": "concurrently \"cd backend && npm run dev\" \"cd frontend && npm run dev\""
     },
     "devDependencies": {
       "concurrently": "^8.0.0"
     }
   }
   ```

3. Run both servers:
   ```bash
   npm run dev
   ```

---

## Stopping the Servers

To stop either server, press **Ctrl + C** in the terminal where it's running.

---

## Default Ports

| Service | Port | URL |
|---------|------|-----|
| Backend API | 4000 | http://localhost:4000 |
| Frontend | 5173 | http://localhost:5173 |
| MongoDB (local) | 27017 | mongodb://localhost:27017 |

---

## Testing the Application

### 1. Register a New User
- Go to http://localhost:5173/register
- Fill in the registration form
- Select role: "Job Seeker" or "Employer"
- Submit

### 2. Login
- Go to http://localhost:5173/login
- Enter credentials
- Login should succeed and redirect to home

### 3. For Employers: Post a Job
- Login as an employer
- Navigate to "Post Job"
- Fill in job details
- Submit

### 4. For Job Seekers: Apply for a Job
- Login as a job seeker
- Browse jobs
- Click on a job
- Apply with your resume

---

## Next Steps

If you encounter any issues:
- Check the browser console (F12) for frontend errors
- Check the terminal output for backend errors
- See `docs/08-troubleshooting.md` for common issues and solutions

If everything is working:
- Start building features!
- Customize the UI
- Add more functionality

---
**Next:** `docs/08-troubleshooting.md`
