# Complete Setup Guide - Start to Finish

This is a comprehensive, step-by-step guide to get your Job Portal running from scratch. Follow every step carefully.

---

## 🎯 Goal
By the end of this guide, you will have:
- Backend running on http://localhost:4000
- Frontend running on http://localhost:5173
- MongoDB connected and working
- Ability to register, login, and use the app

---

## ⏱️ Estimated Time: 30 minutes

---

## 📋 Part 1: Prerequisites (5 minutes)

### 1.1 Install Node.js
1. Go to https://nodejs.org/
2. Download the LTS version (v18 or higher)
3. Run the installer
4. Verify installation:
   ```bash
   node --version
   npm --version
   ```

### 1.2 Install MongoDB

**Option A: MongoDB Atlas (Cloud - Easier)**
1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up for free account
3. Create a free cluster (M0)
4. Click "Connect" → "Connect your application"
5. Copy the connection string (save it for later)
6. Go to "Network Access" → "Add IP Address" → "Allow Access from Anywhere" (for development)

**Option B: MongoDB Local**
1. Download from https://www.mongodb.com/try/download/community
2. Install MongoDB Community Server
3. MongoDB runs automatically as a service

### 1.3 Create Cloudinary Account
1. Go to https://cloudinary.com/
2. Sign up for free account
3. After login, copy from dashboard:
   - Cloud Name
   - API Key
   - API Secret
4. Keep these values ready

---

## 📦 Part 2: Backend Setup (10 minutes)

### 2.1 Install Backend Dependencies

Open a terminal and run:

```bash
cd C:\Users\DELL\Desktop\testing\Job-Portal\backend
npm install
```

Wait for all packages to install (may take 2-3 minutes).

### 2.2 Configure Environment Variables

The file `backend/config/config.env` should already exist. Open it and update these values:

**If using MongoDB Atlas:**
```env
PORT=4000
NODE_ENV=development
DB_URL=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
JWT_SECRET_KEY=my_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:5173
CLOUDINARY_CLOUD_NAME=your_actual_cloud_name
CLOUDINARY_API_KEY=your_actual_api_key
CLOUDINARY_API_SECRET=your_actual_api_secret
```

**If using Local MongoDB:**
```env
PORT=4000
NODE_ENV=development
DB_URL=mongodb://localhost:27017
JWT_SECRET_KEY=my_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:5173
CLOUDINARY_CLOUD_NAME=your_actual_cloud_name
CLOUDINARY_API_KEY=your_actual_api_key
CLOUDINARY_API_SECRET=your_actual_api_secret
```

**Important:** Replace the Cloudinary values with YOUR actual credentials from step 1.3.

### 2.3 Start the Backend Server

```bash
npm run dev
```

**Expected Output:**
```
MongoDB Connected Successfully!
Server running at port 4000
```

✅ **If you see this, backend is working!** Keep this terminal open.

❌ **If you see errors**, check:
- MongoDB is running (for local) or connection string is correct (for Atlas)
- All environment variables are set correctly
- Port 4000 is not already in use

---

## 🎨 Part 3: Frontend Setup (10 minutes)

### 3.1 Install Frontend Dependencies

Open a **NEW terminal** (keep backend running in the first one):

```bash
cd C:\Users\DELL\Desktop\testing\Job-Portal\frontend
npm install
```

Wait for all packages to install (may take 2-3 minutes).

### 3.2 Verify Environment Variables

Check that `frontend/.env` exists and contains:

```env
VITE_API_URL=http://localhost:4000/api/v1
```

This file should already be created. If not, create it.

### 3.3 Start the Frontend Server

```bash
npm run dev
```

**Expected Output:**
```
VITE v5.0.8  ready in 500 ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

✅ **If you see this, frontend is working!** Keep this terminal open.

---

## 🧪 Part 4: Testing the Application (5 minutes)

### 4.1 Access the Application

1. Open your browser (Chrome or Firefox recommended)
2. Go to: **http://localhost:5173**
3. You should see the Job Portal homepage

### 4.2 Open Browser DevTools

1. Press **F12** to open DevTools
2. Go to the **Console** tab
3. There should be **NO red errors**
4. If you see CORS errors, check backend `FRONTEND_URL` setting

### 4.3 Test Registration

1. Click "Register" or navigate to http://localhost:5173/register
2. Fill in the form:
   - Name: `John Doe`
   - Email: `john@example.com`
   - Phone: `1234567890`
   - Password: `password123`
   - Role: `Job Seeker`
3. Click Submit
4. **Expected:** Success message and redirect to home page

✅ **If registration works, everything is connected!**

### 4.4 Test Login

1. Click "Login" or navigate to http://localhost:5173/login
2. Enter:
   - Email: `john@example.com`
   - Password: `password123`
   - Role: `Job Seeker`
3. Click Login
4. **Expected:** Success message and logged-in state

### 4.5 Test Health Check (Optional)

Open a third terminal and run:

```bash
curl http://localhost:4000/api/health
```

**Expected response:**
```json
{
  "success": true,
  "message": "Server is running successfully!",
  "timestamp": "..."
}
```

---

## ✅ Part 5: Verification Checklist

Make sure all of these are true:

- [ ] Backend terminal shows "MongoDB Connected Successfully!"
- [ ] Backend terminal shows "Server running at port 4000"
- [ ] Frontend terminal shows Vite dev server is running
- [ ] Browser can access http://localhost:5173
- [ ] Browser console (F12) shows NO CORS errors
- [ ] You can register a new user successfully
- [ ] You can login with the registered user
- [ ] After login, you see user-specific content (navbar changes, etc.)

**If ALL items are checked, congratulations! Your setup is complete! 🎉**

---

## 🚀 Next Steps

Now that everything is working, you can:

1. **Explore the Application:**
   - Register as both Job Seeker and Employer (use different emails)
   - Post a job (as Employer)
   - Apply for a job (as Job Seeker)
   - Upload a resume

2. **Review the Code:**
   - Check out the backend controllers to see how APIs work
   - Explore frontend components to understand the UI structure
   - Read the documentation in the `docs/` folder

3. **Customize:**
   - Change the UI styling in TailwindCSS
   - Add new features (saved jobs, notifications, etc.)
   - Improve the design

---

## 🆘 If Something Goes Wrong

### Backend Won't Start

**Error: "Cannot find module"**
```bash
cd backend
rm -rf node_modules package-lock.json
npm install
```

**Error: "MongoDB connection failed"**
- Check MongoDB is running (local) or Atlas connection string is correct
- Verify network access in Atlas allows your IP

**Error: "Port 4000 in use"**
```bash
# Find and kill the process
netstat -ano | findstr :4000
taskkill /PID <PID> /F
```

### Frontend Won't Start

**Error: "Command 'vite' not found"**
```bash
cd frontend
npm install
```

**Error: "Port 5173 in use"**
- Stop other Vite processes
- Or change port in vite.config.js

### CORS Errors in Browser

1. Check `backend/config/config.env` has:
   ```env
   FRONTEND_URL=http://localhost:5173
   ```
2. Restart backend server
3. Refresh browser (Ctrl + F5)

### Can't Register/Login

1. Check backend terminal for errors
2. Open browser DevTools (F12) → Network tab
3. Click on failed request to see error details
4. Check MongoDB is connected

---

## 📚 Further Documentation

For more detailed information, see:

- [Project Overview](01-project-overview.md)
- [Backend Setup](02-backend-setup.md)
- [Database Setup](03-database-setup.md)
- [Environment Configuration](04-env-configuration.md)
- [Frontend Setup](05-frontend-setup.md)
- [API Integration](06-api-integration.md)
- [Running the Project](07-running-the-project.md)
- [Troubleshooting](08-troubleshooting.md)
- [Verification Checklist](09-verification-checklist.md)

---

## 🎓 Learning Resources

- [MongoDB Tutorial](https://www.mongodb.com/docs/manual/tutorial/)
- [Express.js Guide](https://expressjs.com/en/guide/routing.html)
- [React Documentation](https://react.dev/)
- [Node.js Documentation](https://nodejs.org/en/docs/)

---

**Remember:** 
- Keep both terminals running (backend and frontend)
- Check browser console for errors
- Read error messages carefully
- Refer to troubleshooting guide when stuck

**Good luck! 🚀**
