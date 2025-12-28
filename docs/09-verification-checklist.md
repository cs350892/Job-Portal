# Setup Verification Script

This script helps verify that your Job Portal project is properly configured.

## Pre-flight Checklist

### ✅ Check 1: Node.js Installation
```bash
node --version
```
Expected: v16.0.0 or higher

### ✅ Check 2: npm Installation
```bash
npm --version
```
Expected: v7.0.0 or higher

### ✅ Check 3: Backend Dependencies
```bash
cd backend
npm list --depth=0
```
All dependencies should be installed

### ✅ Check 4: Frontend Dependencies
```bash
cd frontend
npm list --depth=0
```
All dependencies should be installed

### ✅ Check 5: Environment Variables

**Backend:**
- File `backend/config/config.env` exists
- All required variables are set:
  - PORT
  - DB_URL
  - JWT_SECRET_KEY
  - JWT_EXPIRE
  - FRONTEND_URL
  - CLOUDINARY_CLOUD_NAME
  - CLOUDINARY_API_KEY
  - CLOUDINARY_API_SECRET

**Frontend:**
- File `frontend/.env` exists
- VITE_API_URL is set

### ✅ Check 6: MongoDB Connection

**For Local MongoDB:**
```bash
# Windows
sc query MongoDB

# Mac/Linux
sudo systemctl status mongod
```

**For MongoDB Atlas:**
- Login to MongoDB Atlas
- Verify cluster is running
- Check network access allows your IP

### ✅ Check 7: Cloudinary Setup
- Login to Cloudinary dashboard
- Verify you have:
  - Cloud Name
  - API Key
  - API Secret
- These should be in `backend/config/config.env`

---

## Quick Test Commands

### Test Backend Health Check
```bash
# Start backend first (in one terminal)
cd backend
npm run dev

# Then test health endpoint (in another terminal)
curl http://localhost:4000/api/health
```

Expected response:
```json
{
  "success": true,
  "message": "Server is running successfully!",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### Test Frontend
```bash
cd frontend
npm run dev
```
Then open http://localhost:5173 in browser

---

## Integration Test

1. **Start Backend:**
   ```bash
   cd backend
   npm run dev
   ```
   Wait for: "MongoDB Connected Successfully!" and "Server running at port 4000"

2. **Start Frontend (new terminal):**
   ```bash
   cd frontend
   npm run dev
   ```
   Wait for: "Local: http://localhost:5173/"

3. **Open Browser:**
   - Navigate to http://localhost:5173
   - Open DevTools (F12) → Console
   - Should see NO CORS errors
   - Should see NO connection errors

4. **Test Registration:**
   - Click "Register"
   - Fill the form:
     - Name: Test User
     - Email: test@example.com
     - Phone: 1234567890
     - Password: password123
     - Role: Job Seeker
   - Submit
   - Should show success message
   - Should redirect to home

5. **Test Login:**
   - Click "Login"
   - Enter:
     - Email: test@example.com
     - Password: password123
     - Role: Job Seeker
   - Submit
   - Should login successfully

---

## Troubleshooting Failed Checks

### Backend Won't Start
1. Check all environment variables are set
2. Verify MongoDB is running
3. Check port 4000 is not in use
4. Run `npm install` again

### Frontend Won't Start
1. Run `npm install` in frontend folder
2. Check port 5173 is not in use
3. Verify Vite is installed

### CORS Errors
1. Check `FRONTEND_URL` in backend config.env is exactly `http://localhost:5173`
2. Restart backend server
3. Clear browser cache

### Database Connection Failed
1. Check MongoDB service is running
2. Verify DB_URL is correct
3. For Atlas: check network access and credentials

---

## Success Criteria

Your setup is complete when:
- ✅ Backend starts without errors
- ✅ Frontend starts without errors
- ✅ MongoDB connection is successful
- ✅ Health check endpoint returns 200 OK
- ✅ Can register a new user
- ✅ Can login with registered user
- ✅ No CORS errors in browser console
- ✅ User data appears in MongoDB

---

For detailed troubleshooting, see [docs/08-troubleshooting.md](08-troubleshooting.md)
