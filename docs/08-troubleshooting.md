# 08. Troubleshooting Guide

This guide covers common issues you might encounter when running the Job Portal project and their solutions.

---

## Backend Issues

### Issue 1: "Cannot find module" Error

**Error Message:**
```
Error: Cannot find module 'express'
or
Error: Cannot find module 'mongoose'
```

**Cause**: Dependencies not installed or corrupted node_modules

**Solution:**
```bash
cd backend
rm -rf node_modules package-lock.json
npm install
```

On Windows PowerShell:
```powershell
cd backend
Remove-Item -Recurse -Force node_modules, package-lock.json
npm install
```

---

### Issue 2: MongoDB Connection Failed

**Error Message:**
```
Failed to connect: MongooseServerSelectionError: connect ECONNREFUSED 127.0.0.1:27017
```

**Cause**: MongoDB service is not running (local installation)

**Solution for Windows:**
1. Open Services (Win + R, type `services.msc`)
2. Find "MongoDB Server"
3. Right-click → Start

**Solution for Mac/Linux:**
```bash
sudo systemctl start mongod
# or
brew services start mongodb-community
```

**For MongoDB Atlas:**
- Verify your connection string in `config.env`
- Check network access allows your IP
- Ensure username/password are correct

---

### Issue 3: Invalid Cloudinary Credentials

**Error Message:**
```
Error: Invalid Cloudinary credentials
or
Cloudinary upload failed
```

**Cause**: Incorrect Cloudinary credentials in config.env

**Solution:**
1. Log in to [Cloudinary Dashboard](https://cloudinary.com/console)
2. Copy the correct values:
   - Cloud Name
   - API Key
   - API Secret
3. Update `backend/config/config.env`:
   ```env
   CLOUDINARY_CLOUD_NAME=your_actual_cloud_name
   CLOUDINARY_API_KEY=your_actual_api_key
   CLOUDINARY_API_SECRET=your_actual_api_secret
   ```
4. Restart the backend server

---

### Issue 4: JWT_SECRET_KEY Missing

**Error Message:**
```
ReferenceError: JWT_SECRET_KEY is not defined
```

**Cause**: Environment variables not loaded or missing

**Solution:**
1. Verify `backend/config/config.env` exists
2. Check the file contains `JWT_SECRET_KEY=...`
3. Ensure `dotenv` is configured in app.js:
   ```javascript
   import { config } from "dotenv";
   config({ path: "./config/config.env" });
   ```
4. Restart the server

---

### Issue 5: Port Already in Use

**Error Message:**
```
Error: listen EADDRINUSE: address already in use :::4000
```

**Cause**: Another process is using port 4000

**Solution Option 1 - Kill the process:**

**Windows:**
```powershell
netstat -ano | findstr :4000
taskkill /PID <PID_NUMBER> /F
```

**Mac/Linux:**
```bash
lsof -ti:4000 | xargs kill -9
```

**Solution Option 2 - Change the port:**
Edit `backend/config/config.env`:
```env
PORT=4001
```

---

## Frontend Issues

### Issue 6: "npm run dev" Fails

**Error Message:**
```
Command 'vite' not found
or
'vite' is not recognized as an internal or external command
```

**Cause**: Dependencies not installed

**Solution:**
```bash
cd frontend
npm install
npm run dev
```

---

### Issue 7: Blank Page After Starting Frontend

**Possible Causes:**
1. Backend not running
2. JavaScript errors in browser console

**Solution:**
1. Ensure backend is running on port 4000
2. Open browser console (F12 → Console tab)
3. Check for errors and fix accordingly
4. Verify you're accessing http://localhost:5173

---

### Issue 8: CORS Error

**Error Message (in browser console):**
```
Access to XMLHttpRequest at 'http://localhost:4000/api/v1/...' from origin 'http://localhost:5173' has been blocked by CORS policy
```

**Cause**: CORS not configured properly in backend

**Solution:**
1. Open `backend/config/config.env`
2. Set `FRONTEND_URL` to the correct frontend URL:
   ```env
   FRONTEND_URL=http://localhost:5173
   ```
3. Restart the backend server
4. Verify app.js has CORS middleware:
   ```javascript
   app.use(cors({
     origin: [process.env.FRONTEND_URL],
     methods: ["GET", "POST", "DELETE", "PUT"],
     credentials: true
   }));
   ```

---

### Issue 9: API Calls Return 401 Unauthorized

**Error**: User appears logged out even after login

**Cause**: Cookies not being sent with requests

**Solution:**
Ensure all Axios requests include `withCredentials: true`:
```javascript
axios.get("http://localhost:4000/api/v1/user/getuser", {
  withCredentials: true
});
```

Check browser settings allow cookies from localhost.

---

### Issue 10: File Upload (Resume) Fails

**Error Message:**
```
Error uploading resume
or
File too large
```

**Possible Causes:**
1. Cloudinary credentials incorrect
2. File size exceeds limit
3. Wrong content type

**Solution:**
1. Verify Cloudinary credentials (see Issue 3)
2. Check file size (should be < 10MB for free tier)
3. Ensure Content-Type is `multipart/form-data`:
   ```javascript
   axios.post(url, formData, {
     headers: { "Content-Type": "multipart/form-data" },
     withCredentials: true
   });
   ```

---

## Database Issues

### Issue 11: Data Not Persisting

**Symptom**: Registered users or jobs disappear after server restart

**Cause**: Using in-memory storage or wrong database

**Solution:**
1. Verify `DB_URL` in config.env points to correct database
2. Check MongoDB is running
3. Use MongoDB Compass or Atlas UI to verify data exists

---

### Issue 12: Validation Errors

**Error Message:**
```
User validation failed: name: Path `name` is required
```

**Cause**: Missing required fields in request

**Solution:**
Ensure all required fields are sent from frontend:
- User: name, email, phone, password, role
- Job: title, description, category, country, city, location
- Application: name, email, coverLetter, phone, address, resume

---

## Environment Issues

### Issue 13: .env File Not Found

**Error**: Environment variables are undefined

**Cause**: .env file not in the correct location

**Solution:**
The file should be at: `backend/config/config.env` (NOT `backend/.env`)

If using a different location, update app.js:
```javascript
config({ path: "./path/to/your/.env" });
```

---

### Issue 14: Different Behavior on Different Machines

**Cause**: Different Node.js or npm versions

**Solution:**
1. Check Node.js version:
   ```bash
   node --version
   ```
   Ensure all developers use the same major version (v16+)

2. Use a `.nvmrc` file (if using nvm):
   ```
   16.20.0
   ```

3. Document required versions in README

---

## General Debugging Tips

### Enable Detailed Error Logging

**Backend:**
Add this to catch more errors:
```javascript
app.use((err, req, res, next) => {
  console.error("Error details:", err);
  res.status(500).json({ success: false, message: err.message });
});
```

**Frontend:**
```javascript
try {
  // API call
} catch (error) {
  console.error("Full error:", error);
  console.error("Response data:", error.response?.data);
  console.error("Status code:", error.response?.status);
}
```

### Check Browser DevTools

1. Press F12 to open DevTools
2. **Console tab**: JavaScript errors
3. **Network tab**: API request/response details
4. **Application tab**: Cookies, localStorage

### Check Terminal Output

Always monitor both backend and frontend terminals for error messages.

---

## Getting Help

If issues persist:

1. **Check Logs**: Look at both backend and frontend terminal output
2. **Browser Console**: Check for JavaScript errors (F12 → Console)
3. **Network Tab**: Inspect failed API calls (F12 → Network)
4. **Verify Environment**: Double-check all environment variables
5. **Clean Install**: Delete node_modules and reinstall:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

---

## Quick Fixes Checklist

When something breaks, try this checklist:

- [ ] Backend server is running
- [ ] Frontend dev server is running
- [ ] MongoDB is connected
- [ ] Environment variables are set correctly
- [ ] CORS is configured with correct frontend URL
- [ ] Cloudinary credentials are valid
- [ ] node_modules are installed in both backend and frontend
- [ ] No port conflicts
- [ ] Browser console shows no errors
- [ ] API calls include `withCredentials: true`

---

**Previous:** `docs/07-running-the-project.md`
