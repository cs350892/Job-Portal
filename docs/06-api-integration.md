# 06. API Integration

This document describes all API endpoints, request/response formats, and how the frontend integrates with the backend.

## Base URL

**Backend API Base URL**: `http://localhost:4000/api/v1`

All API endpoints are prefixed with `/api/v1`.

## Authentication

Most endpoints require **JWT authentication** using HTTP-only cookies.

- When a user logs in or registers, a JWT token is set in a cookie
- Subsequent requests automatically include this cookie (`withCredentials: true`)
- Protected routes verify the token in the `isAuthenticated` middleware

## API Endpoints

### 1. User Authentication APIs

**Base Path**: `/api/v1/user`

#### Register User
- **Endpoint**: `POST /api/v1/user/register`
- **Authentication**: Not required
- **Request Body**:
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": 1234567890,
    "password": "password123",
    "role": "Job Seeker" // or "Employer"
  }
  ```
- **Response** (201):
  ```json
  {
    "success": true,
    "message": "User Registered Successfully!",
    "user": { ... },
    "token": "jwt_token_here"
  }
  ```
- **Errors**:
  - 400: Missing fields or email already registered

#### Login User
- **Endpoint**: `POST /api/v1/user/login`
- **Authentication**: Not required
- **Request Body**:
  ```json
  {
    "email": "john@example.com",
    "password": "password123",
    "role": "Job Seeker"
  }
  ```
- **Response** (201):
  ```json
  {
    "success": true,
    "message": "User Logged In Successfully!",
    "user": { ... }
  }
  ```
- **Errors**:
  - 400: Invalid email or password
  - 404: User with provided role not found

#### Logout User
- **Endpoint**: `GET /api/v1/user/logout`
- **Authentication**: Required
- **Response** (201):
  ```json
  {
    "success": true,
    "message": "Logged Out Successfully!"
  }
  ```

#### Get Current User
- **Endpoint**: `GET /api/v1/user/getuser`
- **Authentication**: Required
- **Response** (200):
  ```json
  {
    "success": true,
    "user": {
      "_id": "...",
      "name": "John Doe",
      "email": "john@example.com",
      "phone": 1234567890,
      "role": "Job Seeker"
    }
  }
  ```

---

### 2. Job APIs

**Base Path**: `/api/v1/job`

#### Get All Jobs
- **Endpoint**: `GET /api/v1/job/getall`
- **Authentication**: Not required
- **Response** (200):
  ```json
  {
    "success": true,
    "jobs": [
      {
        "_id": "...",
        "title": "Software Developer",
        "description": "...",
        "category": "IT",
        "country": "USA",
        "city": "New York",
        "location": "123 Main St, NY",
        "fixedSalary": 80000,
        "expired": false,
        "jobPostedOn": "2024-01-01T00:00:00.000Z",
        "postedBy": "employer_id"
      }
    ]
  }
  ```

#### Get Single Job
- **Endpoint**: `GET /api/v1/job/:id`
- **Authentication**: Required
- **Response** (200):
  ```json
  {
    "success": true,
    "job": { ... }
  }
  ```

#### Post a Job (Employer Only)
- **Endpoint**: `POST /api/v1/job/post`
- **Authentication**: Required (Employer)
- **Request Body**:
  ```json
  {
    "title": "Software Developer",
    "description": "We are looking for...",
    "category": "IT",
    "country": "USA",
    "city": "New York",
    "location": "123 Main St, New York, NY 10001",
    "fixedSalary": 80000
    // OR use salaryFrom and salaryTo instead
  }
  ```
- **Response** (200):
  ```json
  {
    "success": true,
    "message": "Job Posted Successfully!",
    "job": { ... }
  }
  ```

#### Get My Jobs (Employer Only)
- **Endpoint**: `GET /api/v1/job/getmyjobs`
- **Authentication**: Required (Employer)
- **Response** (200):
  ```json
  {
    "success": true,
    "myJobs": [ ... ]
  }
  ```

#### Update Job
- **Endpoint**: `PUT /api/v1/job/update/:id`
- **Authentication**: Required (Employer)
- **Request Body**: Same as POST job (partial updates allowed)

#### Delete Job
- **Endpoint**: `DELETE /api/v1/job/delete/:id`
- **Authentication**: Required (Employer)
- **Response** (200):
  ```json
  {
    "success": true,
    "message": "Job deleted successfully!"
  }
  ```

---

### 3. Application APIs

**Base Path**: `/api/v1/application`

#### Submit Application (Job Seeker Only)
- **Endpoint**: `POST /api/v1/application/post`
- **Authentication**: Required (Job Seeker)
- **Request**: Multipart form data with file upload
- **Form Fields**:
  - `name` (string)
  - `email` (string)
  - `coverLetter` (string)
  - `phone` (number)
  - `address` (string)
  - `resume` (file - PDF/DOC)
  - `jobId` (string)
- **Response** (200):
  ```json
  {
    "success": true,
    "message": "Application Submitted!",
    "application": { ... }
  }
  ```

#### Get Job Seeker's Applications
- **Endpoint**: `GET /api/v1/application/jobseeker/getall`
- **Authentication**: Required (Job Seeker)
- **Response** (200):
  ```json
  {
    "success": true,
    "applications": [ ... ]
  }
  ```

#### Get Employer's Received Applications
- **Endpoint**: `GET /api/v1/application/employer/getall`
- **Authentication**: Required (Employer)
- **Response** (200):
  ```json
  {
    "success": true,
    "applications": [ ... ]
  }
  ```

#### Delete Application
- **Endpoint**: `DELETE /api/v1/application/delete/:id`
- **Authentication**: Required (Job Seeker)
- **Response** (200):
  ```json
  {
    "success": true,
    "message": "Application deleted successfully!"
  }
  ```

---

## CORS Configuration

The backend is configured to allow requests from the frontend:

```javascript
app.use(cors({
  origin: [process.env.FRONTEND_URL],
  methods: ["GET", "POST", "DELETE", "PUT"],
  credentials: true
}));
```

**Important**: 
- Set `FRONTEND_URL=http://localhost:5173` in `backend/config/config.env`
- Frontend must use `withCredentials: true` in Axios requests

---

## Frontend Integration Examples

### Making API Calls with Axios

**Example: Get Current User**

```javascript
import axios from "axios";

const fetchUser = async () => {
  try {
    const response = await axios.get(
      "http://localhost:4000/api/v1/user/getuser",
      { withCredentials: true }
    );
    console.log(response.data.user);
  } catch (error) {
    console.error("Error fetching user:", error);
  }
};
```

**Example: Login**

```javascript
const handleLogin = async (email, password, role) => {
  try {
    const { data } = await axios.post(
      "http://localhost:4000/api/v1/user/login",
      { email, password, role },
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );
    toast.success(data.message);
  } catch (error) {
    toast.error(error.response.data.message);
  }
};
```

**Example: Post Job**

```javascript
const handlePostJob = async (jobData) => {
  try {
    const { data } = await axios.post(
      "http://localhost:4000/api/v1/job/post",
      jobData,
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" }
      }
    );
    toast.success(data.message);
  } catch (error) {
    toast.error(error.response.data.message);
  }
};
```

**Example: Submit Application with File Upload**

```javascript
const handleSubmitApplication = async (formData) => {
  try {
    const { data } = await axios.post(
      "http://localhost:4000/api/v1/application/post",
      formData,
      {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" }
      }
    );
    toast.success(data.message);
  } catch (error) {
    toast.error(error.response.data.message);
  }
};
```

---

## Error Handling

### Backend Error Responses

All errors follow this format:

```json
{
  "success": false,
  "message": "Error message here"
}
```

### Frontend Error Handling

```javascript
try {
  const response = await axios.get(endpoint, { withCredentials: true });
  // Handle success
} catch (error) {
  if (error.response) {
    // Backend returned an error response
    toast.error(error.response.data.message);
  } else {
    // Network or other error
    toast.error("Something went wrong!");
  }
}
```

---

## Common Integration Issues

### Issue 1: CORS Errors
**Problem**: Frontend can't access backend APIs  
**Solution**: 
- Set `FRONTEND_URL` correctly in backend `.env`
- Use `withCredentials: true` in Axios requests

### Issue 2: Authentication Not Working
**Problem**: User appears logged out after refresh  
**Solution**: 
- Ensure cookies are being sent (`withCredentials: true`)
- Check `httpOnly` cookies in browser DevTools

### Issue 3: File Upload Fails
**Problem**: Resume upload returns error  
**Solution**: 
- Use `Content-Type: multipart/form-data`
- Verify Cloudinary credentials in backend `.env`

---
**Next:** `docs/07-running-the-project.md`
